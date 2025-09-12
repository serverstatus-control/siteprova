import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { t } from '../lib/utils';
import { translations } from '../lib/translations';
import { useSettings } from '../hooks/use-settings';

const Footer: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const { language } = useSettings();

  // Get current translations
  const currentTranslations = translations[language] || translations.it;

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
      <footer className="py-4 border-t bg-dark-light border-dark-lighter">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center justify-center text-center gap-x-2 gap-y-2">
            <span className="text-sm text-gray-400">&copy; 2025 Server Status <span className="mx-1">|</span> <span className="font-mono">v: 0.3.00</span></span>
            <span className="mx-1 text-gray-500">|</span>
            <button type="button" onClick={() => setShowTerms(true)} className="text-sm font-semibold text-gray-400 capitalize transition-colors hover:text-primary focus:outline-none">
              {currentTranslations.terms}
            </button>
            <span className="mx-1 text-gray-500">|</span>
            <button type="button" onClick={() => setShowPrivacy(true)} className="text-sm font-semibold text-gray-400 capitalize transition-colors hover:text-primary focus:outline-none">
              {currentTranslations.privacy}
            </button>
          </div>
        </div>
      </footer>
      
      {/* Modale Terms */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
          <div className="relative bg-dark-light rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hide shadow-lg">
            <button 
              onClick={() => setShowTerms(false)} 
              aria-label={currentTranslations.close}
              className="absolute text-xl font-bold text-gray-400 top-3 right-3 hover:text-primary focus:outline-none"
            >&times;</button>
            <h2 className="mb-4 text-2xl font-bold text-center text-primary">{currentTranslations.termsTitle}</h2>
            <div className="mb-4 space-y-4 text-base leading-relaxed text-gray-200">
              <p>{currentTranslations.termsContent.welcome}</p>
              
              <h3 className="mt-4 text-lg font-semibold">{currentTranslations.termsContent.section1.title}</h3>
              <p>{currentTranslations.termsContent.section1.content}</p>
              
              <h3 className="text-lg font-semibold">{currentTranslations.termsContent.section2.title}</h3>
              <p>{currentTranslations.termsContent.section2.content}</p>
              
              <h3 className="text-lg font-semibold">{currentTranslations.termsContent.section3.title}</h3>
              <p>{currentTranslations.termsContent.section3.content}</p>
              
              <h3 className="text-lg font-semibold">{currentTranslations.termsContent.section4.title}</h3>
              <p>{currentTranslations.termsContent.section4.content}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Modale Privacy */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
          <div className="relative bg-dark-light rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hide shadow-lg">
            <button 
              onClick={() => setShowPrivacy(false)} 
              aria-label={currentTranslations.close}
              className="absolute text-xl font-bold text-gray-400 top-3 right-3 hover:text-primary focus:outline-none"
            >&times;</button>
            <h2 className="mb-4 text-2xl font-bold text-center text-primary">{currentTranslations.privacyTitle}</h2>
            <div className="mb-4 space-y-4 text-base leading-relaxed text-gray-200">
              <p>{currentTranslations.privacyContent.intro}</p>
              
              <h3 className="mt-4 text-lg font-semibold">{currentTranslations.privacyContent.section1.title}</h3>
              <p>{currentTranslations.privacyContent.section1.content}</p>
              
              <h3 className="text-lg font-semibold">{currentTranslations.privacyContent.section2.title}</h3>
              <p>{currentTranslations.privacyContent.section2.content}</p>
              
              <h3 className="text-lg font-semibold">{currentTranslations.privacyContent.section3.title}</h3>
              <p>{currentTranslations.privacyContent.section3.content}</p>
              
              <h3 className="text-lg font-semibold">{currentTranslations.privacyContent.section4.title}</h3>
              <p>{currentTranslations.privacyContent.section4.content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;