require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
// CRITICAL REQUIREMENT 2: Target WhatsApp number
const ADMIN_WA_NUMBER = process.env.ADMIN_WA_NUMBER || '6285183270299';

// Initialize WhatsApp Client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  }
});

client.on('qr', (qr) => {
  console.log('SCAN INI MENGGUNAKAN WHATSAPP ANDA UNTUK LOGIN:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp Client is ready!');
});

client.on('authenticated', () => {
  console.log('WhatsApp Client is authenticated!');
});

client.on('auth_failure', (msg) => {
  console.error('WhatsApp Authentication failure:', msg);
});

client.initialize();

// API Endpoint to generate DOCX
app.post('/api/generate-docx', async (req, res) => {
  console.log("Data received:", req.body);
  try {
    const data = req.body;

    // Load the template. Assuming user provides .docx instead of .pdf because docxtemplater only supports docx
    const templatePath = path.resolve(__dirname, 'RD_WO_NEW-salin.docx');

    if (!fs.existsSync(templatePath)) {
      return res.status(500).json({ error: 'Template document (RD_WO_NEW-salin.docx) not found in the backend root directory. Note: docxtemplater requires a .docx file, not .pdf.' });
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

    // Create temporary file path
    const safeCpp = (data.Panggilan_CPP || 'CPP').replace(/[^a-z0-9]/gi, '_');
    const safeCpw = (data.Panggilan_CPW || 'CPW').replace(/[^a-z0-9]/gi, '_');
    const tempFileName = `Data_Pernikahan_${safeCpp}_${safeCpw}.docx`;
    const tempFilePath = path.resolve(__dirname, tempFileName);

    // Save the temporary file
    fs.writeFileSync(tempFilePath, buf);
    console.log(`Dokumen berhasil dibuat: ${tempFileName}`);

    // Format number to ensure it ends with @c.us (WhatsApp ID format)
    let formattedNumber = ADMIN_WA_NUMBER;
    if (formattedNumber.startsWith('0')) {
      formattedNumber = '62' + formattedNumber.substring(1);
    }
    if (!formattedNumber.endsWith('@c.us')) {
      formattedNumber = `${formattedNumber}@c.us`;
    }
    const chatId = formattedNumber;

    // Load media from the generated file
    const media = MessageMedia.fromFilePath(tempFilePath);

    // Send message
    try {
      await client.sendMessage(chatId, media, {
        caption: `Halo Admin, ini adalah data onboarding baru untuk pasangan ${data.Panggilan_CPP} & ${data.Panggilan_CPW}.`
      });
      console.log("Message sent successfully");
    } catch (err) {
      console.error("WA Error:", err);
    }

    // Securely delete the temporary file after successful generation and transmission
    fs.unlinkSync(tempFilePath);
    console.log(`File sementara berhasil dihapus: ${tempFileName}`);

    res.status(200).json({ message: 'Document generated and processed successfully' });

  } catch (error) {
    console.error('Error generating document:', error);
    res.status(500).json({ error: 'Failed to generate document', details: error.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
