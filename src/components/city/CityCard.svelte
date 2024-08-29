<script>
  export let cityData;
  export let isFavorited = false; // Initial state of the favorite status

  // Event dispatcher to notify the parent component
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Function to navigate to the weather page
  function goToWeatherPage() {
    window.location.href = `/weather/${cityData.id}`;
  }

  // Function to toggle the favorite status
  function toggleFavorite(event) {
    event.stopPropagation(); // Prevents triggering the goToWeatherPage when clicking the star
    isFavorited = !isFavorited;
    dispatch("favoriteToggle", { id: cityData.id, isFavorited }); // Notify the parent
  }
</script>

<button
  class="flex relative flex-col justify-between p-4 pb-2 h-40 bg-blue-800 rounded-lg shadow-lg transition duration-300 cursor-pointer hover:bg-blue-700"
  on:click={goToWeatherPage}
  on:keypress={(event) => event.key === "Enter" && goToWeatherPage()}
  aria-label={`View weather details for ${cityData.name}`}
>
  <!-- City Name, Country Display, and Favorite Star -->
  <div class="flex justify-between items-center w-full">
    <div
      class="px-4 py-1 text-xl font-bold text-black bg-blue-600 rounded-full shadow-md overflow-hidden text-ellipsis whitespace-nowrap max-w-[70%]"
      title="{cityData.name}, {cityData.country}"
    >
      <i class="fas fa-map-marker-alt"></i>
      {cityData.name}, {cityData.country}
    </div>
    <!-- Favorite Star Icon -->
    <div
      role="button"
      tabindex="0"
      on:click={toggleFavorite}
      on:keypress={(event) => event.key === "Enter" && toggleFavorite()}
      class="ml-2 cursor-pointer"
      aria-label={`Mark ${cityData.name} as favorite`}
    >
      {#if isFavorited}
        <i class="text-2xl text-yellow-400 fas fa-star"></i>
      {:else}
        <i class="text-2xl text-gray-300 far fa-star hover:text-yellow-400"></i>
      {/if}
    </div>
  </div>

  <!-- Coordinates Display -->
  <div class="flex flex-col flex-grow justify-center items-center mt-2">
    <p class="m-0 text-lg font-semibold leading-tight text-white">
      Longitude: {cityData.longitude}°
    </p>
    <p class="m-0 text-lg font-semibold leading-tight text-white">
      Latitude: {cityData.latitude}°
    </p>
  </div>
</button>
