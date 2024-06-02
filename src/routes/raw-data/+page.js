export async function load({ fetch }) {
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
    return { responseData: result.receivedData }; // Return the received data
  } catch (error) {
    return { responseData: { error: "Failed to fetch data" } };
  }
}
