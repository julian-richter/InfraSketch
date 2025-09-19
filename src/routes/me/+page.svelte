<script lang="ts">
  import { authClient } from "$lib/auth-client";
  import { goto } from "$app/navigation";

  const session = authClient.useSession();
  let message = $state("");

  async function handleSignOut(): Promise<void> {
    try {
      await authClient.signOut();
      await goto("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        message = err?.message || "Something went wrong.";
      }
    }
  }
</script>

{#if $session?.data}
  <h1>My Account</h1>

  <div>
    <p><strong>Email:</strong> {$session.data.user?.email}</p>
    <p><strong>Name:</strong> {$session.data.user?.name || "Not provided"}</p>
    <p><strong>User ID:</strong> {$session.data.user?.id}</p>
  </div>

  <button onclick={handleSignOut}>Sign Out</button>

  {#if message}
    <p>{message}</p>
  {/if}
{:else}
  <h1>Please Sign In</h1>
  <p>You need to be signed in to view this page.</p>
  <p>
    <a href="/login">Sign In</a> or <a href="/signup">Create Account</a>
  </p>
{/if}
