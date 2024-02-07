import React from 'react';

function PDFViewer({ src }) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <iframe
        title="PDF Viewer"
        src={src}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
}

export default PDFViewer;
