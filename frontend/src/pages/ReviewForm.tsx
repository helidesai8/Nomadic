//Author : Vyansi Diyora
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Button, Container, Rating, TextField, Typography,
  Paper, Snackbar, Alert, CircularProgress, Fade,
  ThemeProvider, createTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

// Create a theme that matches the home page
const theme = createTheme({
  palette: {
    primary: {
      main: '#051036',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#6B7280',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(0),
  marginBottom: theme.spacing(14),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const StyledRatingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[300]}`,
}));

const ReviewForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tourPackageId, userId } = location.state || { tourPackageId: null, userId: null };

  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`/api/v1/reviews`, {
        tourPackageId,
        userId,
        rating,
        comment
      });

      console.log('Review submitted:', response.data);

      setSnackbar({
        open: true,
        message: 'Review submitted successfully!',
        severity: 'success',
      });
      navigate(`/history/${userId}`);
      setRating(null);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
      setSnackbar({
        open: true,
        message: 'Failed to submit review. Please try again.',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header /> {/* Add the Header component here */}
        <Container maxWidth="sm">
          <Fade in={true} timeout={1000}>
            <StyledPaper elevation={3}>
              <Box display="flex" flexDirection="column" alignItems="center" mb={4} mt={14}>
                <RateReviewIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                <Typography variant="h4" component="h2" sx={{ mt: 2, color: 'text.primary' }}>
                  Share Your Experience
                </Typography>
              </Box>
              <StyledForm onSubmit={handleSubmit}>
                <StyledRatingBox>
                  <Typography component="legend" variant="h6" color="text.secondary">
                    How was your experience?
                  </Typography>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={(_, newValue) => setRating(newValue)}
                    precision={1}
                    size="large"
                  />
                  <SentimentSatisfiedAltIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                </StyledRatingBox>
                <TextField
                  label="Leave a comment"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting || rating === null}
                  fullWidth
                >
                  {isSubmitting ? <CircularProgress size={24} /> : 'Submit Review'}
                </Button>
              </StyledForm>
              <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
              >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                  {snackbar.message}
                </Alert>
              </Snackbar>
            </StyledPaper>
          </Fade>
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default ReviewForm;
