'use client';
import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { UploadCloud, Scissors, FileText } from 'lucide-react';

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      // Baca jumlah halaman secara instan
      const arrayBuffer = await selected.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPageCount();
      setTotalPages(pages);
      setEndPage(pages); // Default set ke halaman terakhir
    } else {
      alert("Mohon upload file PDF yang valid.");
    }
  };

  const handleSplit = async () => {
    if (!file) return;
    if (startPage < 1 || endPage > totalPages || startPage > endPage) {
      return alert("Rentang halaman tidak valid.");
    }
    
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      // Ekstrak halaman (index dimulai dari 0, jadi kurangi 1)
      const pageIndices = [];
      for (let i = startPage - 1; i < endPage; i++) {
        pageIndices.push(i);
      }

      const copiedPages = await newPdf.copyPages(originalPdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      // Trigger Download
      const link = document.createElement('a');
      link.href = url;
      link.download = `RamaTools-Split-Page-${startPage}-to-${endPage}.pdf`;
      link.click();
    } catch (error) {
      alert("Gagal memotong PDF. Pastikan file tidak dipassword.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Split PDF</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Pisahkan halaman tertentu dari dokumen PDF Anda menjadi file baru. Proses berjalan instan dan aman langsung di perangkat Anda.
        </p>
      </div>

      {!file ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="bg-white border-2 border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all rounded-3xl p-16 text-center cursor-pointer shadow-sm group"
        >
          <input 
            type="file" 
            accept="application/pdf" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <UploadCloud className="w-16 h-16 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
          <p className="text-lg font-bold text-slate-800">Klik atau Pilih File PDF</p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FileText size={28}/></div>
            <div>
              <p className="font-bold text-slate-800">{file.name}</p>
              <p className="text-sm text-slate-500">{totalPages} Halaman • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button onClick={() => setFile(null)} className="ml-auto text-sm font-bold text-red-500 hover:text-red-700">Ganti File</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Mulai dari halaman:</label>
              <input 
                type="number" 
                min="1" 
                max={totalPages}
                value={startPage}
                onChange={(e) => setStartPage(Number(e.target.value))}
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Sampai halaman:</label>
              <input 
                type="number" 
                min="1" 
                max={totalPages}
                value={endPage}
                onChange={(e) => setEndPage(Number(e.target.value))}
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold"
              />
            </div>
          </div>

          <button 
            onClick={handleSplit}
            disabled={isProcessing}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 disabled:bg-slate-300 flex items-center justify-center gap-2"
          >
            <Scissors size={20} />
            {isProcessing ? "Memotong PDF..." : "Pisahkan & Download PDF"}
          </button>
        </div>
      )}
    </div>
  );
}
