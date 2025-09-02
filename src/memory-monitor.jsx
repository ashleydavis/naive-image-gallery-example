import React, { useState, useEffect } from 'react';

export function MemoryMonitor() {
  const [memoryHistory, setMemoryHistory] = useState([]);
  const [currentMemory, setCurrentMemory] = useState(0);
  const maxSamples = 39;

  useEffect(() => {
    const interval = setInterval(() => {
      if (performance.memory) {
        const usage = performance.memory.usedJSHeapSize / 1024 / 1024;
        setCurrentMemory(usage);
        
        setMemoryHistory(prev => {
          const newHistory = [...prev, usage];
          return newHistory.slice(-maxSamples);
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!performance.memory) {
    return null;
  }

  const maxMemory = Math.max(...memoryHistory, 10);
  const avgMemory = memoryHistory.length > 0 ? 
    (memoryHistory.reduce((sum, val) => sum + val, 0) / memoryHistory.length) : 0;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        width: '146px',
        height: '90px',
        backgroundColor: '#21006f',
        color: '#26F0FD',
        padding: '3px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '1rem',
        lineHeight: '1.3rem',
        fontWeight: 300,
        zIndex: 1000
      }}
    >
      <span>
        {currentMemory.toFixed(1)} MB ({avgMemory.toFixed(1)} Avg)
      </span>
      <div
        style={{
          position: 'absolute',
          left: '3px',
          right: '3px',
          bottom: '3px',
          height: '60px',
          backgroundColor: '#282844',
          overflow: 'hidden'
        }}
      >
        {memoryHistory.map((memory, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              bottom: '0',
              right: `${4 * (memoryHistory.length - 1 - index)}px`,
              height: `${(60 * memory) / maxMemory}px`,
              width: '4px',
              backgroundColor: '#E200F7'
            }}
          />
        ))}
      </div>
    </div>
  );
}