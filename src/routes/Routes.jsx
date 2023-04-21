import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Main from '../pages/Main';
import One from '../pages/One';

const AppRoutes = () => {
  const routing = useRoutes([
    { path: '/', element: <Main /> },
    // { path: '/2', element: <One /> },
    { path: '*', element: <Navigate to="/" /> },
  ]);
  return routing;
};

export default AppRoutes;
