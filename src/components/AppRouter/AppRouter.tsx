import React from 'react';
import { useRoutes } from 'react-router-dom';
import { appRoutes } from '##/routes/appRoutes';

export const AppRouter = () => {
  const routes = useRoutes(appRoutes());

  return routes;
};
