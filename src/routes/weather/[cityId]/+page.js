import { fetchAllFromTable } from "../../../utils/database"; // Adjust as needed

export async function load({ params }) {
  const cityId = params.cityId;

  // Fetch city data from your database
  const city = await fetchAllFromTable('cities', { id: cityId });

  if (!city || city.length === 0) {
    return {
      status: 404,
      error: new Error('City not found'),
    };
  }

  const cityData = city[0];

  try {
    // Fetch weather data from OpenWeather API
    const apiKey = '1d720b1aa728c58e7b3529f02a73f789';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.latitude}&lon=${cityData.longitude}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const weatherData = await response.json();

    return {
        cityData,
        weatherData,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      status: 500,
      error: new Error('Failed to load weather data'),
    };
  }
}
