// Author: Heli Desai
import { useState, useEffect } from 'react';
import useBlogs from './useBlogs';

const useFilteredBlog = () => {
  const { blogs, blogsLoading, blogsError } = useBlogs();
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  useEffect(() => {
    if (filteredCategory) {
      setFilteredBlogs(blogs.filter(blog => blog.category === filteredCategory));
    } else {
      setFilteredBlogs(blogs);
    }
  }, [blogs, filteredCategory]);

  return {
    filteredBlogs,
    filteredCategory,
    setFilteredCategory,
    blogsLoading,
    blogsError
  };
};

export default useFilteredBlog;
