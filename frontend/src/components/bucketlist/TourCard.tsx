import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Chip,
  Button,
  CardActions,
  Stack
} from '@mui/material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const TourCard = ({ tour, wishlistId, onRemove }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height="140"
        image={tour.image}
        alt={tour.name}
      />
      <CardContent sx={{ flexGrow: 1, pb: 0 }}>
        <Typography variant="h6" component="div" noWrap>
          {tour.name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" noWrap>
            {tour.city}, {tour.location}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          <CalendarTodayIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {format(new Date(tour.startDate), 'MMM d')} - {format(new Date(tour.endDate), 'MMM d, yyyy')}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AttachMoneyIcon fontSize="small" color="action" />
            <Typography variant="body1" fontWeight="bold" color="primary">
              ${tour.price}
            </Typography>
          </Stack>
          {tour.freeCancelationAvailable && (
            <Chip label="Free cancellation" size="small" color="success" />
          )}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
        <Button size="small" onClick={() => navigate(`/tours/${tour.id}`)}>
          View Details
        </Button>
        <Button size="small" color="secondary" onClick={() => onRemove(wishlistId)}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};
