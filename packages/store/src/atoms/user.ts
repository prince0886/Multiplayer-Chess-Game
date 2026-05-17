import { atom } from 'recoil';

export interface User {
  token: string;
  id: string;
  name: string;
}

export const userAtom = atom<User | null>({
  key: 'user',
  default: null,
});
