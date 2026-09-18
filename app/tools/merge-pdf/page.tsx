'use client';
import { useState } from 'react';

export default function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);

  const handleMerge = async () => {
    if (files.length < 2) return alert("Pilih minimal 2 file PDF");
    setIsMerging(true);
    
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    try {
      const res = await fetch('/api/pdf/merge', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) throw new Error("Gagal menggabungkan");
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "RamaTools-Merged.pdf";
      a.click();
    } catch (error) {
      alert("Terjadi kesalahan sistem saat menggabungkan PDF.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Merge PDF</h1>
      <p className="text-slate-500 mb-8">Gabungkan banyak file PDF menjadi satu dokumen dengan aman.</p>
      
      <div className="p-8 bg-white border-2 border-dashed border-slate-300 rounded-2xl text-center mb-6">
        <input 
          type="file" 
          multiple 
          accept="application/pdf"
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {files.length > 0 && (
        <div className="mb-6 space-y-2">
          <p className="text-sm font-medium text-slate-700">File yang dipilih ({files.length}):</p>
          {files.map((f, i) => (
            <div key={i} className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-100 flex justify-between">
              <span>{f.name}</span>
              <span className="text-slate-400">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={handleMerge} 
        disabled={isMerging || files.length < 2}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold disabled:bg-slate-300 transition-all hover:bg-blue-700 active:scale-95"
      >
        {isMerging ? "Menggabungkan..." : "Gabungkan PDF Sekarang"}
      </button>
    </div>
  );
}
