<script lang="ts">
  import { authClient } from "$lib/auth-client";
  import { goto } from "$app/navigation";

  let email = $state("");
  let password = $state("");
  let name = $state("");
  let message = $state("");
  let loading = $state(false);

  async function handleSubmit(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    message = "";
    loading = true;

    try {
      await authClient.signUp.email({ email, password, name });
      message = "Account created successfully! Redirecting to login...";
      setTimeout(() => {
        goto("/login");
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        message = err?.message || "Something went wrong.";
      }
    } finally {
      loading = false;
    }
  }
</script>

<h1>Sign Up</h1>

<form onsubmit={handleSubmit}>
  <div>
    <label for="name">Name</label>
    <input id="name" name="name" type="text" bind:value={name} required disabled={loading} />
  </div>

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
      {loading ? "Creating account..." : "Create Account"}
    </button>
  </div>
</form>

{#if message}
  <p>{message}</p>
{/if}

<p>
  Already have an account? <a href="/login">Sign in</a>
</p>
