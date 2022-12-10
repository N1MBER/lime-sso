import React from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

type Props = { children?: React.ReactNode };

export const ThemeProvider = (props: Props) => {
  const { children } = props;
  return <Theme preset={presetGpnDefault}>{children}</Theme>;
};
