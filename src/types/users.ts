export type UserUpdate = {
  username?: string;
  email?: string;
  phone?: string;
};

export type UserAuthenticateData = {
  grant_type?: string;
  username: string;
  password: string;
  scope: string;
  client_id: string;
  client_secret: string;
};
