<script>
  import { supabase } from "$lib/supabaseClient";
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";
  let confirmPass = "";
  let errorMessage = "";
  let errorStatus = false;
  let register = false;
  let passwordRef;
  let confirmPassRef;

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

      const response = await fetch("/api/set-auth-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: data.session.access_token }),
      });

      if (response.ok) {
        console.log("Cookie set successfully");
        setTimeout(() => {
          console.log("Redirecting to /welcome");
          goto("/welcome");
        }, 1000);
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

  function handleEmailKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      passwordRef.focus();
    }
  }

  function handlePasswordKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (register) {
        confirmPassRef.focus();
      } else {
        handleAuthenticate();
      }
    }
  }

  function handleConfirmPassKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAuthenticate();
    }
  }
</script>

<div class="flex flex-col justify-center items-center p-6 min-h-screen text-white bg-dark">
  <form class="flex flex-col gap-3.5 mx-auto w-full max-w-md">
    <h1 class="mb-4 text-5xl text-center">{register ? "Register" : "Login"}</h1>
    {#if errorMessage !== ""}
      {#if errorStatus}
        <p class="text-red-500 text-[0.9rem] text-center">{errorMessage}</p>
      {:else}
        <p class="text-green-500 text-[0.9rem] text-center">{errorMessage}</p>
      {/if}
    {/if}

    <label class="relative border rounded-[5px] border-solid border-[navy] focus-within:border-blue-500">
      <p class={`absolute transition-all duration-300 text-white ${email ? "bg-[navy] -top-3 left-4 px-1 text-[0.8rem] rounded" : "top-3 left-3 text-[1rem] opacity-0"}`}>Email</p>
      <input
        bind:value={email}
        type="email"
        placeholder="Email"
        on:keydown={handleEmailKeyDown}
        class="p-3.5 w-full text-white bg-transparent border-none focus:border-none focus:outline-none"
      />
    </label>
    <label class="relative border rounded-[5px] border-solid border-[navy] focus-within:border-blue-500">
      <p class={`absolute transition-all duration-300 text-white ${password ? "bg-[navy] -top-3 left-4 px-1 text-[0.8rem] rounded" : "top-3 left-3 text-[1rem] opacity-0"}`}>Password</p>
      <input
        bind:value={password}
        type="password"
        placeholder="Password"
        bind:this={passwordRef}
        on:keydown={handlePasswordKeyDown}
        class="p-3.5 w-full text-white bg-transparent border-none focus:border-none focus:outline-none"
      />
    </label>
    {#if register}
      <label class="relative border rounded-[5px] border-solid border-[navy] focus-within:border-blue-500">
        <p class={`absolute transition-all duration-300 text-white ${confirmPass ? "bg-[navy] -top-3 left-4 px-1 text-[0.8rem] rounded" : "top-3 left-3 text-[1rem] opacity-0"}`}>Confirm Password</p>
        <input
          bind:value={confirmPass}
          type="password"
          placeholder="Confirm Password"
          bind:this={confirmPassRef}
          on:keydown={handleConfirmPassKeyDown}
          class="p-3.5 w-full text-white bg-transparent border-none focus:border-none focus:outline-none"
        />
      </label>
    {/if}
    <button on:click={handleAuthenticate} type="button" class="bg-[navy] text-white cursor-pointer text-base px-0 py-3.5 rounded-[5px] border-none hover:bg-blue-700">Submit</button>
  </form>
  <div class="overflow-hidden text-[0.9rem] flex flex-col gap-1 px-0 py-2 w-full max-w-md mx-auto">
    <div class="flex gap-2 justify-center items-center my-0">
      <div class="flex-grow border-t border-white"></div>
      <span class="mx-2">Or</span>
      <div class="flex-grow border-t border-white"></div>
    </div>
    {#if register}
      <div class="flex gap-1 justify-center items-center mt-0">
        <p>Already have an account?</p>
        <p on:click={handleRegister} class="text-cyan-500 cursor-pointer">Login</p>
      </div>
    {:else}
      <div class="flex gap-1 justify-center items-center mt-0">
        <p>Don't have an account?</p>
        <p on:click={handleRegister} class="text-cyan-500 cursor-pointer">Register</p>
      </div>
    {/if}
  </div>
</div>
