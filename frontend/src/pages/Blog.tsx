// Author: Heli Desai
import React from 'react';
import HeroSections from '../components/blog/HeroSections';
import PopularTopics from '../components/blog/PopularTopics';
import MainLayout from '../components/blog/MainLayout';

const Blog: React.FC = () => {
  return (
    <MainLayout>
      <main>
        <HeroSections />
        <PopularTopics />
      </main>
    </MainLayout>
  );
};

export default Blog;
