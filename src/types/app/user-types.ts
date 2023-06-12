interface IUserData {
  id: number;
  name: string;
  lastName: string;
  address: string;
  account: string;
  password: string;
  phone: string;
  roles: string[];
}

export type UserType = {
  token: string;
  user: IUserData;
};
