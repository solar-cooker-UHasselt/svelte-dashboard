<script>
    export let temperatureData;
  </script>
  
  <div
    class="flex relative flex-col justify-between p-5 pb-0 h-52 bg-green-800 rounded-lg shadow-lg transition duration-300 hover:bg-green-700"
  >
    <!-- Temperature Label -->
    <div
      class="absolute top-2.5 right-2.5 px-6 py-1.5 text-xs font-bold text-black bg-green-600 rounded-full shadow-md"
    >
      <i class="fas fa-cloud-sun"></i> OUTSIDE TEMP (°C)
    </div>
  
    <!-- Current Temperature Display -->
    <div class="flex flex-col flex-grow justify-center items-center">
      <p class="m-0 text-3xl font-bold text-white">
        {temperatureData.temp}°C
      </p>
      <p class="text-xs text-gray-300">
        <i class="far fa-clock"></i>
        {temperatureData.lastUpdated}
      </p>
      <p class="mt-2 text-lg font-semibold text-gray-200">
        Feels Like: {temperatureData.feelsLike}°C
      </p>
    </div>
  </div>
  