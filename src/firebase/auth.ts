import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { app } from "./app";

export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
