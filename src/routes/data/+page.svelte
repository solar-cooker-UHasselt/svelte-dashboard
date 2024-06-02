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

  let potTemperatureData1 = {
    temp: 100.0,
    lastUpdated: "2024-04-16 00:00:00",
    minTemp: 100.0,
    maxTemp: 100.0,
  };

  let potTemperatureData2 = {
    temp: 100,
    lastUpdated: "2024-04-16 00:00:00",
    minTemp: 100.0,
    maxTemp: 100.0,
  };

  let potTemperatureData3 = {
    temp: -273.0,
    lastUpdated: "2024-04-16 00:00:00",
    minTemp: -273.15,
    maxTemp: -273.0,
  };
</script>

<div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
  <OutsideTemperatureCard {temperatureData} />
  <WindSpeedCard {windSpeedData} />
  <SolarIrradianceCard {solarIrradianceData} />
  <PotTemperatureCard potTemperatureData={potTemperatureData1} index={0} />
  <PotTemperatureCard potTemperatureData={potTemperatureData2} index={1} />
  <PotTemperatureCard potTemperatureData={potTemperatureData3} index={2} />
</div>
