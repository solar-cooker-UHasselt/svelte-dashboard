<script>
  import { supabase } from "$lib/supabaseClient";
  import { goto } from "$app/navigation";
  import "../app.css";

  let email = "";
  let password = "";
  let confirmPass = "";
  let errorMessage = "";
  let errorStatus = false;
  let register = false;

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "https://duckduckgo.com",
      },
    });

    if (error) {
      errorStatus = true;
      errorMessage = error.message;
    } else {
      errorStatus = false;
      errorMessage = "Please check your email to confirm your account";
    }
  }

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      errorStatus = true;
      errorMessage = error.message;
    } else {
      errorStatus = false;
      errorMessage = "Sign-in successful! Redirecting...";

      // Send the session token to the server to set the cookie
      const response = await fetch("/api/set-auth-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: data.session.access_token }),
      });

      if (response.ok) {
        console.log("Cookie set successfully");

        // Delay the redirection
        setTimeout(() => {
          console.log("Redirecting to /welcome");
          goto("/welcome");
        }, 1000); // 1-second delay
      } else {
        console.error("Failed to set cookie:", await response.text());
      }
    }
  }

  async function handleAuthenticate() {
    if (!email || !password || (register && !confirmPass)) {
      errorStatus = true;
      errorMessage = "Please fill in all fields";
      return;
    }

    if (register) {
      if (password !== confirmPass) {
        errorStatus = true;
        errorMessage = "Passwords do not match";
        return;
      }
      signUpNewUser();
    } else {
      signInWithEmail();
    }
  }

  function handleRegister() {
    register = !register;
    errorMessage = "";
  }
</script>

<div class=".authContainer">
  <form>
    <h1>
      {register ? "Register" : "Login"}
    </h1>
    {#if errorStatus}
      <p class="error"></p>
    {/if}

    {#if errorMessage !== ""}
      {#if errorStatus}
        <p class="error">{errorMessage}</p>
      {:else}
        <p class="succes">{errorMessage}</p>
      {/if}
    {/if}

    <label>
      <p class={email ? "above" : "center"}>Email</p>
      <input bind:value={email} type="email" placeholder="Email" />
    </label>
    <label>
      <p class={password ? "above" : "center"}>Password</p>
      <input bind:value={password} type="password" placeholder="Password" />
    </label>
    {#if register}
      <label>
        <p class={confirmPass ? "above" : "center"}>Confirm Password</p>
        <input
          bind:value={confirmPass}
          type="password"
          placeholder="Confirm Password"
        />
      </label>
    {/if}
    <button on:click={handleAuthenticate} type="button">Submit</button>
  </form>
  <div class="options">
    <p>Or</p>
    {#if register}
      <div>
        <p>Already have an account?</p>
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <p on:click={handleRegister} on:keydown={() => {}}>Login</p>
      </div>
    {:else}
      <div>
        <p>Don't have an account?</p>
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <p on:click={handleRegister} on:keydown={() => {}}>Register</p>
      </div>
    {/if}
  </div>
</div>

<style>
  /*
  Based on TailwindCSS recommendations,
  consider using classes instead of the `@apply` directive
  @see https://tailwindcss.com/docs/reusing-styles#avoiding-premature-abstraction
*/
  .authContainer {
    @apply flex flex-col items-center justify-center flex-1 p-6;
  }
  form {
    @apply flex flex-col gap-3.5;
  }
  form,
  .options {
    @apply w-[400px] max-w-full mx-auto my-0;
  }
  form input {
    @apply w-full text-[white] p-3.5 border-[none] focus:border-[none];
    background: transparent;
  }
  form input:focus {
    outline: none;
  }
  form label:focus-within {
    @apply border-[blue];
  }
  form label {
    @apply relative border rounded-[5px] border-solid border-[navy];
  }
  h1 {
    @apply text-center text-5xl;
  }
  form button {
    @apply bg-[navy] text-[white] cursor-pointer text-base px-0 py-3.5 rounded-[5px] border-[none];
  }
  form button:hover {
    background: blue;
  }
  .above,
  .center {
    @apply absolute -translate-y-2/4 pointer-events-none text-[white] rounded text-[0.8rem] px-1.5 py-0;
  }
  .above {
    @apply border text-[0.7rem] border-solid border-[blue] left-6 top-0;
    background: navy;
  }
  .center {
    @apply border opacity-0 border-solid border-transparent left-1.5 top-2/4;
  }
  .error {
    @apply text-[red] text-[0.9rem] text-center;
  }
  .succes {
    @apply text-[green] text-[0.9rem] text-center;
  }
  .options {
    @apply overflow-hidden text-[0.9rem] flex-col gap-1 px-0 py-3.5;
  }
  .options > p {
    @apply relative text-center w-fit mx-auto my-0 px-2 py-0 after:right-full before:left-full;
  }
  .options > p::after,
  .options > p::before {
    @apply absolute content-[""] -translate-y-2/4 w-screen h-[1.5px] top-2/4;
    background: white;
  }
  .options div {
    @apply flex items-center gap-2 justify-center;
  }
  .options div p:last-of-type {
    @apply text-[cyan] cursor-pointer;
  }
</style>
