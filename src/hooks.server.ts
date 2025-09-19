import { svelteKitHandler } from "better-auth/svelte-kit";
import { auth } from "@/auth";
import { building } from "$app/environment";

export async function handle({
  event,
  resolve
}: {
  event: Parameters<typeof svelteKitHandler>[0]["event"];
  resolve: Parameters<typeof svelteKitHandler>[0]["resolve"];
}): Promise<Response> {
  // Fetch the current session from Better Auth
  const session = await auth.api.getSession({ headers: event.request.headers });

  // Make session and user available on server
  if (session) {
    event.locals.session = session;
    event.locals.user = session.user;
  }
  return svelteKitHandler({ event, resolve, auth, building });
}
