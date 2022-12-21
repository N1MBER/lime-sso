import React from 'react';
import { Modal } from '@consta/uikit/Modal';
import { useAtom, useAction } from '@reatom/npm-react';
import { ThemeToggler } from '@consta/uikit/ThemeToggler';
import { ThemePreset } from '@consta/uikit/Theme';
import { Gradient } from '##/components/Gradient';
import { cn } from '##/utils/bem';
import './GradientContainer.css';
import { ThemeName } from '##/assets/themes';
import { getThemeIcon, getThemeKey, themeAtom, themes } from '##/atoms/theme';

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'css'>;

const cnGradientContainer = cn('GradientContainer');

const themeColorsMap: Record<ThemeName, string[]> = {
  ssoLight: ['#8264fc', '#ad56fa', '#f7f9fb', '#1c1d1f'],
  ssoDark: ['#1c1d1f', '#f7f9fb', '#ad56fa', '#8264fc'],
};

export const GradientContainer = (props: Props) => {
  const { children, className } = props;

  const [theme] = useAtom(themeAtom);

  const setTheme = useAction((ctx, props: { value: ThemePreset }) =>
    themeAtom(ctx, props.value),
  );

  return (
    <div className={cnGradientContainer(null, [className])}>
      <ThemeToggler
        className={cnGradientContainer('Toggler')}
        getItemKey={getThemeKey}
        getItemLabel={getThemeKey}
        getItemIcon={getThemeIcon}
        items={themes}
        onChange={setTheme}
        value={theme}
        size="l"
      />
      <Gradient colors={themeColorsMap[theme.color.primary as ThemeName]} />
      <Modal
        isOpen
        hasOverlay={false}
        className={cnGradientContainer('Modal')}
        rootClassName={cnGradientContainer('Root')}
      >
        <div className={cnGradientContainer('Content')}>{children}</div>
      </Modal>
    </div>
  );
};
