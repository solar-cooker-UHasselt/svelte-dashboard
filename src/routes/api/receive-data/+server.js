import pkg from "papaparse";
const { parse } = pkg;

let allData = []; // Store all incoming data

export async function POST({ request }) {
  try {
    const csvData = await request.text(); // Get CSV data as text

    // Parse CSV data
    const parsedData = parse(csvData, { header: false }); // Set header to false if there is no header row

    // Append parsed data to allData
    allData.push(...parsedData.data);

    const responseBody = {
      message: "CSV data received successfully",
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid CSV data" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function GET() {
  try {
    const responseBody = {
      message: "Current data",
      receivedData: allData, // Return all received data
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
