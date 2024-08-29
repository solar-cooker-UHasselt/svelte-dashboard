// src/routes/location-overview/+page.js
import { fetchAllFromTable } from "../../utils/database.js";

export async function load() {
  // Fetch cities sorted by country and then by name
  const cities = await fetchAllFromTable('cities', {}, { column: 'country_name', ascending: true });

  if (!cities) {
    console.warn('No cities were fetched from the database.');
    return { cities: [], countries: [] };
  }

  // Ensure each city has a country_name and country_code
  cities.forEach(city => {
    if (!city.country_name) {
      city.country_name = "Unknown Country";
    }
    if (!city.country_code) {
      city.country_code = "XX"; // XX as a placeholder code
    }
  });

  // Extract unique countries from the cities with both country_code and country_name
  const countries = Array.from(
    new Set(cities.map(city => JSON.stringify({
      country_code: city.country_code,
      country_name: city.country_name
    })))
  ).map(country => JSON.parse(country));

  return { cities, countries };
}
