import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, TextField, Button, Grid, FormControlLabel, Switch, InputAdornment, Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import ManagerDashboardsidebar from './Sidebar';
import { toast } from 'react-hot-toast';
import Header from '../../components/ui/Header';
import Footer from './Footer';
import { SelectChangeEvent } from '@mui/material';


export interface Tour {
  id?: number
  name: string;
  location: string;
  city: string;
  price: string;
  image: string;
  freeCancelationAvailable: boolean;
  tourCategoryId: string;
  transportationDetails: string;
  accommodationDetails: string;
  activities: string;
  startDate: string;
  endDate: string;
}

const AddTourPage: React.FC = () => {

  const URL = import.meta.env.VITE_BASE_API_URL;
  const [newTour, setNewTour] = useState<Tour>({
    name: '',
    location: '',
    city: '',
    startDate: '',
    endDate: '',
    transportationDetails: '',
    accommodationDetails: '',
    activities: '',
    price: '',
    image: '',
    tourCategoryId: '',
    freeCancelationAvailable: false,
  });

  interface TourCategory {
    id: number;
    name: string;
  }

  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const navigate = useNavigate();
  const [tourCategories, setTourCategories] = useState<TourCategory[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTour({ ...newTour, [name]: value });
  };

    const validateFields = () => {
    if (!newTour?.name) {
      toast.error("Please fill out name field.");
      return false;
    }

    if (!newTour.startDate || !newTour.endDate) {
      toast.error("Please add date ranges.");
      return false;
    }

    if (newTour.startDate > newTour.endDate) {
      toast.error("Start date cannot be later than end date.");
      return false;
    }
    
    if (!newTour?.location) {
      toast.error("Please fill out location field.");
      return false;
    }

    if (!newTour?.accommodationDetails) {
      toast.error("Please fill out accommodation description field.");
      return false;
    }

    if (!newTour?.price) {
      toast.error("Please fill out price field.");
      return false;
    }

    if (newTour?.price && parseFloat(newTour?.price) < 0) {
      toast.error("Price cannot be negative.");
      return false;
    }

    if (!newTour?.image) {
      toast.error("Please upload a photo.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    // Fetch tour categories from the API
    const fetchTourCategories = async () => {
      try {
        const response = await axios.get(URL + '/api/v1/tour-categories');
        setTourCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching tour categories:', error);
      }
    };
    fetchTourCategories();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTour({ ...newTour, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };


  
  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        // Get the URL for the image
        const imageUrlResponse = await axios.post('https://pbj75c8y09.execute-api.us-east-1.amazonaws.com/dev/get-url', {image: newTour.image});
        const imageUrl = imageUrlResponse.data.url;
  
        // Create the payload with proper types
        const payload = {
          name: newTour.name,
          location: newTour.location,
          city: newTour.city,
          price: parseFloat(newTour.price),
          image: imageUrl,
          freeCancelationAvailable: newTour.freeCancelationAvailable,
          tourCategoryId: parseInt(newTour.tourCategoryId),
          accommodationDetails: newTour.accommodationDetails,
          transportationDetails: newTour.transportationDetails,
          activities: newTour.activities,
          startDate: new Date(newTour.startDate).toISOString(),
          endDate: new Date(newTour.endDate).toISOString()
        };
  
        const response = await axios.post(URL+'/api/v1/tours', payload);
  
        toast.success('Tour added successfully!');
        navigate('/manage');
      } catch (error) {
        console.error("Error creating tour:", error);
        toast.error('Failed to create tour. Please try again.');
      }
    }
  };

  const fetchCitySuggestions = async (query: string) => {
    try {
      const response = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities`, {
        params: { namePrefix: query, limit: 5 },
        headers: {
          'X-RapidAPI-Key': 'd31f6c01bcmsha77067eb445f335p1dd1e7jsn8fc5d204fd17',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      });

      const cities = response.data.data.map((city: any) => city.city);
      setCityOptions(cities);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleCityChange = (event: ChangeEvent<{}>, value: string | null) => {
    setNewTour({ ...newTour, city: value || '' });
  };

  const handleCityInputChange = (event: ChangeEvent<{}>, value: string) => {
    if (value.length > 2) {
      fetchCitySuggestions(value);
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewTour({ ...newTour, [name]: value });
  };

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', paddingTop: "70px" }}>
        <ManagerDashboardsidebar />
        <Container component="main" maxWidth="md" sx={{ minHeight: { xs: "74vh" } }}>
          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Add New Tour
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Tour Name"
                  name="name"
                  value={newTour.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type='number'
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  value={newTour.price}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label" style={{ background: "#2F365F", color: 'white' }}>
                  Upload Photo
                  <input type="file" hidden onChange={handleFileChange} />
                  <PhotoCamera style={{ marginLeft: '10px' }} />
                </Button>
                {newTour.image && (
                  <Box mt={2}>
                    <img src={newTour.image} alt="Tour" style={{ width: "100%", height: '300px', objectFit: "contain" }} />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  value={newTour.location}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  freeSolo
                  options={cityOptions}
                  value={newTour.city}
                  onChange={handleCityChange}
                  onInputChange={handleCityInputChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      fullWidth
                      id="city"
                      label="City"
                      name="city"
                      onChange={handleChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="dense"
                  label="Start Date"
                  required
                  fullWidth
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={newTour.startDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="dense"
                  label="End Date"
                  required
                  fullWidth
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={newTour.endDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="transportationDetails"
                  label="Transportation Details"
                  name="transportationDetails"
                  multiline
                  rows={4}
                  value={newTour.transportationDetails}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="accommodationDetails"
                  label="Accommodation Details"
                  name="accommodationDetails"
                  multiline
                  rows={4}
                  value={newTour.accommodationDetails}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="activities"
                  label="Activities"
                  name="activities"
                  multiline
                  rows={4}
                  value={newTour.activities}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="tourCategoryId-label">Tour Category</InputLabel>
                  <Select
                    labelId="tourCategoryId-label"
                    id="tourCategoryId"
                    name="tourCategoryId"
                    value={newTour.tourCategoryId}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="">
                      <em>Select Tour Category</em>
                    </MenuItem>
                    {tourCategories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newTour.freeCancelationAvailable}
                      onChange={() => setNewTour({ ...newTour, freeCancelationAvailable: !newTour.freeCancelationAvailable })}
                      color="primary"
                    />
                  }
                  label="Cancellation Available"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSubmit}
                  fullWidth
                  style={{ background: "#2F365F", color: 'white' }}
                >
                  Save Tour
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default AddTourPage;
