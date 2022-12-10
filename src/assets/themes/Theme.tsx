import { ThemePreset } from '@consta/uikit/Theme';
import { presetSsoLight } from './presets/presetSsoLight';
import { presetSsoDark } from './presets/presetSsoDark';

export { presetSsoLight } from './presets/presetSsoLight';
export { presetSsoDark } from './presets/presetSsoDark';

export type ThemeName = 'ssoLight' | 'ssoDark';

export const getPreset = (themeName: ThemeName): ThemePreset => {
  const obj = {
    ssoLight: presetSsoLight,
    ssoDark: presetSsoDark,
  };
  return obj[themeName] || presetSsoLight;
};
