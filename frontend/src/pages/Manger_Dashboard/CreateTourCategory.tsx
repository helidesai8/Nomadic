import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import {
  Container, Box, Typography, TextField, Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-hot-toast';
import Header from '../../components/ui/Header';
import Footer from './Footer';
import ManagerDashboardsidebar from './Sidebar';

interface TourCategory {
  id: number;
  name: string;
}

const TourCategoryPage: React.FC = () => {
  const [tourCategories, setTourCategories] = useState<TourCategory[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<TourCategory | null>(null);

  useEffect(() => {
    fetchTourCategories();
  }, []);

  const fetchTourCategories = async () => {
    try {
      const response = await axios.get('/api/v1/tour-categories/all');
      setTourCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching tour categories:', error);
    }
  };

  const handleAddCategory = async () => {
    if(newCategory) {

    try {
      const response = await axios.post('/api/v1/tour-categories', { name: newCategory });
      setTourCategories([...tourCategories, response.data.data]);
      setNewCategory('');
      toast.success('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Failed to add category');
    }
  }
  else{
    toast.error('Category name cannot be empty');
  }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await axios.delete(`/api/v1/tour-categories/${id}`);
      setTourCategories(tourCategories.filter(category => category.id !== id));
      toast.success('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  const handleEditCategory = async () => {
    if (editingCategory) {
      try {
        const response = await axios.put(`/api/v1/tour-categories/${editingCategory.id}`, { name: editingCategory.name });
        setTourCategories(tourCategories.map(category => (category.id === editingCategory.id ? response.data.data : category)));
        setEditingCategory(null);
        toast.success('Category updated successfully!');
      } catch (error) {
        console.error('Error updating category:', error);
        toast.error('Failed to update category');
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, name: e.target.value });
    } else {
      setNewCategory(e.target.value);
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', paddingTop: "70px" }}>
      <ManagerDashboardsidebar />
        <Container component="main" maxWidth="md" sx={{ minHeight: { xs: "74vh" } }}>
          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Manage Tour Categories
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="categoryName"
                  label="Category Name"
                  value={editingCategory ? editingCategory.name : newCategory}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                {editingCategory ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleEditCategory}
                    style={{ background: "#2F365F", color: 'white' }}
                  >
                    Save Category
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleAddCategory}
                    style={{ background: "#2F365F", color: 'white' }}
                  >
                    Add Category
                  </Button>
                )}
              </Grid>
            </Grid>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Existing Categories
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ background: "#2F365F", color: 'white' }}>ID</TableCell>
                      <TableCell style={{ background: "#2F365F", color: 'white' }}>Name</TableCell>
                      <TableCell style={{ background: "#2F365F", color: 'white' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tourCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.id}</TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => setEditingCategory(category)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteCategory(category.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default TourCategoryPage;
