import { IconComponent } from '@consta/uikit/Icon';
import { IconMoon } from '@consta/uikit/IconMoon';
import { IconSun } from '@consta/uikit/IconSun';
import { ThemePreset } from '@consta/uikit/Theme';
import { atom } from '@reatom/core';
import { reatomRecord } from '@reatom/primitives';
import { onUpdate } from '@reatom/hooks';
import { presetSsoDark, presetSsoLight, ThemeName } from '##/assets/themes';

export const themes = [presetSsoDark, presetSsoLight];

export const iconsMap: Record<ThemeName, IconComponent> = {
  ssoDark: IconMoon,
  ssoLight: IconSun,
};

export const getThemeKey = (theme: ThemePreset) => theme.color.primary;

export const getThemeIcon = (theme: ThemePreset) =>
  iconsMap[theme.color.primary as ThemeName];

const KEY = 'theme';

const snapTheme = themes.find(
  (item) => item.color.primary === localStorage.getItem(KEY),
);

export const themeAtom = atom<ThemePreset>(
  snapTheme || presetSsoLight,
  'themeAtom',
);

onUpdate(themeAtom, (ctx, value) =>
  ctx.schedule(() => localStorage.setItem(KEY, value.color.primary)),
);

export const htmlModsAtom = reatomRecord<
  Record<string, string | boolean | undefined>
>({}, 'htmlModsAtom');
