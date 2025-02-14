import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{

        maxWidth: { xs: '250', sm: 250, md: 600 },
        width: '100%',
        wordBreak: 'break-word'
      }}
    >
      <CardActionArea onClick={() => navigate(`/articles/${article._id}`)}>
        <CardContent>
          <Typography variant="h5" component="h2" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            {article.content.substring(0, 100)}...
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArticleCard;
