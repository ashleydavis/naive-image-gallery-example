import React, { useState, useEffect } from 'react';

export function ImageCountMonitor() {
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    const updateImageCount = () => {
      const images = document.querySelectorAll('img');
      setImageCount(images.length);
    };

    // Update initially and on interval
    updateImageCount();
    const interval = setInterval(updateImageCount, 500);

    // Listen for DOM changes
    const observer = new MutationObserver(updateImageCount);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '60px',
        right: '10px',
        backgroundColor: '#21006f',
        color: '#26F0FD',
        padding: '8px',
        borderRadius: '4px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '12px',
        zIndex: 1000
      }}
    >
      Images: {imageCount}
    </div>
  );
}