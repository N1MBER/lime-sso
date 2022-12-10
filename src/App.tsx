import React from 'react';
import { reatomContext } from '@reatom/npm-react';
import { Flex } from './components/Layout/Flex';
import { GradientContainer } from './components/Layout/GradientContainer';
import { ThemeProvider } from './components/ThemeProvider';
import { ctx } from '##/atoms/app';
import { Login } from './pages/Login/Login';

export const App = () => {
  return (
    <reatomContext.Provider value={ctx}>
      <ThemeProvider>
        <GradientContainer>
          <Login />
        </GradientContainer>
      </ThemeProvider>
    </reatomContext.Provider>
  );
};
