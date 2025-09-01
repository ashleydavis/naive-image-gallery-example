import React from 'react';
import FPSStats from 'react-fps-stats';
import { Gallery } from './gallery.jsx';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <FPSStats 
          top="auto"
          left="auto"
          width={300}
          height={100}
          right={30}
          bottom={10}
      />
      <h1>Simple Image Gallery</h1>
      <Gallery />
    </div>
  );
}

export default App;