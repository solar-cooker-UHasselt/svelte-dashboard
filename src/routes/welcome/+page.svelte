<!-- src/routes/welcome/+page.svelte -->
<script>
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabaseClient"; // Adjust the path if necessary
  import { session } from "../../stores/sessionStore"; // Import the store
  import { get } from "svelte/store";

  export let user;

  onMount(async () => {
    const sessionData = get(session);

    if (sessionData) {
      const { data, error } = await supabase.auth.getUser(
        sessionData.access_token
      );

      if (error) {
        console.error("Error fetching user data:", error.message);
      } else {
        user = data.user;
      }
    } else {
      console.error("No session data found.");
    }
  });
</script>

<main>
  {#if user}
    <h1>Welcome, {user.email}!</h1>
  {:else}
    <p>Please login...</p>
  {/if}
</main>
