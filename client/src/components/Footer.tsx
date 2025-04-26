import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { t } from '../lib/utils';

const Footer: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Gestione del tasto ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowTerms(false);
        setShowPrivacy(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <footer className="bg-dark-light border-t border-dark-lighter py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
            <span className="text-sm text-gray-400">&copy; 2025 Server Status | <span className="font-mono">v: 0.3.00</span></span>
            <span className="text-gray-500">|</span>
            <button type="button" onClick={() => setShowTerms(true)} className="text-sm text-gray-400 hover:text-primary transition-colors font-semibold capitalize focus:outline-none">{t('Terms')}</button>
            <span className="text-gray-500">|</span>
            <button type="button" onClick={() => setShowPrivacy(true)} className="text-sm text-gray-400 hover:text-primary transition-colors font-semibold capitalize focus:outline-none">{t('Privacy')}</button>
            <span className="text-gray-500">|</span>
            <Link href="/info" className="text-sm text-gray-400 hover:text-primary transition-colors">Info & Contatti</Link>
            <span className="text-gray-500">|</span>
            <Link href="/admin" className="text-sm text-gray-400 hover:text-primary transition-colors">Admin</Link>
          </div>
        </div>
      </footer>
      
      {/* Modale Terms */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="relative bg-dark-light rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <button 
              onClick={() => setShowTerms(false)} 
              aria-label="Chiudi" 
              className="absolute top-3 right-3 text-gray-400 hover:text-primary text-xl font-bold focus:outline-none"
            >&times;</button>
            <h2 className="text-2xl font-bold mb-4 text-primary text-center">Termini di Servizio</h2>
            <div className="mb-4 text-base text-gray-200 leading-relaxed space-y-4">
              <p>Benvenuto in Server Status. Utilizzando questo servizio, accetti i seguenti termini e condizioni:</p>
              
              <h3 className="text-lg font-semibold mt-4">1. Accettazione dei Termini</h3>
              <p>Utilizzando Server Status, l'utente accetta di essere vincolato da questi termini di servizio. Se non si accettano questi termini, si prega di non utilizzare il servizio.</p>
              
              <h3 className="text-lg font-semibold">2. Descrizione del Servizio</h3>
              <p>Server Status fornisce un monitoraggio in tempo reale dello stato dei servizi. Il servizio è fornito "così com'è" e potrebbe essere soggetto a modifiche o interruzioni.</p>
              
              <h3 className="text-lg font-semibold">3. Responsabilità</h3>
              <p>Non siamo responsabili per eventuali danni diretti o indiretti derivanti dall'utilizzo o dall'impossibilità di utilizzare il servizio.</p>
              
              <h3 className="text-lg font-semibold">4. Modifiche ai Termini</h3>
              <p>Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno effettive immediatamente dopo la pubblicazione sul sito.</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Modale Privacy */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="relative bg-dark-light rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <button 
              onClick={() => setShowPrivacy(false)} 
              aria-label="Chiudi" 
              className="absolute top-3 right-3 text-gray-400 hover:text-primary text-xl font-bold focus:outline-none"
            >&times;</button>
            <h2 className="text-2xl font-bold mb-4 text-primary text-center">Informativa sulla Privacy</h2>
            <div className="mb-4 text-base text-gray-200 leading-relaxed space-y-4">
              <p>La tua privacy è importante per noi. Questa informativa spiega come raccogliamo e utilizziamo i tuoi dati:</p>
              
              <h3 className="text-lg font-semibold mt-4">1. Raccolta dei Dati</h3>
              <p>Raccogliamo solo i dati essenziali necessari per il funzionamento del servizio, come informazioni di login e preferenze dell'utente.</p>
              
              <h3 className="text-lg font-semibold">2. Utilizzo dei Dati</h3>
              <p>I dati raccolti vengono utilizzati esclusivamente per fornire e migliorare il servizio. Non vendiamo né condividiamo i tuoi dati con terze parti.</p>
              
              <h3 className="text-lg font-semibold">3. Cookie</h3>
              <p>Utilizziamo cookie essenziali per mantenere il tuo login e le tue preferenze. Puoi gestire i cookie dalle impostazioni del tuo browser.</p>
              
              <h3 className="text-lg font-semibold">4. Sicurezza</h3>
              <p>Adottiamo misure di sicurezza standard del settore per proteggere i tuoi dati da accessi non autorizzati.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;