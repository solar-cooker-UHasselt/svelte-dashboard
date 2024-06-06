<script>
  import { onMount } from "svelte";
  import "../../app.css";

  export let responseData = [];
  let allData = responseData;
  let columnData = [];
  let maxValues = [];
  let minValues = [];
  let headers = [];
  let lastFetchTime = "";

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

  onMount(() => {
    initializeHeaders(csvHeaderString);

    async function initialFetch() {
      await fetchData();
    }

    initialFetch();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  });
</script>

<p class="px-5 pt-10 mb-4 text-xl font-semibold">Data stream received:</p>

<p class="mt-4 text-lg">Last Data Fetch: {lastFetchTime}</p>

<p>min and max values</p>

{#if allData && allData.length > 0}
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-transparent">
        <tr>
          {#each maxValues as maxValue}
            <th
              class="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase"
              >{maxValue}</th
            >
          {/each}
        </tr>
        <tr>
          {#each minValues as minValue}
            <th
              class="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase"
              >{minValue}</th
            >
          {/each}
        </tr>
        <tr class="bg-gray-50">
          {#each headers as header}
            <th
              class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
              >{header}</th
            >
          {/each}
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-transpartent">
        {#each [...allData].reverse() as row}
          <tr>
            {#each row as cell}
              <td
                class="px-6 py-4 text-sm text-center text-white whitespace-nowrap"
                >{cell}</td
              >
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p class="text-center text-red-500">No data received yet!</p>
{/if}
