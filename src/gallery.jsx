import React, { useState, useEffect, useRef } from 'react';
import { ImageCountMonitor } from './image-count-monitor.jsx';

const BASE_URL = `https://photosphere-100k.codecapers.com.au`;
//const BASE_URL = `http://localhost:3000`;
const databaseId = `07156b64-d625-4aed-a53b-ede22866f718`;

async function fetchImagesFromAPI(nextToken = undefined, retries = 3) {
  let url = `${BASE_URL}/get-all?db=${databaseId}&col=metadata`;
  if (nextToken) {
    url += `&next=${nextToken}`;
  }

  // console.log(`Loading from ${url}`);
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`Got data!`);
      return {
        // images: data.records.map(record => ({ thumb: record.properties.fullData.src?.tiny || record.properties.fullData.urls?.thumb })),
        images: data.records.map(record => ({ thumb: `${BASE_URL}/asset?id=${record._id}&db=${databaseId}&type=thumb` })),
        next: data.next
      };
    }
   
    
    if (attempt < retries) {
      console.log(`Retry ${attempt + 1} for ${url}`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
  
  throw new Error(`Failed to fetch after ${retries + 1} attempts`);
}

export function Gallery() {
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const loading = useRef(true);

  useEffect(() => {

    loading.current = true;

    async function loadMoreImages(nextToken = undefined) {
      if (!loading.current) {
        // Finished loading.
        console.log(`Finished loading.`);
        return;
      }
      
      const result = await fetchImagesFromAPI(nextToken);    
      
      setImages(prev => [...prev, ...result.images]);
      setTotalImages(prev => prev + result.images.length);
    
      if (result.next) {
        // Might cause stack overflow.
        // loadMoreImages(result.next);

        // Postpone loading of next page for a moment.
        // This is more to avoid stack overflow than for performance.
        setTimeout(() => loadMoreImages(result.next), 100);
      }
      else {
        loading.current = false;
      }
    }
    
    setTimeout(() => loadMoreImages(), 0);

    return () => {
      console.log(`Unmounted`)
      loading.current = false;
    };
  }, []);

  useEffect(() => {

    console.log(`Have total images: ${totalImages}`);

    if (totalImages > 50000) {
      // Maxed out.
      console.log(`Have enough images.`);        
      loading.current = false;
    }

  }, [totalImages]);

  if (totalImages === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
      
      <ImageCountMonitor 
        imageCount={totalImages}
        />
    </>
  );
}