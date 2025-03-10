import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Box, Typography, TextField, Button, Paper, Grid, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../features/articles/articleApi';
import { fetchSections } from '../features/sections/sectionApi';
import ArticleEditor from '../components/ArticleEditor';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ManageArticles = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: { tags: [], content: '' },
  });
  const contentValue = watch('content', '');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [revisionsOpen, setRevisionsOpen] = useState(false);
  const [revisions, setRevisions] = useState([]);
  const [currentArticleForRevisions, setCurrentArticleForRevisions] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [currentArticleForHistory, setCurrentArticleForHistory] = useState(null);

  const { data: articles, isLoading: isLoadingArticles, error: articlesError } = useQuery('articles', async () => {
    const response = await axios.get(`${API_BASE_URL}/articles`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  });

  const { data: sections, isLoading: isLoadingSections, error: sectionsError } = useQuery('sections', async () => {
    const response = await axios.get(`${API_BASE_URL}/sections`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  });

  const { data: allTags, isLoading: isLoadingTags, error: tagsError } = useQuery('allTags', async () => {
    const response = await axios.get(`${API_BASE_URL}/tags`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  });

  const createMutation = useMutation(data => createArticle(data, token), {
    onSuccess: () => {
      toast.success('Article created successfully');
      queryClient.invalidateQueries('articles');
      reset();
    },
    onError: () => {
      toast.error('Error creating article');
    },
  });

  const updateMutation = useMutation(({ id, data }) => updateArticle(id, data, token), {
    onSuccess: () => {
      toast.success('Article updated successfully');
      queryClient.invalidateQueries('articles');
      setSelectedArticle(null);
      reset();
    },
    onError: () => {
      toast.error('Error updating article');
    },
  });

  const deleteMutation = useMutation(id => deleteArticle(id, token), {
    onSuccess: () => {
      toast.success('Article deleted successfully');
      queryClient.invalidateQueries('articles');
    },
    onError: () => {
      toast.error('Error deleting article');
    },
  });

  const draftMutation = useMutation(async id => {
    const response = await axios.post(`${API_BASE_URL}/articles/${id}/draft`, {}, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  }, {
    onSuccess: () => {
      toast.success('Article saved as draft successfully');
      queryClient.invalidateQueries('articles');
    },
    onError: () => {
      toast.error('Error saving article as draft');
    },
  });

  const publishMutation = useMutation(async id => {
    const response = await axios.put(`${API_BASE_URL}/articles/${id}/publish`, {}, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  }, {
    onSuccess: () => {
      toast.success('Article published successfully');
      queryClient.invalidateQueries('articles');
    },
    onError: () => {
      toast.error('Error publishing article');
    },
  });

  const fetchRevisions = async articleId => {
    const response = await axios.get(`${API_BASE_URL}/articles/${articleId}/revisions`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  };

  const restoreMutation = useMutation(async ({ articleId, historyId }) => {
    const response = await axios.post(`${API_BASE_URL}/articles/${articleId}/restore/${historyId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  }, {
    onSuccess: () => {
      toast.success('Article restored successfully');
      queryClient.invalidateQueries('articles');
      setRevisionsOpen(false);
    },
    onError: () => {
      toast.error('Error restoring article version');
    },
  });

  const fetchHistory = async articleId => {
    const response = await axios.get(`${API_BASE_URL}/history/${articleId}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  };

  const fetchHistoryDetail = async historyId => {
    const response = await axios.get(`${API_BASE_URL}/history/detail/${historyId}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  };

  const onSubmit = data => {
    const payload = {
      title: data.title,
      content: data.content,
      section: data.sectionId,
      tags: data.tags,
    };
    if (selectedArticle) {
      updateMutation.mutate({ id: selectedArticle._id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleEdit = article => {
    setSelectedArticle(article);
    reset({
      ...article,
      tags: article.tags || [],
      sectionId: article.section,
      content: article.content,
    });
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSaveDraft = articleId => {
    draftMutation.mutate(articleId);
  };

  const handlePublish = articleId => {
    publishMutation.mutate(articleId);
  };

  const openRevisionsModal = article => {
    setCurrentArticleForRevisions(article);
    fetchRevisions(article._id)
      .then(data => {
        setRevisions(data);
        setRevisionsOpen(true);
      })
      .catch(() => {
        toast.error('Error fetching revisions');
      });
  };

  const handleRestoreVersion = historyId => {
    if (!currentArticleForRevisions) return;
    restoreMutation.mutate({ articleId: currentArticleForRevisions._id, historyId });
  };

  const openHistoryModal = article => {
    setCurrentArticleForHistory(article);
    fetchHistory(article._id)
      .then(data => {
        setHistoryData(data);
        setHistoryOpen(true);
      })
      .catch(() => {
        toast.error('Error fetching history');
      });
  };

  if (isLoadingArticles || isLoadingSections || isLoadingTags) return <Loader />;
  if (articlesError) return <Typography>Error loading articles</Typography>;
  if (sectionsError) return <Typography>Error loading sections</Typography>;
  if (tagsError) return <Typography>Error loading tags</Typography>;

  return (
    <Box sx={{ mt: 3, px: isMobile ? 2 : 4, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
        Manage Articles
      </Typography>
      <Paper sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {selectedArticle ? 'Edit Article' : 'Create New Article'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            {...register('title', { required: 'Title is required' })}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Content
            </Typography>
            <ArticleEditor
              value={contentValue}
              onChange={value => setValue('content', value)}
            />
          </Box>
          <TextField
            select
            label="Section"
            fullWidth
            margin="normal"
            {...register('sectionId', { required: 'Section is required' })}
          >
            {sections?.map(section => (
              <MenuItem key={section._id} value={section._id}>
                {section.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Tags"
            fullWidth
            margin="normal"
            defaultValue={[]}
            {...register('tags', { required: 'At least one tag is required' })}
            SelectProps={{
              multiple: true,
              renderValue: selected => {
                const selectedNames = allTags
                  ?.filter(tag => selected.includes(tag._id))
                  .map(tag => tag.name);
                return selectedNames ? selectedNames.join(', ') : '';
              },
            }}
          >
            {allTags?.map(tag => (
              <MenuItem key={tag._id} value={tag._id}>
                {tag.name}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            {selectedArticle ? 'Update Article' : 'Create Article'}
          </Button>
          {selectedArticle && (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 2, ml: 2 }}
              onClick={() => {
                setSelectedArticle(null);
                reset();
              }}
            >
              Cancel
            </Button>
          )}
        </form>
      </Paper>
      <Typography variant="h5" gutterBottom>
        Article Actions
      </Typography>
      <Grid container spacing={isMobile ? 1 : 2}>
        {articles?.map(article => (
          <Grid item xs={12} sm={6} md={4} key={article._id}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
                {article.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'monospace',
                  mt: 1,
                }}
              >
                {article.content.substring(0, 100)}...
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, wordBreak: 'break-word' }}>
                Tags: {article.tags.join(', ')}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => handleEdit(article)}
                  sx={{ width: isMobile ? '100%' : 'auto' }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(article._id)}
                  sx={{ width: isMobile ? '100%' : 'auto' }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleSaveDraft(article._id)}
                  sx={{ width: isMobile ? '100%' : 'auto' }}
                >
                  Save as Draft
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handlePublish(article._id)}
                  sx={{ width: isMobile ? '100%' : 'auto' }}
                >
                  Publish
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => openRevisionsModal(article)}
                  sx={{ width: isMobile ? '100%' : 'auto' }}
                >
                  View Revisions
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => openHistoryModal(article)}
                  sx={{ width: isMobile ? '100%' : 'auto' }}
                >
                  View History
                </Button>
              </Box>

            </Paper>
          </Grid>
        ))}
      </Grid>
      <Dialog open={revisionsOpen} onClose={() => setRevisionsOpen(false)} fullWidth>
        <DialogTitle>Revisions for {currentArticleForRevisions?.title}</DialogTitle>
        <DialogContent>
          <List>
            {revisions.map(rev => (
              <ListItem key={rev._id}>
                <ListItemText primary={`Revision: ${rev._id}`} secondary={rev.updatedAt} />
                <Button variant="outlined" onClick={() => handleRestoreVersion(rev._id)}>
                  Restore
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRevisionsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={historyOpen} onClose={() => setHistoryOpen(false)} fullWidth>
        <DialogTitle>History for {currentArticleForHistory?.title}</DialogTitle>
        <DialogContent>
          <List>
            {historyData.map(item => (
              <ListItem key={item._id}>
                <ListItemText primary={`History: ${item._id}`} secondary={item.updatedAt} />
                <Button
                  variant="outlined"
                  onClick={() => {
                    fetchHistoryDetail(item._id)
                      .then(detail => {
                        toast.info(`Detail: ${JSON.stringify(detail)}`);
                      })
                      .catch(() => toast.error('Error fetching history detail'));
                  }}
                >
                  View Detail
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHistoryOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageArticles;
