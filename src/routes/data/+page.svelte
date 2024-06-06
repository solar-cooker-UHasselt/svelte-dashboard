<script>
  import OutsideTemperatureCard from "../../components/sensors/OutsideTemperatureCard.svelte";
  import WindSpeedCard from "../../components/sensors/WindSpeedCard.svelte";
  import SolarIrradianceCard from "../../components/sensors/SolarIrradianceCard.svelte";
  import PotTemperatureCard from "../../components/sensors/PotTemperatureCard.svelte";

  import { onMount } from "svelte";

  export let responseData = [];
  let allData = responseData;
  let columnData = [];
  let maxValues = [];
  let minValues = [];
  let headers = [];
  let lastFetchTime = "";
  let firstMeasurementTime = "";

  const csvHeaderString =
    "Year;Month;Day;Hour;Minute;Second;Outside temperature[°C];Wind speed [m/s];Air pressure (inside box) [hPa];Relative humidity (inside box) [%];Temperature inside pot 1 [°C];Temperature inside pot 2 [°C];Temperature inside pot 3 [°C];Solar irradiance [W/m²]";

  async function fetchData() {
    try {
      const response = await fetch("/api/receive-data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      allData = result.receivedData;
      processColumns(allData);
      if (allData.length > 0) {
        lastFetchTime = formatDate(allData[allData.length - 1].slice(0, 6));
        firstMeasurementTime = formatDate(allData[0].slice(0, 6));
        updateTemperatureData(allData);
        updateWindSpeedData(allData);
        updateSolarIrradianceData(allData);
        updatePotTemperatureData(allData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  function processColumns(data) {
    if (data.length > 0) {
      columnData = Array.from({ length: data[0].length }, () => []);
      maxValues = Array(data[0].length).fill(Number.NEGATIVE_INFINITY);
      minValues = Array(data[0].length).fill(Number.POSITIVE_INFINITY);

      data.forEach((row) => {
        row.forEach((value, index) => {
          const numericValue = Number(value);
          columnData[index].push(numericValue);

          if (numericValue > maxValues[index]) {
            maxValues[index] = numericValue;
          }

          if (numericValue < minValues[index]) {
            minValues[index] = numericValue;
          }
        });
      });
    }
  }

  function initializeHeaders(headerString) {
    headers = headerString.split(";");
  }

  function formatDate(row) {
    const [year, month, day, hour, minute, second] = row;
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  function updateTemperatureData(data) {
    const tempColumnIndex = 6;
    const temps = data.map((row) => Number(row[tempColumnIndex]));
    const currentTemp = temps[temps.length - 1];
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    temperatureData = {
      temp: currentTemp,
      lastUpdated: lastFetchTime,
      minTemp: minTemp,
      maxTemp: maxTemp,
    };
  }

  function updateWindSpeedData(data) {
    const windSpeedColumnIndex = 7;
    const speeds = data.map((row) => Number(row[windSpeedColumnIndex]));
    const currentSpeed = speeds[speeds.length - 1];
    const minSpeed = Math.min(...speeds);
    const maxSpeed = Math.max(...speeds);

    windSpeedData = {
      speed: currentSpeed,
      lastUpdated: lastFetchTime,
      minSpeed: minSpeed,
      maxSpeed: maxSpeed,
    };
  }

  function updateSolarIrradianceData(data) {
    const irradianceColumnIndex = 13;
    const irradiances = data.map((row) => Number(row[irradianceColumnIndex]));
    const currentIrradiance = irradiances[irradiances.length - 1];
    const minIrradiance = Math.min(...irradiances);
    const maxIrradiance = Math.max(...irradiances);

    solarIrradianceData = {
      irradiance: currentIrradiance,
      lastUpdated: lastFetchTime,
      minIrradiance: minIrradiance,
      maxIrradiance: maxIrradiance,
    };
  }

  function updatePotTemperatureData(data) {
    const potTempIndices = [10, 11, 12];

    const updatePotData = (potIndex) => {
      const temps = data
        .map((row) => row[potTempIndices[potIndex]])
        .filter((value) => !isNaN(value) && value !== "x")
        .map(Number);

      if (temps.length > 0) {
        const currentTemp = temps[temps.length - 1];
        const minTemp = Math.min(...temps);
        const maxTemp = Math.max(...temps);

        switch (potIndex) {
          case 0:
            potTemperatureData1 = {
              temp: currentTemp,
              lastUpdated: lastFetchTime,
              minTemp: minTemp,
              maxTemp: maxTemp,
            };
            break;
          case 1:
            potTemperatureData2 = {
              temp: currentTemp,
              lastUpdated: lastFetchTime,
              minTemp: minTemp,
              maxTemp: maxTemp,
            };
            break;
          case 2:
            potTemperatureData3 = {
              temp: currentTemp,
              lastUpdated: lastFetchTime,
              minTemp: minTemp,
              maxTemp: maxTemp,
            };
            break;
        }
      }
    };

    updatePotData(0);
    updatePotData(1);
    updatePotData(2);
  }

  function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8," + csvHeaderString + "\n";
    allData.forEach((row) => {
      csvContent += row.join(";") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sensor_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onMount(() => {
    initializeHeaders(csvHeaderString);

    async function initialFetch() {
      await fetchData();
    }

    initialFetch();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  });

  let temperatureData = {
    temp: 0,
    lastUpdated: "1970-01-01 00:00:00",
    minTemp: 0,
    maxTemp: 0,
  };

  let windSpeedData = {
    speed: 0,
    lastUpdated: "1970-01-01 00:00:00",
    minSpeed: 0,
    maxSpeed: 0,
  };

  let solarIrradianceData = {
    irradiance: 0,
    lastUpdated: "1970-01-01 00:00:00",
    minIrradiance: 0,
    maxIrradiance: 0,
  };

  let potTemperatureData1 = {
    temp: 0,
    lastUpdated: "1970-01-01 00:00:00",
    minTemp: 0,
    maxTemp: 0,
  };

  let potTemperatureData2 = {
    temp: 0,
    lastUpdated: "1970-01-01 00:00:00",
    minTemp: 0,
    maxTemp: 0,
  };

  let potTemperatureData3 = {
    temp: 0,
    lastUpdated: "1970-01-01 00:00:00",
    minTemp: 0,
    maxTemp: 0,
  };

  function calculateMeasuringTime(firstTime, lastTime) {
    if (firstTime === "" || lastTime === "") {
      return `0 hours, 0 minutes, and 0 seconds`;
    }
    const firstDate = new Date(firstTime);
    const lastDate = new Date(lastTime);
    const diffTime = Math.abs(lastDate - firstDate);

    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    return `${diffHours} hours, ${diffMinutes} minutes, and ${diffSeconds} seconds`;
  }
</script>

<div
  class="flex flex-col justify-between p-4 mb-4 bg-transparent rounded shadow sm:flex-row"
>
  <p
    class="inline-block px-4 py-2 mb-2 text-sm text-white bg-blue-500 rounded transition-colors duration-300 sm:mb-0 sm:mr-2 hover:bg-violet-800"
  >
    First Measurement Time: {firstMeasurementTime
      ? firstMeasurementTime
      : "N/A"}
  </p>
  <p
    class="inline-block px-4 py-2 mb-2 text-sm text-white bg-blue-500 rounded transition-colors duration-300 sm:mb-0 sm:mr-2 hover:bg-violet-800"
  >
    Last Fetch Time: {lastFetchTime ? lastFetchTime : "N/A"}
  </p>
  <p
    class="inline-block px-4 py-2 text-sm text-white bg-blue-500 rounded transition-colors duration-300 hover:bg-violet-800"
  >
    Measuring Time: {calculateMeasuringTime(
      firstMeasurementTime,
      lastFetchTime
    )}
  </p>
</div>

<div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
  <OutsideTemperatureCard {temperatureData} />
  <WindSpeedCard {windSpeedData} />
  <SolarIrradianceCard {solarIrradianceData} />
  <PotTemperatureCard potTemperatureData={potTemperatureData1} index={0} />
  <PotTemperatureCard potTemperatureData={potTemperatureData2} index={1} />
  <PotTemperatureCard potTemperatureData={potTemperatureData3} index={2} />
</div>

<button
  on:click={exportToCSV}
  class="py-2 mx-4 mb-16 text-white bg-blue-500 rounded hover:bg-violet-800"
>
  Export to CSV
</button>
