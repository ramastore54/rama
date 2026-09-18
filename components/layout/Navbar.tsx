'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Tambahkan Surat Lamaran ke dalam Navigasi
  const navLinks = [
    { name: 'PDF Tools', href: '/tools' },
    { name: 'CV Builder', href: '/cv-builder' },
    { name: 'Surat Lamaran', href: '/cover-letter' },
    { name: 'ATS Scanner', href: '/ats-scanner' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link href="/" className="text-lg font-extrabold text-slate-900 tracking-tight">
            Rama<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Tools</span>
          </Link>
          
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={`text-sm font-medium transition-colors ${pathname === link.href ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>
                {link.name}
              </Link>
            ))}
          </div>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 absolute w-full shadow-xl">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
