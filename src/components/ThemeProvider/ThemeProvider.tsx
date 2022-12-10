import React from 'react';
import { Theme } from '@consta/uikit/Theme';
import { useAtom } from '@reatom/npm-react';
import { themeAtom } from '##/atoms/theme';

type Props = { children?: React.ReactNode };

export const ThemeProvider = (props: Props) => {
  const { children } = props;

  const [theme] = useAtom(themeAtom);

  return <Theme preset={theme}>{children}</Theme>;
};
