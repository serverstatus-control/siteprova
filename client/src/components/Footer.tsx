import React, { useState } from 'react';
import { Link } from 'wouter';
import { t } from '../lib/utils';

const Footer: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="bg-dark-light border-t border-dark-lighter py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
            <span className="text-sm text-gray-400">&copy; 2025 Server Status | <span className="font-mono">v: 0.3.00</span></span>
            <span className="text-gray-500">|</span>
            <button type="button" onClick={() => setShowTerms(true)} className="text-sm text-gray-400 hover:text-primary transition-colors font-semibold uppercase focus:outline-none focus:ring-2 focus:ring-primary">{t('terms')}</button>
            <span className="text-gray-500">|</span>
            <button type="button" onClick={() => setShowPrivacy(true)} className="text-sm text-gray-400 hover:text-primary transition-colors font-semibold uppercase focus:outline-none focus:ring-2 focus:ring-primary">{t('privacy')}</button>
            <span className="text-gray-500">|</span>
            <Link href="/info" className="text-sm text-gray-400 hover:text-primary transition-colors">{t('infoAndContacts')}</Link>
            <span className="text-gray-500">|</span>
            <Link href="/admin" className="text-sm text-gray-400 hover:text-primary transition-colors">Admin</Link>
          </div>
        </div>
      </footer>
      {/* Modale Terms */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-dark-light rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <button onClick={() => setShowTerms(false)} aria-label="Chiudi" className="absolute top-3 right-3 text-gray-400 hover:text-primary text-xl font-bold focus:outline-none">&times;</button>
            <h2 className="text-2xl font-bold mb-4 text-primary text-center">{t('termsTitle')}</h2>
            <p className="mb-4 text-base text-gray-200 leading-relaxed whitespace-pre-line">Questi sono i termini di utilizzo del servizio Server Status. Utilizzando questo sito accetti le condizioni riportate. (Testo di esempio)</p>
          </div>
        </div>
      )}
      {/* Modale Privacy */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-dark-light rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <button onClick={() => setShowPrivacy(false)} aria-label="Chiudi" className="absolute top-3 right-3 text-gray-400 hover:text-primary text-xl font-bold focus:outline-none">&times;</button>
            <h2 className="text-2xl font-bold mb-4 text-primary text-center">{t('privacyTitle')}</h2>
            <p className="mb-4 text-base text-gray-200 leading-relaxed whitespace-pre-line">La tua privacy è importante. Nessun dato personale viene salvato oltre a quelli necessari per il funzionamento del servizio. (Testo di esempio)</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;