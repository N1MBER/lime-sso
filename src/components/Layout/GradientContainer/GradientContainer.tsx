import React, { useRef } from 'react';
import { Modal } from '@consta/uikit/Modal';
import { useAtom, useAction } from '@reatom/npm-react';
import { ThemeToggler } from '@consta/uikit/ThemeToggler';
import { ThemePreset } from '@consta/uikit/Theme';
import { Button } from '@consta/uikit/Button';
import { IconType } from '@consta/icons/IconType';
import { useFlag } from '@consta/uikit/useFlag';
import { ContextMenu } from '@consta/uikit/ContextMenu';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { Gradient } from '##/components/Gradient';
import { cn } from '##/utils/bem';
import './GradientContainer.css';
import { ThemeName } from '##/assets/themes';
import { getThemeIcon, getThemeKey, themeAtom, themes } from '##/atoms/theme';
import { Language } from '##/types/common';
import { languageAtom } from '##/atoms/language';
import { Flex } from '../Flex';
import { LanguageSelector } from '##/components/LanguageSelector/LanguageSelector';

export const themeColorsMap: Record<ThemeName, string[]> = {
  ssoLight: ['#8264fc', '#ad56fa', '#f7f9fb', '#1c1d1f'],
  ssoDark: ['#1c1d1f', '#f7f9fb', '#ad56fa', '#8264fc'],
};

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'css'>;

const cnGradientContainer = cn('GradientContainer');

export const GradientContainer = (props: Props) => {
  const { children, className } = props;

  const [theme] = useAtom(themeAtom);
  const [language] = useAtom(languageAtom);

  const { isDesktop } = useBreakpoints({ isDesktop: 800 });

  const [showMenu, setShowMenu] = useFlag();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const setTheme = useAction((ctx, props: { value: ThemePreset }) =>
    themeAtom(ctx, props.value),
  );

  const setLanguage = useAction((ctx, value: Language) =>
    languageAtom(ctx, value),
  );

  const renderControls = () => (
    <Flex
      gap="var(--space-m)"
      justify="flex-end"
      className={cnGradientContainer('Controls')}
    >
      <LanguageSelector />
      <ThemeToggler
        className={cnGradientContainer('Toggler')}
        getItemKey={getThemeKey}
        getItemLabel={getThemeKey}
        getItemIcon={getThemeIcon}
        items={themes}
        onChange={setTheme}
        value={theme}
        size={isDesktop ? 'l' : 's'}
      />
    </Flex>
  );

  return (
    <div className={cnGradientContainer(null, [className])}>
      {isDesktop && renderControls()}
      <Gradient
        colors={themeColorsMap[theme.color.primary as ThemeName]}
        className={cnGradientContainer('Gradient')}
      />
      <Modal
        isOpen
        hasOverlay={false}
        className={cnGradientContainer('Modal')}
        rootClassName={cnGradientContainer('Root')}
      >
        <div className={cnGradientContainer('Content')}>
          {!isDesktop && renderControls()}
          {children}
        </div>
      </Modal>
    </div>
  );
};
