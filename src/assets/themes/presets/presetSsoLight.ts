import '../Theme.css';
import '../_color/Theme_color_ssoLight.css';
import '../_color/Theme_color_ssoDark.css';
import '../_control/Theme_control_ssoLight.css';
import '../_font/Theme_font_ssoLight.css';
import '../_size/Theme_size_ssoLight.css';
import '../_space/Theme_space_ssoLight.css';
import '../_shadow/Theme_shadow_ssoLight.css';

import { ThemePreset } from '@consta/uikit/Theme';

export const presetSsoLight: ThemePreset = {
  color: {
    primary: 'ssoLight',
    accent: 'ssoDark',
    invert: 'ssoDark',
  },
  control: 'ssoLight',
  font: 'ssoLight',
  size: 'ssoLight',
  space: 'ssoLight',
  shadow: 'ssoLight',
};
