import React from 'react';
import { useRoutes } from 'react-router-dom';
import { appRoutes } from '##/routes/appRoutes';

export const AppRouter = () => useRoutes(appRoutes());
