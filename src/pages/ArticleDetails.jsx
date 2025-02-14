import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Loader from '../components/Loader';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/articles/${id}`)
      .then(response => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching article:', error);
        setLoading(false);
      });
  }, [id]);

  const handleCopy = () => {
    if(article && article.content) {
      navigator.clipboard.writeText(article.content)
        .then(() => {
          toast.success('Article content copied to clipboard!');
        })
        .catch((error) => {
          console.error('Copy error:', error);
          toast.error('Failed to copy content');
        });
    }
  };

  if (loading) return <Loader />;
  if (!article) return <Typography>Error loading article</Typography>;

  return (
    <Box sx={{ mt: 3, p: 2, position: 'relative' }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {article.title}
        </Typography>
        <ReactMarkdown
          children={article.content}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={materialDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        />
      </Paper>
      {/* Botão flutuante de cópia */}
      <IconButton
        onClick={handleCopy}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: 'primary.main',
          color: '#fff',
          '&:hover': { backgroundColor: 'primary.dark' },
        }}
      >
        <FileCopyIcon />
      </IconButton>
    </Box>
  );
};

export default ArticleDetail;
