<script>
  import { onMount } from "svelte";
  import "../../app.css";

  export let responseData = [];
  let allData = responseData;

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
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  onMount(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component destroy
  });
</script>

<p class="px-5 pt-10 mb-4 text-xl font-semibold">Data stream received:</p>

{#if allData && allData.length > 0}
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
            >Counter</th
          >
          <th
            class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
            >Year</th
          >
          <th
            class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
            >Month</th
          >
          <th
            class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
            >Day</th
          >
          <th
            class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
            >Hour</th
          >
          <th
            class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
            >Minute</th
          >
          <th
            class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
            >Second</th
          >
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
