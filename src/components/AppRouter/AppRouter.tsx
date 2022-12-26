import React from 'react';
import { useRoutes } from 'react-router-dom';
import { appRoutes } from '##/routes/appRoutes';
import { useUuid } from '##/hooks/useUuid';

export const AppRouter = () => {
  useUuid();
  const routes = useRoutes(appRoutes());

  return routes;
};
