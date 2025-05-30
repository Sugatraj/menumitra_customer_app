import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    registerSW({
      onRegistered(r) {
        console.log('Service Worker registered');
      },
      onRegisterError(error) {
        console.log('SW registration failed:', error);
      }
    });
  }
}
