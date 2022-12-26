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

export type IaaDerivateResponse = {
  action: IaaAction;
  id: string;
  status: boolean;
  url: string;
};

export type IaaAuthenticationResponse = {
  access_token: string;
  token_type: string;
};

export type IaaExecutedActionResponse<TYPE extends IaaAction> =
  TYPE extends 'authentication'
    ? IaaAuthenticationResponse
    : IaaAuthenticationResponse;
