import React, { useState, useEffect } from 'react';

function generateImages(count = 50) {
  const images = [];
  for (let i = 1; i <= count; i++) {
    const isPortrait = i % 2 === 0;
    const dimensions = isPortrait ? '200/300' : '300/200';
    images.push({
      thumb: `https://picsum.photos/${dimensions}?random=${i}`
    });
  }
  return images;
}

export function Gallery() {
  const [images, setImages] = useState(null);
  
  useEffect(() => {
    const sampleImages = generateImages();
    setImages(sampleImages);
  }, []);

  if (!images) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "10px"
      }}
    >
      {images.map((image, index) => {
        return (
          <img
            key={index}
            style={{
              height: "200px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }} 
            src={image.thumb} 
            alt={`Gallery image ${index + 1}`}
          />
        );
      })}
    </div>
  );
}