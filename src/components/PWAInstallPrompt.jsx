import React, { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered');
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  useEffect(() => {
    // Register service worker and handle updates
    if ('serviceWorker' in navigator) {
      const wb = new Workbox('/sw.js');

      wb.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          setIsUpdateAvailable(true);
        }
      });

      wb.register();
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      const lastPromptTime = localStorage.getItem('lastInstallPromptTime');
      const now = Date.now();
      
      if (!lastPromptTime || (now - parseInt(lastPromptTime)) > (7 * 24 * 60 * 60 * 1000)) {
        setShowPrompt(true);
        localStorage.setItem('lastInstallPromptTime', now.toString());
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // ... rest of your component code
}

export default PWAInstallPrompt;
