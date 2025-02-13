import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ margin: 2 }}>
      <CardActionArea onClick={() => navigate(`/articles/${article._id}`)}>
        <CardContent>
          <Typography variant="h5" component="div">
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.content.substring(0, 100)}...
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArticleCard;
