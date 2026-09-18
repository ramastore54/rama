'use client';
import { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Construction } from 'lucide-react';

export default function PDFtoJPG() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">PDF to JPG Converter</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Ubah halaman dokumen PDF Anda menjadi gambar (JPG/PNG) berkualitas tinggi.
        </p>
      </div>

      {!file ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="bg-white border-2 border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all rounded-3xl p-16 text-center cursor-pointer shadow-sm group"
        >
          <input type="file" accept="application/pdf" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          <UploadCloud className="w-16 h-16 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
          <p className="text-lg font-bold text-slate-800">Pilih File PDF untuk Dikonversi</p>
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center animate-in fade-in duration-300">
          <Construction className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Sedang Dalam Pengembangan (V2)</h2>
          <p className="text-slate-600 max-w-md mx-auto mb-8">
            Fitur konversi dari PDF ke JPG memerlukan mesin perender gambar (seperti <code className="bg-slate-100 text-slate-800 px-1 rounded">pdf.js</code>) yang akan segera kami integrasikan di pembaruan Rama Tools versi selanjutnya agar tetap bisa berjalan ringan di browser HP.
          </p>
          <button 
            onClick={() => setFile(null)} 
            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
          >
            Kembali
          </button>
        </div>
      )}
    </div>
  );
}
