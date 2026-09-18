'use client';
import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ImagePlus, FileDown, XCircle } from 'lucide-react';

export default function ImgToPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => 
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
    );
    
    if (validFiles.length !== selectedFiles.length) {
      alert("Hanya file gambar (JPG, JPEG, PNG) yang didukung.");
    }
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsConverting(true);
    
    try {
      // Buat dokumen PDF kosong baru
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;
        
        // Cek tipe gambar dan sisipkan (embed) ke PDF
        if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          image = await pdfDoc.embedJpg(arrayBuffer);
        }

        // Dapatkan dimensi asli gambar
        const { width, height } = image.scale(1);
        
        // Buat halaman baru dengan ukuran persis seperti gambar
        const page = pdfDoc.addPage([width, height]);
        
        // Gambar foto tersebut menutupi seluruh halaman
        page.drawImage(image, {
          x: 0,
          y: 0,
          width,
          height,
        });
      }

      // Simpan dan Download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `RamaTools-ImagesToPDF.pdf`;
      link.click();
    } catch (error) {
      alert("Gagal mengonversi gambar. Pastikan format file tidak rusak.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Image to PDF</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Ubah satu atau banyak gambar (JPG/PNG) menjadi satu dokumen PDF secara instan.
        </p>
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()}
        className="bg-white border-2 border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all rounded-3xl p-12 text-center cursor-pointer shadow-sm group mb-8"
      >
        <input 
          type="file" 
          accept="image/jpeg, image/png, image/jpg" 
          multiple
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
        <ImagePlus className="w-16 h-16 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
        <p className="text-lg font-bold text-slate-800">Klik untuk Tambah Gambar</p>
        <p className="text-sm text-slate-500 mt-1">Dukung JPG dan PNG. Bisa pilih banyak sekaligus.</p>
      </div>

      {files.length > 0 && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in duration-300">
          <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Gambar Terpilih ({files.length}):</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-h-60 overflow-y-auto pr-2">
            {files.map((f, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-sm font-medium text-slate-700 truncate mr-2">{f.name}</span>
                <button onClick={() => removeFile(idx)} className="text-red-400 hover:text-red-600 shrink-0">
                  <XCircle size={18} />
                </button>
              </div>
            ))}
          </div>

          <button 
            onClick={handleConvert}
            disabled={isConverting}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 disabled:bg-slate-300 flex items-center justify-center gap-2"
          >
            <FileDown size={20} />
            {isConverting ? "Sedang Mengonversi..." : "Konversi ke PDF & Download"}
          </button>
        </div>
      )}
    </div>
  );
}
