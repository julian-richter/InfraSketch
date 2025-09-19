import { signInEmail, signUpEmail } from "better-auth/api";
import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({
  baseURL: "http://localhost:5173",
  SignIn: signInEmail,
  SignUp: signUpEmail
});
