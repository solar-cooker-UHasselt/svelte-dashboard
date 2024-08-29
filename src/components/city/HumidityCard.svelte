<script>
    export let humidityData;
  </script>
  
  <div
    class="flex relative flex-col justify-between p-5 pb-0 h-52 bg-purple-800 rounded-lg shadow-lg transition duration-300 hover:bg-purple-700"
  >
    <!-- Humidity Label -->
    <div
      class="absolute top-2.5 right-2.5 px-6 py-1.5 text-xs font-bold text-black bg-purple-600 rounded-full shadow-md"
    >
      <i class="fas fa-tint"></i> HUMIDITY
    </div>
  
    <!-- Humidity Display -->
    <div class="flex flex-col flex-grow justify-center items-center">
      <p class="m-0 text-3xl font-bold text-white">
        {humidityData.value}%
      </p>
      <p class="text-xs text-gray-300">
        <i class="far fa-clock"></i>
        {humidityData.lastUpdated}
      </p>
    </div>
  </div>
  