import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchArticleById } from '../features/articles/articleApi';
import Loader from '../components/Loader';
import { Box, Typography } from '@mui/material';

const ArticleDetails = () => {
  const { id } = useParams();
  const { data: article, isLoading, error } = useQuery(['article', id], () => fetchArticleById(id));

  if (isLoading) return <Loader />;
  if (error) return <Typography>Error loading article</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h3" gutterBottom>
        {article.title}
      </Typography>
      <Typography variant="body1">{article.content}</Typography>
    </Box>
  );
};

export default ArticleDetails;
