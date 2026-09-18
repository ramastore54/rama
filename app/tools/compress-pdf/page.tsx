'use client';
import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { UploadCloud, FileArchive, ArrowDownCircle } from 'lucide-react';

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setResultSize(null);
    } else {
      alert("Mohon upload file PDF yang valid.");
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsCompressing(true);
    
    try {
      // Membaca file PDF
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      
      // Proses "Save" ulang di pdf-lib akan otomatis membuang metadata 
      // dan objek sampah yang tidak terpakai (Basic Compression)
      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      
      const compressedBlob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      setResultSize(compressedBlob.size);

      // Trigger Download
      const url = URL.createObjectURL(compressedBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `RamaTools-Compressed.pdf`;
      link.click();
    } catch (error) {
      alert("Gagal mengompres. Pastikan file tidak dikunci (password).");
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Compress PDF</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Kecilkan ukuran file PDF Anda dengan membuang objek dan metadata yang tidak terpakai secara aman di browser.
        </p>
      </div>

      {!file ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="bg-white border-2 border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all rounded-3xl p-16 text-center cursor-pointer shadow-sm group"
        >
          <input type="file" accept="application/pdf" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          <UploadCloud className="w-16 h-16 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
          <p className="text-lg font-bold text-slate-800">Klik atau Pilih File PDF</p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FileArchive size={28}/></div>
              <div>
                <p className="font-bold text-slate-800">{file.name}</p>
                <p className="text-sm text-slate-500">Ukuran Asli: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button onClick={() => setFile(null)} className="text-sm font-bold text-red-500 hover:text-red-700">Ganti File</button>
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 mb-8">
            <h3 className="text-sm font-bold text-slate-800 mb-2">Metode Kompresi: Basic Clean-up</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sistem akan membaca ulang struktur PDF Anda dan membuang elemen sampah (metadata, tag tersembunyi) tanpa merusak kualitas teks/gambar. *Catatan: File yang sudah sangat padat mungkin tidak mengalami penurunan ukuran yang drastis.
            </p>
          </div>

          <button 
            onClick={handleCompress}
            disabled={isCompressing}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 disabled:bg-slate-300 flex items-center justify-center gap-2"
          >
            <ArrowDownCircle size={20} />
            {isCompressing ? "Sedang Mengompres..." : "Kompres & Download PDF"}
          </button>
        </div>
      )}
    </div>
  );
}
