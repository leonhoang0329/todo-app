import React, { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      // Store the event for later use
      setDeferredPrompt(event);
      // Show our custom install prompt
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    // Hide the custom prompt
    setShowPrompt(false);
    
    // Show the browser's install prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        
        // Clear the saved prompt as it can't be used again
        setDeferredPrompt(null);
      });
    }
  };

  const handleDismissClick = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="install-prompt">
      <div>
        <strong>Install this app on your device</strong>
        <p>Use it offline and get a better experience</p>
      </div>
      <div>
        <button className="install-btn" onClick={handleInstallClick}>Install</button>
        <button className="btn" onClick={handleDismissClick} style={{ marginLeft: '10px' }}>Not now</button>
      </div>
    </div>
  );
};

export default InstallPrompt;