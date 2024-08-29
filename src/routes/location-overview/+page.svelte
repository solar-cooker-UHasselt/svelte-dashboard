<script>
  import CityCard from "../../components/city/CityCard.svelte";

  export let data;
  let cities = data.cities;
  let countries = data.countries;

  let searchQuery = "";
  let selectedCountry = "";

  // Debug: Log the total number of cities
  // console.log('Total cities loaded:', cities.length);

  // Filter cities based on the search query and selected country
  $: filteredCities = cities.filter(
    (city) =>
      (city.name
        ?.toLowerCase()
        .trim()
        .includes(searchQuery.toLowerCase().trim()) ||
        city.country_name
          ?.toLowerCase()
          .trim()
          .includes(searchQuery.toLowerCase().trim())) &&
      (selectedCountry === "" || city.country_code === selectedCountry)
  );

  // Handle the favorite toggle event
  function handleFavoriteToggle(event) {
    const { id, isFavorited } = event.detail;
    if (isFavorited) {
      favorites.push(id); // Add city to favorites
    } else {
      favorites = favorites.filter((favId) => favId !== id); // Remove city from favorites
    }
  }
</script>

<div class="p-4">
  <!-- Search Input with Country Filter -->
  <div class="flex mb-4">
    <input
      id="search-input"
      type="text"
      bind:value={searchQuery}
      placeholder="Search for city or country..."
      class="block p-2 w-full placeholder-gray-400 text-white bg-gray-900 rounded-l-md border border-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
    />
    <select
      bind:value={selectedCountry}
      class="block p-2 text-white bg-gray-900 rounded-r-md border border-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Countries</option>
      {#each countries as country}
        <option value={country.country_code}>{country.country_name}</option>
      {/each}
    </select>
  </div>

  <!-- Display Cities -->
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#if filteredCities.length > 0}
      {#each filteredCities as city}
        <CityCard
          cityData={{
            id: city.id,
            name: city.name,
            country: city.country_name,
            longitude: city.longitude,
            latitude: city.latitude,
          }}
        />
      {/each}
    {:else}
      <p class="text-white">No cities found for the search query.</p>
    {/if}
  </div>
</div>
