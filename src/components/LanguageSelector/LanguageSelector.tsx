import React, { useRef } from 'react';
import { Button } from '@consta/uikit/Button';
import { IconType } from '@consta/icons/IconType';
import { ContextMenu } from '@consta/uikit/ContextMenu';
import { useAtom, useAction } from '@reatom/npm-react';
import { useFlag } from '@consta/uikit/useFlag';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { languageAtom } from '##/atoms/language';
import { Language } from '##/types/common';
import { cn } from '##/utils/bem';
import './LanguageSelector.css';

type LanguageItem = {
  label: string;
  language: Language;
};

export const languages: Array<LanguageItem> = [
  {
    label: 'Русский',
    language: Language.RU,
  },
  {
    label: 'English',
    language: Language.EN,
  },
];

const cnLanguageSelector = cn('LanguageSelector');

export const LanguageSelector = () => {
  const [showMenu, setShowMenu] = useFlag();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { isDesktop } = useBreakpoints({ isDesktop: 800 });

  const [language] = useAtom(languageAtom);

  const setLanguage = useAction((ctx, value: Language) =>
    languageAtom(ctx, value),
  );

  return (
    <>
      <Button
        size={isDesktop ? 'l' : 's'}
        iconLeft={IconType}
        onlyIcon
        ref={buttonRef}
        onClick={setShowMenu.on}
        view="clear"
        className={cnLanguageSelector()}
      />
      <ContextMenu
        isOpen={showMenu}
        onClickOutside={setShowMenu.off}
        anchorRef={buttonRef}
        items={languages}
        size={isDesktop ? 'l' : 's'}
        style={{
          zIndex: 3,
        }}
        className={cnLanguageSelector('Menu')}
        getItemKey={(item) => item.label}
        getItemOnClick={(item) => () => setLanguage(item.language)}
        // @ts-ignore
        getItemAttributes={(item) => ({
          'data-content': language === item.language ? 'active' : 'non active',
        })}
      />
    </>
  );
};
