<script>
  import OutsideTemperatureCard from "../../components/OutsideTemperatureCard.svelte";
  import WindSpeedCard from "../../components/WindSpeedCard.svelte";
  import SolarIrradianceCard from "../../components/SolarIrradianceCard.svelte";
  import PotTemperatureCard from "../../components/PotTemperatureCard.svelte";

  let temperatureData = {
    temp: 17.5,
    lastUpdated: "2024-04-16 00:00:00",
    minTemp: 12.3,
    maxTemp: 12.7,
  };

  let windSpeedData = {
    speed: 5.5,
    lastUpdated: "2024-04-16 00:00:00",
    minSpeed: 1.2,
    maxSpeed: 10.3,
  };

  let solarIrradianceData = {
    irradiance: 750,
    lastUpdated: "2024-04-16 00:00:00",
    minIrradiance: 200,
    maxIrradiance: 1000,
  };

  let potTemperatureData = [
    {
      temp: 95.3,
      lastUpdated: "2024-04-16 00:00:00",
      minTemp: 23.36,
      maxTemp: 100.0,
    },
    {
      temp: 90.1,
      lastUpdated: "2024-04-16 00:00:00",
      minTemp: 22.48,
      maxTemp: 90.1,
    },
    {
      temp: 25.1,
      lastUpdated: "2024-04-16 00:00:00",
      minTemp: -273.15,
      maxTemp: 1500.23,
    },
  ];
</script>

<div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
  <OutsideTemperatureCard {temperatureData} />
  <WindSpeedCard {windSpeedData} />
  <SolarIrradianceCard {solarIrradianceData} />
  {#each potTemperatureData as data, index}
    <PotTemperatureCard {data} {index} />
  {/each}
</div>
