'use client';
import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PDFScanner() {
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      setMeta({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        pages: pdfDoc.getPageCount(),
        creator: pdfDoc.getCreator() || 'Tidak disetel',
        producer: pdfDoc.getProducer() || 'Tidak disetel',
        title: pdfDoc.getTitle() || 'Tidak ada judul'
      });
    } catch (error) {
      alert("Gagal membaca metadata. Pastikan file adalah PDF yang tidak di-password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">PDF Scanner</h1>
      <p className="text-slate-500 mb-8">Bongkar informasi tersembunyi (metadata) dari dokumen PDF Anda secara instan.</p>
      
      <div className="p-8 bg-white border-2 border-dashed border-slate-300 rounded-2xl text-center mb-6">
        <input 
          type="file" 
          accept="application/pdf"
          onChange={handleScan}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {isLoading && <p className="text-blue-600 font-medium">Sedang memindai file...</p>}

      {meta && !isLoading && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
          <h3 className="font-bold text-slate-800 border-b pb-2">Hasil Pemindaian:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div><span className="text-slate-500 block text-xs">Nama File</span> <span className="font-medium text-slate-800">{meta.name}</span></div>
            <div><span className="text-slate-500 block text-xs">Ukuran</span> <span className="font-medium text-slate-800">{meta.size}</span></div>
            <div><span className="text-slate-500 block text-xs">Jumlah Halaman</span> <span className="font-medium text-slate-800">{meta.pages} Halaman</span></div>
            <div><span className="text-slate-500 block text-xs">Judul Dokumen</span> <span className="font-medium text-slate-800">{meta.title}</span></div>
            <div><span className="text-slate-500 block text-xs">Aplikasi Pembuat (Creator)</span> <span className="font-medium text-slate-800">{meta.creator}</span></div>
            <div><span className="text-slate-500 block text-xs">Software (Producer)</span> <span className="font-medium text-slate-800">{meta.producer}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
