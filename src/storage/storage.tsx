import { getOrCreateEncryptionKey } from "@/storage/encryption";
import { createMMKV, type MMKV } from "react-native-mmkv";
import { create, StateCreator } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  PersistOptions,
  StateStorage,
} from "zustand/middleware";

let storage: MMKV | null = null;
let initializationPromise: Promise<void> | null = null;
const hydrationQueue = new Set<() => void | Promise<void>>();

const createEncryptedStorage = async () => {
  const encryptionKey = await getOrCreateEncryptionKey();
  return createMMKV({
    id: "local-clue",
    encryptionKey,
    encryptionType: "AES-256",
  });
};

export const initializeStorage = async () => {
  if (storage) {
    return;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    storage = await createEncryptedStorage();
  })();

  try {
    await initializationPromise;
    await Promise.allSettled(
      [...hydrationQueue].map((rehydrate) => rehydrate()),
    );
    hydrationQueue.clear();
  } finally {
    initializationPromise = null;
  }
};

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage?.set(name, value);
  },
  getItem: (name) => {
    const value = storage?.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage?.remove(name);
  },
};

export function createStore<T>(
  ...args: [name: string, state: StateCreator<T>] | [state: StateCreator<T>]
) {
  const [name, state] = args.length === 1 ? [undefined, args[0]] : args;

  if (name) {
    const store = create<T>()(
      devtools(
        persist(state, {
          name,
          skipHydration: true,
          storage: createJSONStorage(() => zustandStorage),
        } as PersistOptions<T>),
      ),
    );

    if (storage) {
      store.persist.rehydrate();
    } else {
      hydrationQueue.add(store.persist.rehydrate);
    }

    return store;
  }

  return create<T>()(devtools(state));
}
