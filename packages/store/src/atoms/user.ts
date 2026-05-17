import { atom, AtomEffect } from 'recoil';

export interface User {
  token: string;
  id: string;
  name: string;
}

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      try {
        setSelf(JSON.parse(savedValue));
      } catch (e) {}
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const userAtom = atom<User | null>({
  key: 'user',
  default: null,
  effects_UNSTABLE: [localStorageEffect<User | null>('user_session')],
});
