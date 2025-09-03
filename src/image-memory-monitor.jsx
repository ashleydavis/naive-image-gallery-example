import React, { useState, useEffect } from 'react';

export function ImageMemoryMonitor() {
  const [imageMemory, setImageMemory] = useState(0);

  useEffect(() => {
    const calculateImageMemory = () => {
      const images = document.querySelectorAll('img');
      let totalMemory = 0;

      images.forEach(img => {
        if (img.complete && img.naturalWidth && img.naturalHeight) {
          // Estimate: width × height × 4 bytes (RGBA) for uncompressed bitmap
          const memoryBytes = img.naturalWidth * img.naturalHeight * 4 * 0.2; // By 0.2 because I assume jpgs are 20% the size of an uncompressed image.
          totalMemory += memoryBytes;
        }
      });

      setImageMemory(totalMemory / 1024 / 1024); // Convert to MB
    };

    // Calculate initially and on interval
    calculateImageMemory();
    const interval = setInterval(calculateImageMemory, 1000);

    // Listen for image load events
    const handleImageLoad = () => calculateImageMemory();
    document.addEventListener('load', handleImageLoad, true);

    return () => {
      clearInterval(interval);
      document.removeEventListener('load', handleImageLoad, true);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
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
      Images: ~{imageMemory.toFixed(1)} MB
    </div>
  );
}