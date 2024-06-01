<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    // Placeholder for user data
    const user = writable({
      username: '',
      email: '',
      firstName: '',
      lastName: ''
    });
  
    // Fetch user data on mount
    onMount(async () => {
      // Replace with your actual fetch call
      const response = await fetch('/api/user');
      const data = await response.json();
      user.set(data);
    });
  
    // Function to handle form submission
    async function updateUser(event: Event) {
      event.preventDefault();
  
      // Get form data
      const formData = new FormData(event.target as HTMLFormElement);
      const updatedUser = Object.fromEntries(formData.entries());
  
      // Replace with your actual update call
      const response = await fetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify(updatedUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Update user store with new data
        user.set(updatedUser);
        alert('User updated successfully');
      } else {
        alert('Failed to update user');
      }
    }
  </script>
  
  <style>
    .accountContainer {
      @apply flex flex-col items-center justify-center flex-1 p-6;
    }
    form {
      @apply flex flex-col gap-3.5;
    }
    form,
    .section {
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
    h2 {
      @apply text-center text-2xl mb-4;
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
    .section {
      @apply mb-6 p-4 border rounded-[5px] border-solid border-[navy];
    }
    .form-actions {
      @apply flex justify-end gap-3 mt-4;
    }
    .form-actions button {
      @apply px-4 py-2 rounded-[5px] text-[white] cursor-pointer border-[none];
    }
    .form-actions .cancel-btn {
      @apply bg-[gray];
    }
    .form-actions .save-btn {
      @apply bg-[navy];
    }
  </style>
  
  <div class="accountContainer">
    <form on:submit={updateUser}>
      <div class="section">
        <h2>Account Information</h2>
        <label>
          <p class={user.username ? "above" : "center"}>Username</p>
          <input type="text" name="username" bind:value={$user.username} required />
        </label>
        <label>
          <p class={user.email ? "above" : "center"}>Email</p>
          <input type="email" name="email" bind:value={$user.email} required />
        </label>
        <label>
          <p class="center">Password</p>
          <button type="button">Reset password</button>
        </label>
      </div>
  
      <div class="section">
        <h2>Profile Information</h2>
        <label>
          <p class={user.firstName ? "above" : "center"}>First Name</p>
          <input type="text" name="firstName" bind:value={$user.firstName} required />
        </label>
        <label>
          <p class={user.lastName ? "above" : "center"}>Last Name</p>
          <input type="text" name="lastName" bind:value={$user.lastName} required />
        </label>
      </div>
  
      <div class="form-actions">
        <button type="button" class="cancel-btn">Cancel</button>
        <button type="submit" class="save-btn">Save</button>
      </div>
    </form>
  </div>
  