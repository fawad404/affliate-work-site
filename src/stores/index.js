import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = (set) => ({
  authUser: null,
  token: null,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setToken: (token) => set((state) => ({ ...state, token: token })),
  removeAuthUser: () =>
    set({
      authUser: null,
      token: null,
    }),
  updateAuthUser: (id, isVerified) =>
    set((state) => {
      // Ensure authUser exists and matches the ID
      if (state.authUser && state.authUser.id === id) {
        return {
          ...state,
          authUser: {
            ...state.authUser,
            isVerified: isVerified, // Update isVerified to true or false
          },
        };
      }
      // If no matching authUser, return the unchanged state
      return state;
    }),
});

const useAuthStore = create(
  persist(useStore, {
    name: "user",
  })
);

export default useAuthStore;
