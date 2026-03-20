// components/Header.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const pathname = usePathname();
  const isTranslatorPage = pathname === '/translator';

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">🎙️</span>
          <span className="logo-text">
            IPA<span>Tech</span>
          </span>
        </div>

        {!isTranslatorPage ? (
          <nav className="main-nav">
            <a href="#introduccion">Introducción</a>
            <a href="#problema">Problema</a>
            <a href="#antecedentes">Antecedentes</a>
            <a href="#justificacion">Justificación</a>
            <a href="#objetivos">Objetivos</a>
          </nav>
        ) : (
          <nav className="main-nav">
            <Link href="/" className="back-link">
              <span className="back-icon">← </span>
              Volver al inicio
            </Link>
          </nav>
        )}

        <div className="header-actions">
          <a 
            className="a-github" 
            href="https://github.com/OmarZamoranoGarcia/Traductor_IPA" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;