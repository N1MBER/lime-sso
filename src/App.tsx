import React from 'react';
import { Flex } from './components/Layout/Flex';
import { GradientContainer } from './components/Layout/GradientContainer';
import { ThemeProvider } from './components/ThemeProvider';

export const App = () => {
  return (
    <ThemeProvider>
      <GradientContainer>
        <Flex>Kek</Flex>
      </GradientContainer>
    </ThemeProvider>
  );
};
