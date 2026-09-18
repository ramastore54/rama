'use client';
import { useState, useEffect } from 'react';
import { Download, LayoutTemplate } from 'lucide-react';

export default function CoverLetter() {
  const [data, setData] = useState({
    name: 'Muhammad Syafiq Ramadani',
    contact: 'Tasikmalaya, Jawa Barat | email@anda.com | 0812-XXXX-XXXX',
    date: '18 September 2026',
    hrName: 'Bapak/Ibu HRD Manager',
    company: 'PT Teknologi Inovasi',
    position: 'Frontend Developer',
    body: ''
  });

  const templates = {
    formal: `Dengan hormat,

Berdasarkan informasi yang saya peroleh, {company} saat ini sedang membuka kesempatan untuk posisi {position}. Melalui surat ini, saya bermaksud menyampaikan ketertarikan saya untuk mengisi posisi tersebut.

Saya memiliki latar belakang dan pengalaman yang relevan dengan kebutuhan perusahaan. Saya terbiasa bekerja secara mandiri maupun dalam tim, memiliki kemampuan analisis yang baik, serta selalu antusias untuk mempelajari hal-hal baru yang dapat mendukung produktivitas.

Bersama surat ini, saya lampirkan Curriculum Vitae (CV) sebagai rincian lebih lanjut mengenai kualifikasi saya. Saya sangat berharap dapat mendiskusikan peluang ini lebih jauh dalam sesi wawancara.

Atas waktu dan perhatian Bapak/Ibu, saya ucapkan terima kasih.`,
    
    kreatif: `Halo {hrName},

Saya telah lama mengikuti perkembangan {company} dan sangat kagum dengan inovasi yang terus dihadirkan oleh tim Anda. Oleh karena itu, saya sangat antusias saat mengetahui adanya pembukaan untuk posisi {position}.

Dengan pengalaman teknis dan kreativitas yang saya miliki, saya yakin dapat memberikan kontribusi positif serta membawa perspektif segar bagi proyek-proyek di perusahaan ini. Saya adalah seorang problem-solver yang adaptif dan sangat menikmati tantangan baru.

Saya telah melampirkan portofolio dan CV saya untuk referensi Bapak/Ibu. Saya menantikan kesempatan untuk berdiskusi tentang bagaimana visi saya sejalan dengan tujuan perusahaan.

Terima kasih atas kesempatan dan waktu yang diberikan.`,

    ringkas: `Yth. {hrName},

Melalui surat ini, saya bermaksud melamar posisi {position} di {company}.

Saya memiliki kualifikasi praktis dan keahlian yang sangat sesuai dengan kriteria yang dibutuhkan. Saya siap untuk langsung terjun berkontribusi dan memberikan hasil yang maksimal bagi tim Anda sejak hari pertama.

Detail mengenai riwayat pendidikan dan proyek-proyek yang pernah saya kerjakan telah saya sertakan dalam CV terlampir. Saya sangat menantikan kabar baik dari Bapak/Ibu untuk tahapan selanjutnya.

Terima kasih atas waktu dan pertimbangannya.`
  };

  // Set template awal
  useEffect(() => {
    applyTemplate('formal');
  }, []);

  const applyTemplate = (type: 'formal' | 'kreatif' | 'ringkas') => {
    let text = templates[type];
    text = text.replace(/{company}/g, data.company || '[Perusahaan]');
    text = text.replace(/{position}/g, data.position || '[Posisi]');
    text = text.replace(/{hrName}/g, data.hrName || '[HR_Name]');
    setData({ ...data, body: text });
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-4rem)] print:p-0 print:m-0 print:block">
      
      {/* PANEL KIRI: EDITOR (Hilang saat diprint) */}
      <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[calc(100vh-6rem)] print:hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><LayoutTemplate size={20}/> Editor Lamaran</h2>
          <button onClick={handleDownload} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95 flex items-center gap-2">
            <Download size={16}/> Download PDF
          </button>
        </div>
        
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Opsi Template */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-3">Pilih Template Surat:</label>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => applyTemplate('formal')} className="py-2 px-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold hover:bg-blue-100">Formal</button>
              <button onClick={() => applyTemplate('kreatif')} className="py-2 px-3 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-xs font-bold hover:bg-purple-100">Kreatif</button>
              <button onClick={() => applyTemplate('ringkas')} className="py-2 px-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold hover:bg-emerald-100">Ringkas</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Nama Pelamar</label>
              <input type="text" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Posisi yg Dilamar</label>
              <input type="text" value={data.position} onChange={(e) => setData({...data, position: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-600 mb-1">Kontak / Alamat</label>
              <input type="text" value={data.contact} onChange={(e) => setData({...data, contact: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Nama Perusahaan</label>
              <input type="text" value={data.company} onChange={(e) => setData({...data, company: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Penerima (HRD)</label>
              <input type="text" value={data.hrName} onChange={(e) => setData({...data, hrName: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">Isi Surat (Bisa diedit manual)</label>
            <textarea 
              value={data.body} 
              onChange={(e) => setData({...data, body: e.target.value})} 
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 text-sm h-64 leading-relaxed" 
            />
          </div>
        </div>
      </div>

      {/* PANEL KANAN: LIVE PREVIEW KERTAS A4 */}
      <div className="w-full lg:w-1/2 bg-slate-100 rounded-2xl border border-slate-200 p-8 flex justify-center overflow-y-auto items-start print:w-full print:bg-white print:p-0 print:border-none print:m-0">
        <div className="bg-white shadow-xl w-full max-w-[700px] aspect-[1/1.414] p-12 text-slate-800 text-[15px] leading-relaxed transition-all duration-300 print:shadow-none print:max-w-none print:w-[210mm] print:h-[297mm]">
           
           <div className="text-right mb-12">
             <h1 className="text-2xl font-bold text-slate-900 mb-1">{data.name}</h1>
             <p className="text-sm text-slate-500">{data.contact}</p>
           </div>

           <div className="mb-10">
             <p className="mb-1">{data.date}</p>
             <p className="font-bold text-slate-800">Kepada Yth,</p>
             <p className="font-bold text-slate-800">{data.hrName}</p>
             <p>{data.company}</p>
           </div>

           <div className="mb-6 font-bold text-slate-800 border-b-2 border-slate-900 inline-block pb-1">
             Hal: Lamaran Pekerjaan - {data.position}
           </div>

           <div className="whitespace-pre-wrap text-justify text-slate-700 mb-16">
             {data.body}
           </div>

           <div className="mt-auto">
             <p className="mb-8">Hormat saya,</p>
             <p className="font-bold text-slate-900">{data.name}</p>
           </div>
           
        </div>
      </div>
    </div>
  );
}
