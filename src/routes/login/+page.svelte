<script lang="ts">
  import { authClient } from "$lib/auth-client";
  import { goto } from "$app/navigation";

  let email = $state("");
  let password = $state("");
  let message = $state("");
  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    message = "";
    loading = true;

    try {
      await authClient.signIn.email({ email, password });
      await goto("/me");
    } catch (err: unknown) {
      if (err instanceof Error) {
        message = err?.message || "Something went wrong.";
      }
    } finally {
      loading = false;
    }
  }
</script>

<h1>Sign In</h1>

<form onsubmit={handleSubmit}>
  <div>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" bind:value={email} required disabled={loading} />
  </div>

  <div>
    <label for="password">Password</label>
    <input
      id="password"
      name="password"
      type="password"
      bind:value={password}
      required
      disabled={loading}
    />
  </div>

  <div>
    <button type="submit" disabled={loading}>
      {loading ? "Signing in..." : "Sign In"}
    </button>
  </div>
</form>

{#if message}
  <p>{message}</p>
{/if}

<p>
  Don't have an account? <a href="/signup">Sign up</a>
</p>
