import { RouteObject } from 'react-router-dom';
import React from 'react';
import { Login } from '##/pages/Login/Login';
import { Registration } from '##/pages/Registration/Registration';
import { Recovery } from '##/pages/Recovery/Recovery';

export const appRoutes = (): RouteObject[] => [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/recovery',
    element: <Recovery />,
  },
];
