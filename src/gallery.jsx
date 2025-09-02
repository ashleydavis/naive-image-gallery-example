import React, { useState, useEffect } from 'react';

async function fetchImagesFromAPI() {
  const response = await fetch('https://photosphere-100k.codecapers.com.au/get-all?db=07156b64-d625-4aed-a53b-ede22866f718&col=metadata');
  const data = await response.json();
  return data.records.map(record => ({ thumb: record.properties.fullData.src?.tiny || record.properties.fullData.urls?.thumb }));
}

export function Gallery() {
  const [images, setImages] = useState(null);
  
  useEffect(() => {
    fetchImagesFromAPI().then(setImages);
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
            }} 
            src={image.thumb} 
            alt={`Gallery image ${index + 1}`}
          />
        );
      })}
    </div>
  );
}