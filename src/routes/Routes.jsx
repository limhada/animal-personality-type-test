import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Main from '../pages/Main';

const AppRoutes = () => {
  const routing = useRoutes([
    { path: '/animaltest', element: <Main /> },
    { path: '*', element: <Navigate to="/" /> },
  ]);
  return routing;
};

export default AppRoutes;
