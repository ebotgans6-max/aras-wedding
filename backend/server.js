require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const app = express();
app.use(cors());
app.use(express.json());

// API Endpoint to generate DOCX
app.post('/api/generate-docx', async (req, res) => {
  console.log("Data received:", req.body);
  try {
    const data = req.body;

    // Load the template.
    const templatePath = path.resolve(__dirname, 'RD_WO_NEW-salin.docx');

    if (!fs.existsSync(templatePath)) {
      return res.status(500).json({ error: 'Template document (RD_WO_NEW-salin.docx) not found in the backend root directory.' });
    }

    const content = fs.readFileSync(templatePath, 'binary');

    // Create a pizzip instance with the content
    const zip = new PizZip(content);

    // Initialize docxtemplater
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Render the document using the data
    doc.render(data);

    // Generate the output buffer
    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    // Generate file name
    const safeCpp = (data.Panggilan_CPP || 'CPP').replace(/[^a-z0-9]/gi, '_');
    const safeCpw = (data.Panggilan_CPW || 'CPW').replace(/[^a-z0-9]/gi, '_');
    const fileName = `Data_Pernikahan_${safeCpp}_${safeCpw}.docx`;

    // Send the buffer back to the client directly as a file download
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.send(buf);

    console.log(`Dokumen berhasil dibuat dan dikirim ke client: ${fileName}`);

  } catch (error) {
    console.error('Error generating document:', error);
    res.status(500).json({ error: 'Failed to generate document', details: error.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
