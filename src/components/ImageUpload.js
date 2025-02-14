import React, { useState } from 'react';
import { useError } from '../contexts/ErrorContext';

import axios from 'axios';

const ImageUpload = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { handleError } = useError();


  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await axios.post(
        'https://api.imgbb.com/1/upload?key=feb7dfdab027087f3de57226704fdea2',
        formData
      );
      
      onSuccess(response.data.data.url);
    } catch (error) {
        handleError(new Error('Falha no envio da imagem...'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <label className="upload-button">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
        aria-label="Enviar imagem"
      />
      {loading ? 'Enviando...' : ''}
    </label>
  );
};

export default ImageUpload;