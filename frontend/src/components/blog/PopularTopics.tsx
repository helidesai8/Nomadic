// Author: Heli Desai
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './PopularTopics.css';
import ArticlesSection from './ArticlesSection';
import useBlogs from "../../hooks/useBlogs";
import { format } from 'date-fns';
import { useBlogCategories } from '../../hooks/useBlogCategories';
import useFilteredBlogs from '../../hooks/useFilteredBlog'; // Verify correct file path
import { Pagination } from '@mui/material';

const PopularTopics: React.FC = () => {
  const params = new URLSearchParams(useLocation().search);
  const categoryQuery = params.get('category');
  const pageQuery = params.get('page');
  const navigate = useNavigate();

  const { blogs = [], blogsLoading, blogsError } = useBlogs({
    page: pageQuery,
    category: categoryQuery,
  });
  const { blogCategories, blogCategoriesError } = useBlogCategories();


  const handleCategoryClick = (category: string) => {
    params.set('category', category);
    params.delete('page');
    navigate({ search: params.toString() }, {replace: true});
  };

  const handleCardClick : any = (id: number) => {
    navigate(`/blogs/${id}`); // Navigate to the detailed blog page
  };


  const handlePageClick = (page: number) => {
    params.set('page', page.toString());
    navigate({ search: params.toString() }, {replace: true});
  };

  if (blogsLoading) return <div>Loading...</div>;
  if (blogsError) return <div>Error loading blog</div>;
  if (blogCategoriesError) return <div>Error loading categories</div>;

  return (
    <section className="popular-topics">
      <ArticlesSection blogCategories={blogCategories} onCategoryClick={handleCategoryClick} />
      <div className="topics-container">
        {blogs.data.map((blog, index) => (
          <div className="topic-card" key={index} onClick={() => handleCardClick(blog.id)}>
            <img src={blog.thumbnail} alt={blog.title} />
            <div className="card-content">
              <p>{format(new Date(blog.createdAt), "dd-MM-yyyy")}</p>
              <h3>{blog.title}</h3>
              <p>{blog.category}</p>
              <p>{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination count={blogs.meta.totalPages} page={pageQuery ? parseInt(pageQuery) : 1 }
                  onChange={(event, page) => handlePageClick(page)}
      sx={{
    '& > .MuiPagination-ul': {
      justifyContent: 'center',
    },
  }}
      />
      {/* <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={index + 1 === currentPage ? 'active' : ''}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div> */}
    </section>
  );
};

export default PopularTopics;