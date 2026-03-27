import { createMMKV } from "react-native-mmkv";
import { create, StateCreator } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  PersistOptions,
  StateStorage,
} from "zustand/middleware";

const storage = createMMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.remove(name);
  },
};

export function createStore<T>(
  ...args: [name: string, state: StateCreator<T>] | [state: StateCreator<T>]
) {
  const [name, state] = args.length === 1 ? [undefined, args[0]] : args;

  if (name) {
    return create<T>()(
      devtools(
        persist(state, {
          name,
          storage: createJSONStorage(() => zustandStorage),
        } as PersistOptions<T>),
      ),
    );
  }

  return create<T>()(devtools(state));
}
