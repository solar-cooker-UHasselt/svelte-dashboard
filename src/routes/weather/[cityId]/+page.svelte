<script>
  import TemperatureCard from "../../../components/city/TempCard.svelte";
  import WindCard from "../../../components/city/WindCard.svelte";
  import HumidityCard from "../../../components/city/HumidityCard.svelte";
  import { goto } from "$app/navigation";

  export let data;

  // Check if data is correctly passed
  if (!data || !data.cityData || !data.weatherData) {
    console.error("Missing required data:", data);
    throw new Error("Required data is missing.");
  }

  let cityData = data.cityData;
  let weatherData = data.weatherData;

  // Prepare temperature data for the TemperatureCard component
  let temperatureData = {
    temp: weatherData?.main?.temp || "N/A",
    feelsLike: weatherData?.main?.feels_like || "N/A",
    lastUpdated: weatherData?.dt
      ? new Date(weatherData.dt * 1000).toLocaleString()
      : "N/A",
  };

  // Prepare wind data for the WindCard component
  let windData = {
    speed: weatherData?.wind?.speed || "N/A",
    direction: weatherData?.wind?.deg || "N/A",
    lastUpdated: weatherData?.dt
      ? new Date(weatherData.dt * 1000).toLocaleString()
      : "N/A",
  };

  // Prepare humidity data for the HumidityCard component
  let humidityData = {
    value: weatherData?.main?.humidity || "N/A",
    lastUpdated: weatherData?.dt
      ? new Date(weatherData.dt * 1000).toLocaleString()
      : "N/A",
  };

  // Prepare the weather icon URL
  let weatherIconUrl = weatherData?.weather?.[0]?.icon
    ? `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    : "";

  function goBack() {
    goto("/location-overview");
  }
</script>

{#if temperatureData && windData && humidityData}
  <div class="flex flex-col items-center p-6 text-white bg-dark">
    <!-- Enhanced City and Country Name -->
    <h1 class="flex items-center mb-4 text-5xl font-extrabold text-blue-400">
      <i class="mr-2 text-blue-200 fas fa-city"></i>
      {cityData.name}, {cityData.country_name}
    </h1>

    <!-- Enhanced Weather Description with Icon -->
    <div class="flex items-center p-4 mt-6 bg-gray-800 rounded-lg shadow-md">
      {#if weatherIconUrl}
        <img src={weatherIconUrl} alt="Weather Icon" class="mr-4 w-12 h-12" />
      {/if}
      <p class="text-3xl font-semibold">
        {weatherData.weather[0]?.description || "No description available"}
      </p>
    </div>

    <!-- Grid Layout for Cards -->
    <div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Temperature Card Component -->
      <TemperatureCard {temperatureData} />

      <!-- Wind Card Component -->
      <WindCard {windData} />

      <!-- Humidity Card Component -->
      <HumidityCard {humidityData} />
    </div>

    <!-- Back to Location Overview Button -->
    <button
      on:click={goBack}
      class="px-6 py-2 mt-8 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md transition duration-300 hover:bg-blue-700"
    >
      Back to Location Overview
    </button>
  </div>
{:else}
  <div class="flex flex-col items-center p-6 text-white bg-dark">
    <p class="text-2xl">Failed to load weather data. Please try again later.</p>
  </div>
{/if}
