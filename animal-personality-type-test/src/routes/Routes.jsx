import React from 'react';
import { useRoutes } from "react-router-dom"; 
/* Navigate*/
import Main from "../pages/Main";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Main />,
    },
    
  ]);
  return routes;
}