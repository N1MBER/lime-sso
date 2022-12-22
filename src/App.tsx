import React from 'react';
import { reatomContext } from '@reatom/npm-react';
import { BrowserRouter } from 'react-router-dom';
import { GradientContainer } from '##/components/Layout/GradientContainer';
import { ThemeProvider } from '##/components/ThemeProvider';
import { ctx } from '##/atoms/app';
import { AppRouter } from '##/components/AppRouter';
import './i18n';

export const App = () => {
  return (
    <reatomContext.Provider value={ctx}>
      <BrowserRouter>
        <ThemeProvider>
          <GradientContainer>
            <AppRouter />
          </GradientContainer>
        </ThemeProvider>
      </BrowserRouter>
    </reatomContext.Provider>
  );
};
