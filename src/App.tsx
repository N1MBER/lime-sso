import React from 'react';
import { reatomContext } from '@reatom/npm-react';
import { Flex } from './components/Layout/Flex';
import { GradientContainer } from './components/Layout/GradientContainer';
import { ThemeProvider } from './components/ThemeProvider';
import { ctx } from '##/atoms/app';

export const App = () => {
  return (
    <reatomContext.Provider value={ctx}>
      <ThemeProvider>
        <GradientContainer>
          <Flex>Kek</Flex>
        </GradientContainer>
      </ThemeProvider>
    </reatomContext.Provider>
  );
};
