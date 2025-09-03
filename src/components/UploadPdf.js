// Add this to a new component, e.g., UploadPdf.js
import React, { useState } from 'react';

export default function UploadPdf() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert('Upload successful!');
    } catch (error) {
      alert('Upload failed!');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button type="submit">Upload PDF</button>
    </form>
  );
}