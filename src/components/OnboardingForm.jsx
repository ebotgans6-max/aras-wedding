import React, { useState, createContext, useContext } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

const FormContext = createContext();

const InputField = ({ label, name, type = 'text', required = false }) => {
  const { formData, handleChange } = useContext(FormContext);
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        className="px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      />
    </div>
  );
};

const OnboardingForm = () => {
  const [formData, setFormData] = useState({
    // 1. COVER
    Panggilan_CPP: '',
    Panggilan_CPW: '',
    // 2. ACARA PERNIKAHAN
    hari_tanggal: '',
    tempat_akad: '',
    jam_akad: '',
    jam_resepsi: '',
    jumlah_tamu: '',
    // 3. DATA PENGANTIN & KELUARGA (CPP)
    nama_lengkap_CPP: '',
    panggilan_Cpp: '',
    tempat_tanggal_lahir_CPp: '',
    nama_ayah_Cpp: '',
    nama_ibu_Cpp: '',
    anak_ke_berapa_dari_berapa_saudara_cpp: '',
    wali_ayah_cpp_opsional: '',
    wali_ibu_Cpp_opsional: '',
    username_instagram_cpp: '',
    // 4. DATA PENGANTIN & KELUARGA (CPW)
    nama_lengkap_CPW: '',
    panggilan_Cpw: '',
    tempat_tanggal_lahir_cpw: '',
    nama_ayah_Cpw: '',
    nama_ibu_Cpw: '',
    anak_ke_berapa_dari_berapa_saudara_Cpw: '',
    wali_ayah_cpw_opsional: '',
    wali_ibu_Cpw_opsional: '',
    username_instagram_cpw: '',
    // 5. DAFTAR PETUGAS ACARA
    panitia_keluarga_Cpw_opsional: '',
    pic_kel_cpw: '',
    pic_kel_cpp: '',
    pic_seserahan_dan_barang_berharga: '',
    penjaga_buku_tamu: '',
    // 6. AKAD NIKAH
    nama_penghulu: '',
    saksi_Cpp: '',
    saksi_cpw: '',
    pembaca_alquran: '',
    tausiah: '',
    pembaca_doa: '',
    bridesmaid_berapa: '',
    groomsmen_berapa: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // 1. Fetch the template file from the public folder
      const templateResponse = await fetch('/RD_WO_NEW-salin.docx');
      if (!templateResponse.ok) {
        throw new Error('Template document (RD_WO_NEW-salin.docx) not found in the public folder.');
      }
      const arrayBuffer = await templateResponse.arrayBuffer();

      // 2. Load the zip with PizZip
      const zip = new PizZip(arrayBuffer);

      // Pre-process XML files to fix duplicate curly braces (e.g. {{tag}} to {tag})
      Object.keys(zip.files).forEach(fileName => {
        if (fileName.endsWith('.xml')) {
          let content = zip.file(fileName).asText();
          // Replace {{ with { and }} with }
          content = content.replace(/\{\{/g, '{').replace(/\}\}/g, '}');
          zip.file(fileName, content);
        }
      });

      // 3. Initialize Docxtemplater
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        nullGetter() {
          return "";
        }
      });

      // 4. Render the document with the form data
      doc.render(formData);

      // 5. Generate the output as a blob
      const blob = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        compression: 'DEFLATE',
      });
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      const safeCpp = (formData.Panggilan_CPP || 'CPP').replace(/[^a-z0-9]/gi, '_');
      const safeCpw = (formData.Panggilan_CPW || 'CPW').replace(/[^a-z0-9]/gi, '_');
      a.download = `Data_Pernikahan_${safeCpp}_${safeCpw}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      // Redirect to WhatsApp
      const waText = encodeURIComponent(`Halo Admin, ini adalah data onboarding baru untuk pasangan ${formData.Panggilan_CPP} & ${formData.Panggilan_CPW}. File dokumen akan saya kirimkan di chat ini.`);
      window.open(`https://wa.me/6285183270299?text=${waText}`, '_blank');

      setStatus({ type: 'success', message: 'Dokumen berhasil diunduh! Anda akan dialihkan ke WhatsApp Admin.' });
    } catch (error) {
      console.error('Error generating document:', error);
      
      let detailedError = error.message;
      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors.map(function(e) {
          return e.properties && e.properties.id ? e.properties.id : e.message;
        }).join(', ');
        console.error('Docxtemplater MultiError:', error.properties.errors);
        detailedError = 'Template tag errors (missing/unclosed): ' + errorMessages;
      }
      
      setStatus({ type: 'error', message: 'Gagal membuat dokumen: ' + detailedError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl my-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Wedding Client Onboarding</h2>
        <p className="text-gray-500">Lengkapi data berikut untuk pembuatan dokumen persiapan pernikahan Anda.</p>
      </div>

      {status.message && (
        <div className={`p-4 mb-6 rounded-lg ${status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
          {status.message}
        </div>
      )}

      <FormContext.Provider value={{ formData, handleChange }}>
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: COVER */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">1. Cover Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Panggilan CPP (Calon Pengantin Pria)" name="Panggilan_CPP" required />
            <InputField label="Panggilan CPW (Calon Pengantin Wanita)" name="Panggilan_CPW" required />
          </div>
        </section>

        {/* SECTION 2: ACARA PERNIKAHAN */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">2. Acara Pernikahan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Hari & Tanggal" name="hari_tanggal" placeholder="Contoh: Sabtu, 12 Agustus 2024" required />
            <InputField label="Tempat Akad" name="tempat_akad" required />
            <InputField label="Jam Akad" name="jam_akad" required />
            <InputField label="Jam Resepsi" name="jam_resepsi" required />
            <InputField label="Jumlah Tamu" name="jumlah_tamu" type="number" required />
          </div>
        </section>

        {/* SECTION 3: DATA PENGANTIN & KELUARGA (CPP) */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">3. Data Pengantin & Keluarga (CPP)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Nama Lengkap CPP" name="nama_lengkap_CPP" required />
            <InputField label="Panggilan CPP (Data Tambahan)" name="panggilan_Cpp" required />
            <InputField label="Tempat, Tanggal Lahir" name="tempat_tanggal_lahir_CPp" required />
            <InputField label="Nama Ayah CPP" name="nama_ayah_Cpp" required />
            <InputField label="Nama Ibu CPP" name="nama_ibu_Cpp" required />
            <InputField label="Anak ke (dari berapa bersaudara)" name="anak_ke_berapa_dari_berapa_saudara_cpp" placeholder="Contoh: 1 dari 3 bersaudara" required />
            <InputField label="Wali Ayah (Opsional)" name="wali_ayah_cpp_opsional" />
            <InputField label="Wali Ibu (Opsional)" name="wali_ibu_Cpp_opsional" />
            <InputField label="Username Instagram" name="username_instagram_cpp" placeholder="@username" />
          </div>
        </section>

        {/* SECTION 4: DATA PENGANTIN & KELUARGA (CPW) */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">4. Data Pengantin & Keluarga (CPW)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Nama Lengkap CPW" name="nama_lengkap_CPW" required />
            <InputField label="Panggilan CPW (Data Tambahan)" name="panggilan_Cpw" required />
            <InputField label="Tempat, Tanggal Lahir" name="tempat_tanggal_lahir_cpw" required />
            <InputField label="Nama Ayah CPW" name="nama_ayah_Cpw" required />
            <InputField label="Nama Ibu CPW" name="nama_ibu_Cpw" required />
            <InputField label="Anak ke (dari berapa bersaudara)" name="anak_ke_berapa_dari_berapa_saudara_Cpw" placeholder="Contoh: 2 dari 4 bersaudara" required />
            <InputField label="Wali Ayah (Opsional)" name="wali_ayah_cpw_opsional" />
            <InputField label="Wali Ibu (Opsional)" name="wali_ibu_Cpw_opsional" />
            <InputField label="Username Instagram" name="username_instagram_cpw" placeholder="@username" />
          </div>
        </section>

        {/* SECTION 5: DAFTAR PETUGAS ACARA */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">5. Daftar Petugas Acara</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Panitia Keluarga CPW (Opsional)" name="panitia_keluarga_Cpw_opsional" />
            <InputField label="PIC Keluarga CPW" name="pic_kel_cpw" required />
            <InputField label="PIC Keluarga CPP" name="pic_kel_cpp" required />
            <InputField label="PIC Seserahan & Barang Berharga" name="pic_seserahan_dan_barang_berharga" required />
            <InputField label="Penjaga Buku Tamu" name="penjaga_buku_tamu" required />
          </div>
        </section>

        {/* SECTION 6: AKAD NIKAH */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">6. Akad Nikah</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Nama Penghulu" name="nama_penghulu" required />
            <InputField label="Saksi CPP" name="saksi_Cpp" required />
            <InputField label="Saksi CPW" name="saksi_cpw" required />
            <InputField label="Pembaca Al-Quran" name="pembaca_alquran" />
            <InputField label="Tausiah" name="tausiah" />
            <InputField label="Pembaca Doa" name="pembaca_doa" />
            <InputField label="Jumlah Bridesmaid" name="bridesmaid_berapa" type="number" />
            <InputField label="Jumlah Groomsmen" name="groomsmen_berapa" type="number" />
          </div>
        </section>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all transform hover:scale-[1.02] ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses Dokumen...
              </span>
            ) : (
              'Simpan & Generate Dokumen'
            )}
          </button>
        </div>
      </form>
      </FormContext.Provider>
    </div>
  );
};

export default OnboardingForm;
