import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const Uploads = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return toast.error('Select a file to upload');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFileUrl(response.data.file.path);
      toast.success('File uploaded successfully');
    } catch (error) {
      toast.error('File upload failed');
      console.error('Upload error:', error);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>File Upload</Typography>
      <TextField type="file" onChange={handleFileChange} fullWidth />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleUpload}>
        Upload
      </Button>
      {fileUrl && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Uploaded File URL:</Typography>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a>
        </Box>
      )}
    </Box>
  );
};

export default Uploads;
