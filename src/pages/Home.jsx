import React from 'react';
import { useQuery } from 'react-query';
import { fetchArticles } from '../features/articles/articleApi';
import ArticleCard from '../components/ArticleCard';
import Loader from '../components/Loader';
import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Home = () => {
  const { data: articles, isLoading, error } = useQuery('articles', fetchArticles);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detecta se é mobile

  if (isLoading) return <Loader />;
  if (error) return <Typography>Error loading articles</Typography>;

  return (
    <Box sx={{ px: isMobile ? 2 : 4, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom m={isMobile ? 2 : 4}>
        Latest Articles
      </Typography>
      <Grid container spacing={isMobile ? 1 : 2}>
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
