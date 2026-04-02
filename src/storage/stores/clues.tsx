import { Clue } from "@/types";
import * as Crypto from "expo-crypto";
import { createStore } from "../storage";

type CluesStore = {
  clues: Clue[];
  addClue: (clue: Omit<Clue, "id">) => void;
  getClue: (id: string) => Clue | undefined;
  updateClue: (id: string, updatedClue: Partial<Omit<Clue, "id">>) => void;
  deleteClue: (id: string) => void;
  clearClues: () => void;
};

const useCluesStore = createStore<CluesStore>("clues", (set, get) => ({
  clues: [],
  addClue: (clue) =>
    set((state) => {
      const newClue = { id: Crypto.randomUUID(), ...clue };
      return { clues: [...state.clues, newClue] };
    }),
  getClue: (id) => get().clues.find((clue) => clue.id === id),
  updateClue: (id, updatedClue) =>
    set((state) => ({
      clues: state.clues.map((clue) =>
        clue.id === id ? { ...clue, ...updatedClue } : clue,
      ),
    })),
  deleteClue: (id) =>
    set((state) => ({
      clues: state.clues.filter((clue) => clue.id !== id),
    })),
  clearClues: () => set({ clues: [] }),
}));

export default useCluesStore;
