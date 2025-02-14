import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';
import Loader from '../components/Loader';

const Search = () => {
  const [query, setQuery] = useState({ title: '', tag: '', dateFrom: '', dateTo: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/search/advanced`, { params: query });
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>Advanced Search</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            fullWidth
            value={query.title}
            onChange={(e) => setQuery({ ...query, title: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tag (ID)"
            fullWidth
            value={query.tag}
            onChange={(e) => setQuery({ ...query, tag: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date From"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={query.dateFrom}
            onChange={(e) => setQuery({ ...query, dateFrom: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date To"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={query.dateTo}
            onChange={(e) => setQuery({ ...query, dateTo: e.target.value })}
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSearch} sx={{ mt: 2 }}>
        Search
      </Button>
      {loading && <Loader />}
      {results.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5">Search Results</Typography>
          {results.map((article) => (
            <Box key={article._id} sx={{ p: 1, borderBottom: '1px solid #ccc' }}>
              <Typography variant="h6">{article.title}</Typography>
              <Typography variant="body2">{article.content.substring(0, 100)}...</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Search;
