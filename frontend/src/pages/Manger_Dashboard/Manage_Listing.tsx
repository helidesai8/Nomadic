import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, TextField, Container, Box, Typography, IconButton, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, Select, MenuItem, SelectChangeEvent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ManagerDashboardsidebar from './Sidebar';
import { useFilter } from '../../Context/Context';
import Footer from './Footer';
import Header from '../../components/ui/Header';
import { Tour } from './Add_Tours'
import axios from 'axios';
import toast from 'react-hot-toast';

const Manage_Listing: React.FC = () => {
  const [listings, setListings] = useState<Tour[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { freeCancelationAvailable, setFreeCancelationAvailable } = useFilter();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [tourToDelete, setTourToDelete] = useState<Tour | null>(null);
  const [confirmationText, setConfirmationText] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  
  
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`/api/v1/tours`, {
          params: {
            page,
            pageSize,
            city,
            name,
            startDate,
            endDate: enddate,
            freeCancelationAvailable: freeCancelationAvailable === "active" ? true : freeCancelationAvailable === 'inactive' ? false : undefined ,
          },
        });
        setListings(response.data.data);
        setTotalPages(response.data.meta.totalPages);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };
    fetchTours();
  }, [page, pageSize, city, name, price, startDate, enddate, freeCancelationAvailable]);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFreeCancelationAvailable(event.target.value);
    setPage(1);
  };

  const handleDeleteTour = async (id: number) => {
    try {
      await axios.delete(`/api/v1/tours/${id}`);
      toast.success('Tour deleted successfully');
      setOpenDialog(false);
      setTourToDelete(null);
      setConfirmationText('');
      setPage(1); // Reset to first page after deletion
    } catch (error) {
      console.error('Error deleting tour:', error);
      toast.error('Failed to delete tour');
    }
  };

  const handleAddTourClick = () => {
    navigate('/manage/add-tour');
  };

  const handleRowClick = (id: number) => {
    navigate(`/manage/plan-details/${id}`);
  };

  const handleDeleteClick = (tour: Tour) => {
    setTourToDelete(tour);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setTourToDelete(null);
    setConfirmationText('');
  };

  const handleConfirmDelete = () => {
    if (tourToDelete && confirmationText === tourToDelete.name) {
      handleDeleteTour(tourToDelete.id ?? 0);
    }
  };

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPageSize(parseInt(event.target.value as string, 10));
    setPage(1);
  };

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', paddingTop: "70px", flexDirection: 'column' }}>
        <Box sx={{ display: 'flex' }}>
          <ManagerDashboardsidebar />
          <Container disableGutters sx={{ pt: 4, pb: 4, flexGrow: 1, minHeight: { xs: '75vh' }, color: 'black', display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexDirection: { xs: 'column', md: 'row' }, p: 0, m: 0, width: '100%' }}>
                <Typography variant="h4">Manage Listings</Typography>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddTourClick} sx={{ height: '100%', marginTop: { xs: 2, md: 0 } }} style={{ background: "#2F365F", color: 'white' }}>
                  Add Tour
                </Button>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexDirection: { xs: 'column', md: 'row' }, p: 0, m: 0, width: '100%', marginTop: "10px" }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField
                    label="Location"
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    sx={{ borderRadius: 1, marginTop: { xs: 2, md: 0 } }}
                  />
                  <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ borderRadius: 1, marginTop: { xs: 2, md: 0 } }}
                  />
                  <TextField
                    type='date'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    sx={{ borderRadius: 1, marginTop: { xs: 2, md: 0 } }}
                  />
                  <TextField
                    type='date'
                    value={enddate}
                    onChange={(e) => setEndDate(e.target.value)}
                    sx={{ borderRadius: 1, marginTop: { xs: 2, md: 0 } }}
                  />
                  <TextField
                    select
                    label="Filter"
                    value={freeCancelationAvailable}
                    onChange={handleFilterChange}
                    SelectProps={{
                      native: true,
                    }}
                    sx={{ borderRadius: 1, marginTop: { xs: 2, md: 0 } }}
                  >
                    <option value="all">All</option>
                    <option value="active">Cancelable</option>
                    <option value="inactive">Non cancelable</option>
                  </TextField>
                </Box>
              </Box>

              {listings.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                  No listings found
                </Typography>
              ) : (
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, mt: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow style={{ background: "rgb(5 25 80)", color: 'white' }}>
                        <TableCell style={{ background: "#2F365F", color: 'white' }}>Name</TableCell>
                        <TableCell style={{ background: "#2F365F", color: 'white' }}>Start Date</TableCell>
                        <TableCell style={{ background: "#2F365F", color: 'white' }}>End Date</TableCell>
                        <TableCell style={{ background: "#2F365F", color: 'white' }}>Price</TableCell>
                        <TableCell style={{ background: "#2F365F", color: 'white' }}>Location</TableCell>
                        <TableCell style={{ background: "#2F365F", color: 'white' }}>Cancelation</TableCell>
                        <TableCell style={{ background: "#2F365F", color: 'white' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listings.map((listing, index) => (
                        <TableRow key={listing.id ?? 0} hover onClick={() => handleRowClick(listing.id ?? 0)} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'inherit' }}>
                          <TableCell>{listing.name}</TableCell>
                          <TableCell>{listing.startDate.substring(0,10)}</TableCell>
                          <TableCell>{listing.endDate.substring(0,10)}</TableCell>
                          <TableCell>{listing.price}</TableCell>
                          <TableCell>{listing.city}</TableCell>
                          <TableCell>{listing.freeCancelationAvailable ? 'Yes' : 'No'}</TableCell>
                          <TableCell>
                            <IconButton onClick={(e) => { e.stopPropagation(); handleRowClick(listing.id ?? 0); }} color="primary">
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={(e) => { e.stopPropagation(); handleDeleteClick(listing); }} color="secondary">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Pagination count={totalPages} page={page} onChange={handlePageChange} />
              <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                sx={{ width: 120 }}
                variant="outlined"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </Box>
          </Container>
        </Box>

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To confirm deletion, please type the name of the tour: "{tourToDelete?.name}"
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Tour Name"
              fullWidth
              variant="outlined"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="secondary" disabled={confirmationText !== tourToDelete?.name}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Footer />
    </>
  );
};

export default Manage_Listing;
