//Author : Vyansi Diyora

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography, Button, Grid, Paper, Box, Container,
  CircularProgress, Card, CardMedia, CardContent, Chip,
  styled, Avatar, Rating, ThemeProvider, createTheme,
  List, ListItem, Divider, Fade, IconButton
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HikingIcon from '@mui/icons-material/Hiking';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import axios from 'axios';
import BookingForm from '../components/history/BookingForm';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { getToken } from '../utils/authUtils';
import { toast } from 'react-toastify';

const theme = createTheme({
  palette: {
    primary: {
      main: '#051036',
    },
    secondary: {
      main: '#051036',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#424242',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
});


const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: '100%',
  margin: theme.spacing(2, 0),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  borderRadius: '16px',
  overflow: 'hidden',
  marginTop:'0px',
  position: 'relative',
}));

const StyledCardMedia = styled(CardMedia)({
  height: 500,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const OverlayContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(5, 16, 54, 0.8)',
  color: 'white',
  padding: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  marginTop: theme.spacing(3),
  borderRadius: '16px',
  background: 'linear-gradient(145deg, #f3f3f3, #ffffff)',
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const FeatureIcon = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  marginRight: theme.spacing(2),
}));

const ReviewPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing(3),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

export interface TourPackage {
  id: number;
  name: string;
  location: string;
  city: string;
  price: number;
  image: string;
  freeCancelationAvailable: boolean;
  accommodationDetails: string;
  transportationDetails: string;
  activities: string;
  startDate: string;
  endDate: string;
  duration: number;
  tourCategory: {
    name: string;
  };
  reviews: Array<{
    id: number;
    comment: string;
    rating: number;
    createdAt: string;
    userId: number;
    user: {
      id: number;
      first_name: string;
      last_name: string;
    };
  }>;
}

export function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const [tourPackage, setTourPackage] = useState<TourPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [wishListId, setWishListId] = useState<number | null>(null);
  const [token, setToken] = useState();

  useEffect(() => {
    const token = getToken();
    setToken(token as any);
    const data = localStorage.getItem('user');
    if (data) {
      setUserId(JSON.parse(data).userId);
    }
  }, []);

  const checkWishlist = async () => {
    console.log('Checking wishlist:', userId, tourPackage?.id);
    try {
      const response = await axios.post(`${(import.meta as any).env.VITE_BASE_API_URL}/api/v1/wishlist/check`, {
        userId: userId,
        tourPackageId: tourPackage.id,
      });
      setWishlist(response.data.message === true);
      if (response.data.message === true) {
        setWishListId(response.data.id);

      }
      console.log('Wishlist:', wishlist);
      console.log('wishlist:', wishListId);
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  };

  useEffect(() => {
    const fetchTourPackage = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${(import.meta as any).env.VITE_BASE_API_URL}/api/v1/tours/${id}`).then( (res) =>{ 
          console.log("qwerty",res.data);
          
          setTourPackage(res.data)
          axios.post(`${(import.meta as any).env.VITE_BASE_API_URL}/api/v1/wishlist/check`, {
            userId: userId,
            tourPackageId: res.data.id,
          }).then((response) => {
console.log("ssss",response.data);

            setWishlist(response.data.message === true);
            if (response.data.message === true) {
              setWishListId(response.data.id);
              
            }
          })
        }
        );
        ;
        setLoading(false);
        // Check if the tour is in the wishlist after fetching the tour package
        await checkWishlist();
    
      } catch (error) {
        console.error('Error fetching tour package:', error);
        setError('Failed to fetch tour package data. Please try again later.');
        setLoading(false);
      }
    };

    fetchTourPackage();
  }, [id, userId]);


  const handleAddToWishlist = async () => {
    try {
      console.log('Wishlist:', wishlist);
      console.log('wishlist:', wishListId);
      if (wishlist) {
        // Remove from wishlist
        await axios.delete(`${(import.meta as any).env.VITE_BASE_API_URL}/api/v1/wishlist/${wishListId}`);
        checkWishlist();
        console.log('Removed from wishlist');
      } else {
        // Add to wishlist
        console.log('Adding to wishlist', tourPackage?.id, userId);

        await axios.post(`${(import.meta as any).env.VITE_BASE_API_URL}/api/v1/wishlist`, {
          tourPackageId: tourPackage?.id,
          userId: userId,
        });
        checkWishlist();
        console.log('Added to wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!tourPackage) {
    return <Typography>No tour package data available.</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <Container maxWidth="lg" style={{paddingTop: "120px" ,paddingBottom:"120px"}}>
        <StyledCard>
          <Box position="relative">
            <StyledCardMedia
              image={tourPackage.image}
              title={tourPackage.name}
            />
            <OverlayContent>
              <Typography variant="h3" gutterBottom>
                {tourPackage.name}
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <LocationOnIcon />
                <Typography variant="h6" ml={1}>
                  {tourPackage.location}, {tourPackage.city}
                </Typography>
              </Box>
              <Rating value={4.5} readOnly precision={0.5} />
            </OverlayContent>
            {getToken() && 

            <IconButton
              color="secondary"
              aria-label="add to wishlist"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                },
              }}
              onClick={handleAddToWishlist}
            >
              {wishlist ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon color="error" />}
            </IconButton>
}
          </Box>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center">
                  <AttachMoneyIcon color="secondary" fontSize="large" />
                  <Typography variant="h4" color="secondary" ml={1}>
                    ${tourPackage.price}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" ml={1}>
                    / person
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="flex-end">
                  <Chip
                    label={tourPackage.tourCategory.name}
                    color="secondary"
                    variant="outlined"
                    sx={{ mr: 1 }}
                  />
                  {tourPackage.freeCancelationAvailable && (
                    <Chip
                      label="Free Cancellation"
                      color="success"
                      variant="outlined"
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </StyledCard>

        <StyledPaper>
          <Typography variant="h5" gutterBottom color="primary">
            Tour Details & Information
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <FeatureBox>
                <FeatureIcon>
                  <HotelIcon />
                </FeatureIcon>
                <Box>
                  <Typography variant="subtitle1">Accommodation</Typography>
                  <Typography variant="body2">{tourPackage.accommodationDetails}</Typography>
                </Box>
              </FeatureBox>
              <FeatureBox>
                <FeatureIcon>
                  <DirectionsBusIcon />
                </FeatureIcon>
                <Box>
                  <Typography variant="subtitle1">Transportation</Typography>
                  <Typography variant="body2">{tourPackage.transportationDetails}</Typography>
                </Box>
              </FeatureBox>
              <FeatureBox>
                <FeatureIcon>
                  <HikingIcon />
                </FeatureIcon>
                <Box>
                  <Typography variant="subtitle1">Activities</Typography>
                  <Typography variant="body2">{tourPackage.activities}</Typography>
                </Box>
              </FeatureBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <FeatureBox>
                <FeatureIcon>
                  <EventIcon />
                </FeatureIcon>
                <Box>
                  <Typography variant="subtitle1">Start Date</Typography>
                  <Typography variant="body2">{new Date(tourPackage.startDate).toLocaleDateString()}</Typography>
                </Box>
              </FeatureBox>
              <FeatureBox>
                <FeatureIcon>
                  <EventIcon />
                </FeatureIcon>
                <Box>
                  <Typography variant="subtitle1">End Date</Typography>
                  <Typography variant="body2">{new Date(tourPackage.endDate).toLocaleDateString()}</Typography>
                </Box>
              </FeatureBox>
              <FeatureBox>
                <FeatureIcon>
                  <AccessTimeIcon />
                </FeatureIcon>
                <Box>
                  <Typography variant="subtitle1">Duration</Typography>
                  <Typography variant="body2">{tourPackage.duration} days</Typography>
                </Box>
              </FeatureBox>
            </Grid>
          </Grid>
          <BookingForm tourPackage={tourPackage} />
        </StyledPaper>

        <Fade in={true} timeout={1000}>
          <ReviewPaper elevation={3}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
              <Box display="flex" width="100%" alignItems="center" justifyContent="space-between">
                <Typography variant="h4" component="h2" sx={{ mt: 2, color: 'text.primary', fontWeight: 700 }}>
                  Customer Reviews
                </Typography>
              </Box>
            </Box>
            <List>
              {tourPackage.reviews.map((review, index) => (
                <React.Fragment key={review.id}>
                  {index > 0 && <Divider component="li" />}
                  <StyledListItem>
                    <Box display="flex" alignItems="center" width="100%" mb={2}>
                      <StyledAvatar>{review.user.first_name.charAt(0)}</StyledAvatar>
                      <Box flexGrow={1}>
                        <Typography variant="h6" component="span">
                          {review.user.first_name} {review.user.last_name}
                        </Typography>
                        <Rating value={review.rating} readOnly precision={0.5} sx={{ ml: 2 }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{
                        fontStyle: 'italic',
                        mb: 2,
                        pl: 2,
                        borderLeft: (theme) => `4px solid ${theme.palette.secondary.main}`,
                      }}
                    >
                      "{review.comment}"
                    </Typography>
                  </StyledListItem>
                </React.Fragment>
              ))}
            </List>
          </ReviewPaper>
        </Fade>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
}

export default TourDetail;
