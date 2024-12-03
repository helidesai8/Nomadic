import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, TextField, Button, Paper, Grid, ToggleButtonGroup, ToggleButton,
  FormControl, InputLabel, Select, MenuItem, SelectChangeEvent
} from '@mui/material';
import ManagerDashboardsidebar from './Sidebar';
import { Edit, PhotoCamera, Save } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { Tour } from './Add_Tours';
import axios from 'axios';
import Header from '../../components/ui/Header';
import Footer from './Footer';

interface TourCategory {
  id: number;
  name: string;
}

const PlanDetails: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<Tour | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTour, setEditedTour] = useState<Tour | undefined>({
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
    freeCancelationAvailable: true,
  });
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [tourCategories, setTourCategories] = useState<TourCategory[]>([]);
  const [imageChange, setImageChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourCategories = async () => {
      try {
        const response = await axios.get('/api/v1/tour-categories/all');
        setTourCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching tour categories:', error);
      }
    };
    
    const fetchTour = async () => {
      const response = await axios.get(`/api/v1/tours/${id}`);
      const tourData = response.data;
      
      // Format the date fields to YYYY-MM-DD
      if (tourData.startDate) {
        tourData.startDate = tourData.startDate.split('T')[0];
      }
      if (tourData.endDate) {
        tourData.endDate = tourData.endDate.split('T')[0];
      }
      
      await setTour(tourData);
      setIsLoading(false);
    };
    fetchTour();
    fetchTourCategories();
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      setEditedTour(tour);
    }
  }, [isEditing, tour]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (isEditing && editedTour) {
      setEditedTour({ ...editedTour, [name]: value });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const validateFields = () => {
    if (!editedTour?.name) {
      toast.error("Please fill out name field.");
      return false;
    }

    if (!editedTour.startDate || !editedTour.endDate) {
      toast.error("Please add date ranges.");
      return false;
    }

    if (editedTour.startDate > editedTour.endDate) {
      toast.error("Start date cannot be later than end date.");
      return false;
    }

    if (!editedTour?.location) {
      toast.error("Please fill out location field.");
      return false;
    }

    if (!editedTour?.accommodationDetails) {
      toast.error("Please fill out accommodation description field.");
      return false;
    }

    if (!editedTour?.price) {
      toast.error("Please fill out price field.");
      return false;
    }

    if (editedTour?.price && parseFloat(editedTour?.price) < 0) {
      toast.error("Price cannot be negative.");
      return false;
    }

    if (!editedTour?.image) {
      toast.error("Please upload a photo.");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    let imageUrl =''
    if (imageChange) {
      const imageUrlResponse = await axios.post('https://pbj75c8y09.execute-api.us-east-1.amazonaws.com/dev/get-url', { image: editedTour?.image });

      imageUrl = imageUrlResponse.data.url;

    }
    if (validateFields()) {
      const payload = {
        name: editedTour?.name || '',
        location: editedTour?.location || '',
        city: editedTour?.city || '',
        price: parseFloat(editedTour?.price || '0'),
        image: imageChange ? imageUrl : editedTour?.image,
        freeCancelationAvailable: editedTour?.freeCancelationAvailable || false,
        tourCategoryId: parseInt(editedTour?.tourCategoryId || '0'),
        accommodationDetails: editedTour?.accommodationDetails || '',
        transportationDetails: editedTour?.transportationDetails || '',
        activities: editedTour?.activities || '',
        startDate: new Date(editedTour?.startDate || '').toISOString(),
        endDate: new Date(editedTour?.endDate || '').toISOString()
      };
      try{
      const data = await axios.put(`/api/v1/tours/${id}`, payload);
      toast.success("Tour details saved successfully!");

      navigate('/manage');
      }catch(error){
        toast.error("Failed to save tour details!");
      }
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageChange(true);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editedTour) {
          setEditedTour({ ...editedTour, image: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setEditedTour({ ...editedTour, [name]: value } as Tour);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', paddingTop: "80px" }}>
        <ManagerDashboardsidebar />
        <Container>
          <Paper sx={{ padding: 4, mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" sx={{ color: 'black' }}>{isEditing ? 'Edit Plan' : 'Plan Details'}</Typography>
              {!isEditing ? <Edit onClick={handleEdit} style={{ cursor: 'pointer' }} /> : <Save onClick={handleSave} style={{ cursor: 'pointer' }} />}
            </Box>
            <Box sx={{ mt: 2 }}>
              <Box mb={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img src={isEditing ? (editedTour?.image || '') : (tour?.image || '')} alt="Tour" style={{ width: "100%", height: 300, marginBottom: '1rem', objectFit: 'contain' }} />
                <Button variant="contained" component="label" >
                  Upload Photo
                  <input type="file" hidden onChange={handleImageChange} disabled={!isEditing} />
                  <PhotoCamera style={{ marginLeft: '10px' }} />
                </Button>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="dense"
                    name="name"
                    label="Tour Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    disabled={!isEditing}
                    value={isEditing ? (editedTour?.name || '') : (tour?.name || '')}
                    onChange={handleChange}
                    InputProps={{
                      style: { color: "black" }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="dense"
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    variant="outlined"
                    disabled={!isEditing}
                    value={isEditing ? (editedTour?.price || '') : (tour?.price || '')}
                    onChange={handleChange}
                    InputProps={{
                      style: { color: 'black' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="dense"
                    label="Start Date"
                    name="startDate"
                    type="date"
                    fullWidth
                    variant="outlined"
                    disabled={!isEditing}
                    value={isEditing ? (editedTour?.startDate || '') : (tour?.startDate || '')}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "black" }
                    }}
                    InputProps={{
                      style: { color: "black" }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="dense"
                    label="End Date"
                    name="endDate"
                    type="date"
                    fullWidth
                    variant="outlined"
                    disabled={!isEditing}
                    value={isEditing ? (editedTour?.endDate || '') : (tour?.endDate || '')}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "black" }
                    }}
                    InputProps={{
                      style: { color: "black" }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="dense"
                    name="location"
                    label="Location"
                    type="text"
                    fullWidth
                    variant="outlined"
                    disabled={!isEditing}
                    value={isEditing ? (editedTour?.location || '') : (tour?.location || '')}
                    onChange={handleChange}
                    InputProps={{
                      style: { color: "black" }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="dense"
                    name="city"
                    label="City"
                    type="text"
                    fullWidth
                    variant="outlined"
                    disabled={!isEditing}
                    value={isEditing ? (editedTour?.city || '') : (tour?.city || '')}
                    onChange={handleChange}
                    InputProps={{
                      style: { color: "black" }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" style={{ color: 'black' }}>Tour Category</InputLabel>
                    <Select
                      name="tourCategoryId"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={isEditing ? (editedTour?.tourCategoryId || '') : (tour?.tourCategoryId || '')}
                      disabled={!isEditing}
                      onChange={handleSelectChange}
                      inputProps={{
                        style: { color: 'black' }
                      }}
                    >
                      {tourCategories.map((category) => (
                        <MenuItem key={category.id} value={category.id.toString()}>{category.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="dense"
                    name="transportationDetails"
                    label="Transportation"
                    type="text"
                    fullWidth
                    variant="outlined"
                    disabled={!isEditing}
                    value={isEditing ? (editedTour?.transportationDetails || '') : (tour?.transportationDetails || '')}
                    onChange={handleChange}
                    InputProps={{
                      style: { color: 'black' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="dense"
                    name="accommodationDetails"
                    label="Accommodation"
                    type="text"
                    fullWidth
                    variant="outlined"
                    disabled={!isEditing}
                    value={isEditing ? (editedTour?.accommodationDetails || '') : (tour?.accommodationDetails || '')}
                    onChange={handleChange}
                    InputProps={{
                      style: { color: 'black' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    margin="dense"
                    name="activities"
                    label="Activities"
                    type="text"
                    fullWidth
                    variant="outlined"
                    disabled={!isEditing}
                    value={isEditing ? (editedTour?.activities || '') : (tour?.activities || '')}
                    onChange={handleChange}
                    InputProps={{
                      style: { color: 'black' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box mt={2} display="flex">
                  <ToggleButtonGroup
                  value={isEditing ? editedTour?.freeCancelationAvailable ? 'active' : 'inactive' : tour?.freeCancelationAvailable ? 'active' : 'inactive'}
                  exclusive
                  onChange={(event, newValue) => {
                    if (newValue !== null && isEditing && editedTour) {
                      setEditedTour({ ...editedTour, freeCancelationAvailable: newValue === 'active' });
                    }
                  }}
                >
                  <ToggleButton value="active" style={{ backgroundColor: editedTour?.freeCancelationAvailable ? 'rgb(91, 219, 101)' : 'grey', color: editedTour?.freeCancelationAvailable ? 'white' : 'black', transition: '0.3s ease-out'}} sx={{ width: {xs: 65, md: 80} }}>Active</ToggleButton>
                  <ToggleButton value="inactive" style={{ backgroundColor: editedTour?.freeCancelationAvailable ? 'grey' : 'red', color: editedTour?.freeCancelationAvailable ? 'black' : 'white', transition: '0.3s ease-out'}} sx={{ width: {xs: 65, md: 80} }}>Inactive</ToggleButton>
                </ToggleButtonGroup>
                    
                  </Box>
                {isEditing ? (
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 } }>
              Save
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mt: 2 }}>
              Edit
            </Button>
          )}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
        <Footer/>
    </>
  );
};

export default PlanDetails;
