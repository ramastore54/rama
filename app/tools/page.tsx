import Link from 'next/link';

export default function Tools() {
  const tools = [
    { name: 'Merge PDF', desc: 'Gabungkan banyak file PDF menjadi satu.', href: '/tools/merge-pdf' },
    { name: 'Split PDF', desc: 'Pisahkan halaman PDF menjadi beberapa file.', href: '/tools/split-pdf' },
    { name: 'Compress PDF', desc: 'Kecilkan ukuran file PDF Anda.', href: '/tools/compress-pdf' },
    { name: 'Image to PDF', desc: 'Ubah gambar (JPG/PNG) menjadi dokumen PDF.', href: '/tools/img-to-pdf' },
    { name: 'PDF to JPG', desc: 'Ubah halaman PDF menjadi gambar kualitas tinggi.', href: '/tools/pdf-to-jpg' },
    { name: 'PDF Scanner', desc: 'Bongkar metadata rahasia dari dokumen PDF.', href: '/tools/pdf-scanner' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">PDF Tools Suite</h1>
      <p className="text-slate-500 mb-8">Pilih alat yang Anda butuhkan untuk memodifikasi dokumen secara instan.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link key={tool.name} href={tool.href} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all group">
            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600">{tool.name}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
