import { createStore } from "../storage";

type ApplicationStore = {
  isOnboarded: boolean;
  setIsOnboarded: (isOnboarded: boolean) => void;
};

const useApplicationStore = createStore<ApplicationStore>(
  "application",
  (set) => ({
    isOnboarded: false,
    setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
  }),
);

export default useApplicationStore;
