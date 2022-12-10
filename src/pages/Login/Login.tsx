import React from 'react';
import { Text } from '@consta/uikit/Text';
import { cnMixAuth } from '##/mixs/MixAuth';
import { cn } from '##/utils/bem';

const cnLogin = cn('Login');

export const Login = () => {
  return (
    <div className={cnLogin(null, [cnMixAuth(null, null)])}>
      <Text size="3xl" lineHeight="xs" weight="semibold">
        Вход
      </Text>
    </div>
  );
};
