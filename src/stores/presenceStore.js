import { create } from "zustand";

export const usePresenceStore = create((set, get) => ({
  presences: {},

  setOnline: (userId) =>
    set((state) => ({
      presences: {
        ...state.presences,
        [userId]: {
          userId,
          status: "online",
        },
      },
    })),

  setOffline: (userId) =>
    set((state) => ({
      presences: {
        ...state.presences,
        [userId]: {
          userId,
          status: "offline",
        },
      },
    })),

  setBulk: (snapshots) =>
    set((state) => {
      const next = { ...state.presences };

      snapshots.forEach((p) => {
        next[p.userId] = {
          userId: p.userId,
          status: p.status === 1 ? "online" : "offline",
        };
      });

      return { presences: next };
    }),

  isOnline: (userId) => {
    const p = get().presences[userId];
    return p?.status === "online";
  },
}));
