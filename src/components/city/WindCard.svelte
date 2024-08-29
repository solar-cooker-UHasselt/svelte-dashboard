<script>
    export let windData;
  </script>
  
  <div
    class="flex relative flex-col justify-between p-5 pb-0 h-52 bg-blue-800 rounded-lg shadow-lg transition duration-300 hover:bg-blue-700"
  >
    <!-- Wind Speed Label -->
    <div
      class="absolute top-2.5 right-2.5 px-6 py-1.5 text-xs font-bold text-black bg-blue-600 rounded-full shadow-md"
    >
      <i class="fas fa-wind"></i> WIND SPEED
    </div>
  
    <!-- Wind Speed Display -->
    <div class="flex flex-col flex-grow justify-center items-center">
      <p class="m-0 text-3xl font-bold text-white">
        {windData.speed} m/s
      </p>
      <p class="text-xs text-gray-300">
        <i class="far fa-clock"></i>
        {windData.lastUpdated}
      </p>
      <p class="mt-2 text-lg font-semibold text-gray-200">
        Direction: {windData.direction}°
      </p>
    </div>
  </div>
  