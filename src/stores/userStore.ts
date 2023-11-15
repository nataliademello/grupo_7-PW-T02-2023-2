import { User, signInWithPopup, signOut } from "firebase/auth";
import { create } from "zustand";
import { auth, googleAuthProvider } from "../firebase/auth";

interface UserState {
  user: User | null;
  setUser(user: User): void;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
}

export const useUserStore = create<UserState>()((set) => {
  return {
    user: null,
    pontuacao: 0,
    setUser(user) {
      set(() => ({ user }));
    },
    async signInWithGoogle() {
      const res = await signInWithPopup(auth, googleAuthProvider);

      set(() => ({ user: res.user }));
    },
    async signOut() {
      await signOut(auth);
      set(() => ({ user: null }));
    },
  };
});
