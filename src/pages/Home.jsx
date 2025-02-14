import React from 'react';
import { useQuery } from 'react-query';
import { fetchArticles } from '../features/articles/articleApi';
import ArticleCard from '../components/ArticleCard';
import Loader from '../components/Loader';
import { Box, Grid, Typography } from '@mui/material';

const Home = () => {
  const { data: articles, isLoading, error } = useQuery('articles', fetchArticles);

  if (isLoading) return <Loader />;
  if (error) return <Typography>Error loading articles</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom m={4}>
        Latest Articles
      </Typography>
      <Grid container spacing={2}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article._id}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
