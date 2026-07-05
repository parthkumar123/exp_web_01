import { handlers } from "@/auth";

// Auth.js route handler (Node runtime). Serves /api/auth/* — sign-in,
// callback, session, csrf, sign-out — for the Google provider.
export const { GET, POST } = handlers;
