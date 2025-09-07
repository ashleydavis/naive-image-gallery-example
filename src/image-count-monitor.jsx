import React, { useState, useEffect } from 'react';

export function ImageCountMonitor({ imageCount }) {
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