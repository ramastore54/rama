import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, FileSearch, PenTool, ArrowRight } from 'lucide-react';

// ==========================================
// TAG SEO (Metadata) untuk Indexing Google
// ==========================================
export const metadata: Metadata = {
  title: 'Rama Tools | Platform Produktivitas All-in-One',
  description: 'Selamat datang di tools rama.id. Nikmati fitur PDF Suite, CV Builder instan, dan ATS Scanner secara gratis dan aman langsung dari browser Anda.',
  keywords: ['Rama Tools', 'rama.id', 'PDF Tools', 'Merge PDF', 'PDF Scanner', 'CV Builder', 'ATS Scanner', 'CV Maker Indonesia'],
  openGraph: {
    title: 'Rama Tools Productivity Suite',
    description: 'Platform All-in-One untuk kebutuhan dokumen Anda.',
    url: 'https://ramahaxor.my.id',
    siteName: 'RAMADEV.ID',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 text-center relative overflow-hidden">
      {/* Background Gradient & Glass Effect */}
      <div className="absolute top-0 -z-10 h-full w-full bg-slate-50">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[20%] translate-y-[10%] rounded-full bg-blue-400/20 opacity-60 blur-[100px]"></div>
        <div className="absolute top-auto right-auto left-0 bottom-0 h-[500px] w-[500px] translate-x-[10%] -translate-y-[10%] rounded-full bg-indigo-400/20 opacity-60 blur-[100px]"></div>
      </div>
      
      {/* Badge Sambutan */}
      <div className="mt-16 mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold shadow-sm">
        <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
        Selamat datang di tools rama.id
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl">
        All Your Productivity <br className="hidden md:block"/>
        Tools in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">One Place</span>
      </h1>
      
      {/* Deskripsi & Daftar Fitur */}
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed">
        Tingkatkan produktivitas Anda tanpa batas. Platform kami menyediakan fitur <strong>PDF Suite</strong> (Scanner & Merger), <strong>CV Builder</strong> untuk membuat riwayat hidup instan, dan <strong>ATS Scanner</strong> untuk menganalisis loker. Semua proses berjalan cepat dan aman langsung di browser Anda.
      </p>
      
      {/* Tombol Aksi */}
      <div className="flex flex-col sm:flex-row gap-4 mb-24 w-full sm:w-auto">
        <Link href="/tools" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group">
          <FileText size={20} />
          Mulai Gunakan Tools
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full pb-16">
        <FeatureCard 
          icon={<FileText size={32}/>} 
          title="PDF Suite" 
          desc="Modifikasi dokumen dengan fitur Merge PDF untuk menggabungkan file dan PDF Scanner untuk membaca metadata tersembunyi." 
        />
        <FeatureCard 
          icon={<PenTool size={32}/>} 
          title="CV Builder Instan" 
          desc="Ketik data diri Anda dan langsung unduh (Download) menjadi file PDF profesional tanpa perlu mendaftar akun." 
        />
        <FeatureCard 
          icon={<FileSearch size={32}/>} 
          title="ATS Scanner" 
          desc="Analisis kecocokan kata kunci antara isi CV Anda dengan deskripsi lowongan pekerjaan (Job Desc) secara transparan." 
        />
      </div>
    </div>
  );
}

// Komponen Kartu Fitur
function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
