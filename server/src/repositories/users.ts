import { USERS } from '../constants/users';
import { User } from '../types/users';

export const getAll = (): User[] => {
  return USERS;
};
