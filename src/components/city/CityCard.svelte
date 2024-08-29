<script>
  export let cityData;
  export let isStarred = false; // Initial state of the star

  // Event dispatcher to notify parent component
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // Function to toggle the starred state
  function toggleStar() {
    isStarred = !isStarred;
    dispatch('starToggle', { id: cityData.id, isStarred }); // Notify the parent
  }
</script>

<div
  class="flex relative flex-col justify-between p-4 pb-2 h-40 bg-blue-800 rounded-lg shadow-lg transition duration-300 hover:bg-blue-700"
>
  <!-- City Name and Country Display, with space for star and ellipsis for long names -->
  <div class="flex justify-between items-center w-full">
    <div
      class="px-4 py-1 text-xl font-bold text-black bg-blue-600 rounded-full shadow-md overflow-hidden text-ellipsis whitespace-nowrap max-w-[75%]"
      title="{cityData.name}, {cityData.country}"
    >
     <!-- Show full name on hover -->
      <i class="fas fa-map-marker-alt"></i> {cityData.name}, {cityData.country}
    </div>
    <!-- Star Icon for toggling the star status, made larger and spaced -->
    <div>
      <button on:click={toggleStar} aria-label="Star this city" class="ml-2">
        {#if isStarred}
          <i class="text-2xl text-yellow-400 fas fa-star"></i>
        {:else}
          <i class="text-2xl text-gray-300 far fa-star hover:text-yellow-400"></i>
        {/if}
      </button>
    </div>
  </div>

  <!-- Coordinates Display, smaller text, reduced margin -->
  <div class="flex flex-col flex-grow justify-center items-center mt-2">
    <p class="m-0 text-lg font-semibold leading-tight text-white">
      Longitude: {cityData.longitude}°
    </p>
    <p class="m-0 text-lg font-semibold leading-tight text-white">
      Latitude: {cityData.latitude}°
    </p>
  </div>
</div>
