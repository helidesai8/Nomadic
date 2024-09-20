import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { TourList } from './TourList';
import axios from 'axios';
import { set } from 'date-fns';
import { Flex } from '@chakra-ui/react';

export const BucketList = () => {
  const URL = import.meta.env.VITE_BASE_API_URL;
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState<any>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(data);
    setUserId(data.userId);
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(URL + `/api/v1/wishlist/${userId}`);
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    fetchWishlist();
  }, [URL, userId]);

  if (!userId) {
    return (
      <Container maxWidth="lg" style={{ paddingTop: "80px", minHeight: '90vh' }}>
        <Typography variant="h4" component="h4" gutterBottom sx={{ my: 4 }}>
          My Travel Bucket List
        </Typography>
        <Typography variant="h6" component="h6" gutterBottom sx={{ my: 4 }}>
          Please log in to view your bucket list.
        </Typography>
      </Container>
    );
  } 

  if ((wishlist as any).length === 0) {
    return (
      <Container maxWidth="lg" style={{ paddingTop: "80px", minHeight: '90vh' }}>
        <Typography variant="h4" component="h4" gutterBottom sx={{ my: 4 }}>
          My Travel Bucket List
        </Typography>
        <Box sx={{minHeight:"50vh", display:"flex", justifyContent: "center", alignItems: "center"}}>
        <Typography variant="h6" component="h6" gutterBottom sx={{ my: 4 }} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          Your bucket list is empty. Start adding tours to your bucket list!
        </Typography>
        </Box>
      </Container>
    );
  }
  const handleRemoveTour = async (wishlistId) => {
    try {
     const data= await axios.delete(URL + `/api/v1/wishlist/${wishlistId}`);
      console.log(data);
      setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== wishlistId));
    } catch (error) {
      console.error('Error removing tour:', error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: "80px", minHeight: '90vh' }}>
      <Typography variant="h4" component="h4" gutterBottom sx={{ my: 4 }}>
        My Travel Bucket List
      </Typography>
      <TourList wishlist={wishlist} onRemoveTour={handleRemoveTour} />
    </Container>
  );
};
