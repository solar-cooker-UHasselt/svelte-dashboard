<script>
  export let data;
  let email = data.user.email;
  let errorMessage = data.errorMessage;
</script>

{#if errorMessage}
  <p class="error">{errorMessage}</p>
{/if}

{#if email}
  <p>Welcome, {email}!</p>
{/if}
