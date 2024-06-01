<script>
  import { onMount, onDestroy } from "svelte";
  import { supabase } from "$lib/supabaseClient";
  let isLoggedIn = false;
  let menuOpen = false;
  let loading = true; // Add loading state
  let dropdownRef;

  // Check if the user is logged in
  async function checkUser() {
    // Introduce a delay to simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 500));

    const {
      data: { user },
    } = await supabase.auth.getUser();
    isLoggedIn = !!user;
    loading = false;
  }

  // Function to handle logging out
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      // Call the logout endpoint to remove the cookie
      const response = await fetch("/api/clear-auth-cookie", {
        method: "POST",
      });
      if (response.ok) {
        console.log("Cookie cleared successfully");
        location.reload(); // Reload the page to reflect changes
      } else {
        console.error("Failed to clear cookie:", await response.text());
      }
    }
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }

  function handleClickOutside(event) {
    if (dropdownRef && !dropdownRef.contains(event.target)) {
      closeMenu();
    }
  }

  onMount(() => {
    checkUser(); // Check user status on mount
    if (typeof document !== "undefined") {
      document.addEventListener("click", handleClickOutside);
    }
  });

  onDestroy(() => {
    if (typeof document !== "undefined") {
      document.removeEventListener("click", handleClickOutside);
    }
  });
</script>

<div class="inline-block relative" bind:this={dropdownRef}>
  {#if loading}
    <!-- Show a loading spinner or message while checking the user status -->
    <div class="loading-spinner">Loading...</div>
  {:else if isLoggedIn}
    <button
      class="overflow-hidden relative px-5 py-2 bg-white rounded-full shadow-lg group text-slate-950"
      on:click={toggleMenu}
    >
      <div
        class="absolute top-0 right-full z-0 w-full h-full bg-violet-900 opacity-20 duration-200 group-hover:translate-x-full"
      ></div>
      <h4 class="relative z-9">My Account</h4>
    </button>
    {#if menuOpen}
      <div
        class="absolute right-0 mt-2 w-48 text-white bg-gray-800 rounded-lg shadow-lg"
      >
        <a href="/welcome" class="block px-4 py-2 text-sm hover:bg-gray-600"
          >Settings</a
        >
        <a
          href="#"
          on:click={handleLogout}
          class="block px-4 py-2 text-sm hover:bg-gray-600">Log out</a
        >
      </div>
    {/if}
  {:else}
    <a href="/login">
      <button
        class="overflow-hidden relative px-5 py-2 bg-white rounded-full shadow-lg group text-slate-950"
      >
        <div
          class="absolute top-0 right-full z-0 w-full h-full bg-violet-900 opacity-20 duration-200 group-hover:translate-x-full"
        ></div>
        <h4 class="relative z-9">Login</h4>
      </button>
    </a>
  {/if}
</div>
