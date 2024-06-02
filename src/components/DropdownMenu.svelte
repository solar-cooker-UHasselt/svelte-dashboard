<script>
  import { onMount, onDestroy } from "svelte";
  import { supabase } from "$lib/supabaseClient";
  let isLoggedIn = false;
  let menuOpen = false;
  let loading = true;
  let dropdownRef;

  async function checkUserStatus() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const {
        data: { user },
      } = await supabase.auth.getUser();
      isLoggedIn = !!user;
    } catch (error) {
      console.error("Error checking user status:", error);
    } finally {
      loading = false;
    }
  }

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        const response = await fetch("/api/clear-auth-cookie", {
          method: "POST",
        });
        if (response.ok) {
          console.log("Cookie cleared successfully");
          location.reload();
        } else {
          console.error("Failed to clear cookie:", await response.text());
        }
      }
    } catch (error) {
      console.error("Error logging out:", error);
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
    checkUserStatus();
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
        <a href="/account" class="block px-4 py-2 text-sm hover:bg-gray-600"
          >Settings</a
        >
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a
          href="#"
          on:click={logout}
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
