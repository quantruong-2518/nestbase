import { Role } from 'modules/auth/enum/role.enum';

export interface IUser {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  avatar: string;
  roles: Role[];
}
