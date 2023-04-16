import React from 'react';
import { useRoutes } from "react-router-dom"; 
/* Navigate*/
import Main from "../pages/Main";
import One from "../pages/One";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/2",
      element: <One />,
    },
    
  ]);
  return routes;
}