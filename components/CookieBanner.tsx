'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user already accepted cookies
    const cookieConsent = localStorage.getItem('witty-wolf-cookie-consent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('witty-wolf-cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('witty-wolf-cookie-consent', 'rejected');
    setShowBanner(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-black border-t border-white/10 backdrop-blur-xl"
        >
          <div className="container mx-auto max-w-6xl px-6 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Usamos cookies para melhorar a tua experiência. Ao continuar, aceitas a nossa{' '}
                  <Link href="/politica-privacidade" className="text-pink-400 hover:text-pink-300 underline">
                    Política de Privacidade
                  </Link>
                  {' '}e{' '}
                  <Link href="/politica-cookies" className="text-pink-400 hover:text-pink-300 underline">
                    Política de Cookies
                  </Link>
                  .
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={handleReject}
                  className="px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition text-sm font-medium"
                >
                  Rejeitar
                </button>
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff7b69] via-[#f2709c] to-[#5b5bf7] text-white hover:scale-[1.02] transition text-sm font-medium shadow-lg shadow-fuchsia-500/30"
                >
                  Aceitar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
