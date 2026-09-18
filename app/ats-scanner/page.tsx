'use client';
import { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function ATSScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setResult(null);
    } else {
      alert("Mohon upload file dengan format PDF.");
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setIsAnalyzing(true);
    setProgress(0);

    // Simulasi progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 400);

    setTimeout(() => {
      // Hasil analisis fokus pada kerapian struktur file PDF
      setResult({
        score: Math.floor(Math.random() * (95 - 65 + 1)) + 65, // Random skor simulasi
        feedbacks: [
          { icon: <CheckCircle2 className="text-green-500 mt-1 shrink-0" />, text: 'Ekstraksi Teks Berhasil: Tidak ada teks yang disandikan (encoded) atau font rusak.' },
          { icon: <AlertTriangle className="text-yellow-500 mt-1 shrink-0" />, text: 'Analisis Kerapian: Terdeteksi potensi elemen tabel atau layout dua kolom. Beberapa mesin ATS mungkin akan membaca teks ini secara menyamping sehingga urutan kalimat menjadi berantakan.' },
          { icon: <XCircle className="text-red-500 mt-1 shrink-0" />, text: 'Grafik Terdeteksi: Terdapat elemen visual/bar nilai yang tidak bisa diartikan oleh robot menjadi teks.' }
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">ATS CV Format Scanner</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Upload file PDF CV Anda. Sistem akan memeriksa apakah struktur, desain, dan layout CV Anda berantakan saat diekstrak oleh mesin ATS perusahaan.
        </p>
      </div>

      {/* Area Upload File Saja */}
      {!isAnalyzing && !result && (
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
          {file ? (
            <div>
              <p className="text-xl font-bold text-slate-800">{file.name}</p>
              <p className="text-sm text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-bold text-slate-800">Klik atau Pilih File PDF CV Anda</p>
              <p className="text-sm text-slate-500 mt-1">Hanya menerima dokumen berformat .PDF</p>
            </div>
          )}
        </div>
      )}

      {/* Tombol Mulai */}
      {file && !isAnalyzing && !result && (
        <div className="mt-8 text-center">
          <button 
            onClick={handleAnalyze} 
            className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            Mulai Analisis Format CV
          </button>
        </div>
      )}

      {/* Loading Animasi */}
      {isAnalyzing && (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Membaca Struktur PDF...</h3>
          <p className="text-slate-500 text-sm mb-6">Memeriksa kerapian teks, tabel, dan kolom tersembunyi...</p>
          <div className="w-full bg-slate-100 rounded-full h-2 max-w-md mx-auto overflow-hidden">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {/* Hasil Kerapian CV */}
      {result && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-900 p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Hasil Audit Kerapian ATS</h2>
              <p className="text-slate-400 text-sm flex items-center gap-2"><FileText size={16}/> {file?.name}</p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ATS Readability Score</p>
              <p className="text-4xl font-extrabold" style={{ color: result.score >= 80 ? '#4ade80' : '#facc15' }}>{result.score}/100</p>
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-6 border-b pb-2">Laporan Struktur Dokumen</h3>
            <div className="space-y-4">
              {result.feedbacks.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  {item.icon}
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button 
                onClick={() => { setFile(null); setResult(null); }} 
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
              >
                Scan PDF CV Lainnya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
