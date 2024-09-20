// author: Heli Desai
import React from 'react';
import Navbar from '../ui/Header';
import Footer from '../ui/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <div className="main-layout">
      <Navbar/>
        {props.children}
      <Footer />
    </div>
  );
};

export default MainLayout;
