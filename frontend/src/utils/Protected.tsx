import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from './authUtils';

const Protected = () => {
  const token = getToken();
  console.log("Token:::", token);

  return (
    <>
      {token ? <Outlet /> : <Navigate to="/login" />}
    </>
  );
};

export default Protected;
