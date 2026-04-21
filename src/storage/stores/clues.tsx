import { Clue } from "@/types";
import { randomUUID } from "expo-crypto";
import { createStore } from "../storage";

type ClueStore = {
  clues: Clue[];
  addClue: (clue: Omit<Clue, "id" | "isFavorite">) => void;
  mergeClues: (cluesToMerge: Clue[]) => void;
  getClue: (id: string) => Clue | undefined;
  updateClue: (id: string, updatedClue: Partial<Omit<Clue, "id">>) => void;
  deleteClue: (id: string) => void;
  clearClues: () => void;
};

const useClueStore = createStore<ClueStore>("clues", (set, get) => ({
  clues: [],
  addClue: (clue) =>
    set((state) => {
      const newClue = { ...clue, id: randomUUID(), isFavorite: false };
      return { clues: [...state.clues, newClue] };
    }),
  mergeClues: (cluesToMerge) =>
    set((state) => {
      const clueMap = new Map(state.clues.map((c) => [c.id, c]));
      cluesToMerge.forEach((c) => clueMap.set(c.id, c));
      return { clues: [...clueMap.values()] };
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

export default useClueStore;
