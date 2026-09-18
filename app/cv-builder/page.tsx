'use client';
import { useState } from 'react';

export default function CVBuilder() {
  const [cvData, setCvData] = useState({
    name: 'Nama Anda',
    title: 'Posisi Pekerjaan',
    summary: 'Tuliskan deskripsi profesional singkat tentang pengalaman dan tujuan karir Anda di sini.'
  });

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 h-[calc(100vh-4rem)]">
      {/* KIRI: Form Editor */}
      <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
        <div className="p-4 border-b border-slate-100 bg-slate-50"><h2 className="text-lg font-bold text-slate-800">Data Diri</h2></div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <input type="text" onChange={(e) => setCvData({...cvData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Posisi Pekerjaan</label>
            <input type="text" onChange={(e) => setCvData({...cvData, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" placeholder="Software Engineer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Diri (Summary)</label>
            <textarea onChange={(e) => setCvData({...cvData, summary: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 h-32" placeholder="Saya adalah seorang profesional..." />
          </div>
        </div>
      </div>

      {/* KANAN: Live Preview */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-slate-100 rounded-2xl border border-slate-200 p-8 justify-center overflow-y-auto items-start">
        <div className="bg-white shadow-xl aspect-[1/1.414] w-full max-w-[700px] p-12 text-slate-800 transition-all duration-300">
           <h1 className="text-4xl font-extrabold uppercase mb-1 tracking-tight text-slate-900">{cvData.name || 'Nama Anda'}</h1>
           <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-6">{cvData.title || 'Posisi Pekerjaan'}</p>
           
           <div className="mb-6">
             <h3 className="text-xs font-bold uppercase text-slate-400 border-b-2 border-slate-200 pb-1 mb-2">Profil</h3>
             <p className="text-sm text-slate-600 leading-relaxed text-justify">{cvData.summary || 'Deskripsi akan muncul di sini.'}</p>
           </div>
        </div>
      </div>
    </div>
  );
}
