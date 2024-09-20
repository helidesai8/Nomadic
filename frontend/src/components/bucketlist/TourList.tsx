import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { TourCard } from './TourCard';

export const TourList = ({ wishlist, onRemoveTour }) => {
  useEffect(() => {
    console.log(wishlist);
  }, [wishlist]);

  return (
    <Grid container spacing={2}>
      {wishlist.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <TourCard tour={item.tourPackage} wishlistId={item.id} onRemove={onRemoveTour} />
        </Grid>
      ))}
    </Grid>
  );
};
