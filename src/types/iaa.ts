export type IaaAction =
  | 'authentication'
  | 'registration'
  | 'change_password'
  | 'post_registration_activation'
  | 'emergency_change_password'
  | 'userinfo'
  | 'refresh'
  | 'get_link'
  | 'update_user'
  | 'get_auth_link';
