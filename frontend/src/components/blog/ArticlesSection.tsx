// author: Heli Desai

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';


const isCategoryActive = (category: string | null, categoryQuery: string | null) => {
  if (category === 'All' && !categoryQuery) return true;
  return category === categoryQuery;
}

const ArticlesSection: React.FC<{ onCategoryClick: (category: string | null) => void, blogCategories: any }> = ({ onCategoryClick, blogCategories }) => {
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const categoryQuery = searchParams.get('category');
  const navigate = useNavigate();
  const categoriesWithAll = blogCategories ? ['All', ...blogCategories.categories] : [];
  const handleCategoryClick = (category: string) => {
    searchParams.set('category', category === 'All' ? '' : category);
    console.log('searchParams:', searchParams.toString());
    navigate({search: searchParams.toString()}, { replace: true });
  };

  return (
    <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
      <Typography variant="h4" component="h2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
        Travel articles
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, color: '#666', margin: '0.5rem 0 2rem' }}>
        Explore our latest travel articles
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        {categoriesWithAll.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryClick(category)}
            sx={{
              backgroundColor: isCategoryActive(category, categoryQuery) ? '#2c3e50' : '#ecf0f1',
              color: isCategoryActive(category, categoryQuery) ? 'white' : '#2c3e50',
              '&:hover': { backgroundColor: isCategoryActive(category, categoryQuery) ? '#34495e' : '#bdc3c7' },
              border: 'none',
              boxShadow: 'none',
            }}
            disableRipple
          >
            {category}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default ArticlesSection;
