import React, { useRef } from 'react';
import { Modal } from '@consta/uikit/Modal';
import { useAtom, useAction } from '@reatom/npm-react';
import { ThemeToggler } from '@consta/uikit/ThemeToggler';
import { ThemePreset } from '@consta/uikit/Theme';
import { Button } from '@consta/uikit/Button';
import { IconType } from '@consta/icons/IconType';
import { useFlag } from '@consta/uikit/useFlag';
import { ContextMenu } from '@consta/uikit/ContextMenu';
import i18n from 'i18next';
import { Gradient } from '##/components/Gradient';
import { cn } from '##/utils/bem';
import './GradientContainer.css';
import { ThemeName } from '##/assets/themes';
import { getThemeIcon, getThemeKey, themeAtom, themes } from '##/atoms/theme';
import { Language } from '##/types/common';
import { languageAtom } from '##/atoms/language';
import { languages, themeColorsMap } from './helper';

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'css'>;

const cnGradientContainer = cn('GradientContainer');

export const GradientContainer = (props: Props) => {
  const { children, className } = props;

  const [theme] = useAtom(themeAtom);
  const [language] = useAtom(languageAtom);

  const [showMenu, setShowMenu] = useFlag();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const setTheme = useAction((ctx, props: { value: ThemePreset }) =>
    themeAtom(ctx, props.value),
  );

  const setLanguage = useAction((ctx, value: Language) =>
    languageAtom(ctx, value),
  );

  const handleChangeLanguage = async (language: Language) => {
    await i18n.changeLanguage(language);
    setLanguage(language);
  };

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
      <Button
        size="l"
        iconLeft={IconType}
        onlyIcon
        ref={buttonRef}
        onClick={setShowMenu.on}
        view="clear"
        className={cnGradientContainer('Language')}
      />
      <ContextMenu
        isOpen={showMenu}
        onClickOutside={setShowMenu.off}
        anchorRef={buttonRef}
        items={languages}
        style={{ zIndex: 3 }}
        getItemKey={(item) => item.label}
        getItemOnClick={(item) => () => handleChangeLanguage(item.language)}
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
