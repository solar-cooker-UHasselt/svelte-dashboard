import { supabase } from "$lib/supabaseClient.js";

// Fetch all records from a specified table, optionally with filtering and ordering
export async function fetchAllFromTable(table, filters = {}, orderBy = { column: 'id', ascending: true }) {
  try {
    let query = supabase.from(table).select('*');

    // Apply filters
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }

    // Apply ordering
    if (orderBy.column) {
      query = query.order(orderBy.column, { ascending: orderBy.ascending });
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching data from ${table}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error fetching data:", error);
    return null;
  }
}

// Insert a new record into a specified table
export async function insertIntoTable(table, newRecord) {
  try {
    const { data, error } = await supabase.from(table).insert(newRecord);

    if (error) {
      console.error(`Error inserting data into ${table}:`, error);
      return {
        errorStatus: true,
        errorMessage: error.message,
      };
    }

    return {
      errorStatus: false,
      data,
    };
  } catch (error) {
    console.error("Unexpected error inserting data:", error);
    return {
      errorStatus: true,
      errorMessage: "An unexpected error occurred.",
    };
  }
}

// Update an existing record in a specified table
export async function updateTableRecord(table, recordId, updatedFields) {
  try {
    const { data, error } = await supabase
      .from(table)
      .update(updatedFields)
      .eq('id', recordId);

    if (error) {
      console.error(`Error updating data in ${table}:`, error);
      return {
        errorStatus: true,
        errorMessage: error.message,
      };
    }

    return {
      errorStatus: false,
      data,
    };
  } catch (error) {
    console.error("Unexpected error updating data:", error);
    return {
      errorStatus: true,
      errorMessage: "An unexpected error occurred.",
    };
  }
}

// Delete a record from a specified table
export async function deleteFromTable(table, recordId) {
  try {
    const { data, error } = await supabase.from(table).delete().eq('id', recordId);

    if (error) {
      console.error(`Error deleting data from ${table}:`, error);
      return {
        errorStatus: true,
        errorMessage: error.message,
      };
    }

    return {
      errorStatus: false,
      data,
    };
  } catch (error) {
    console.error("Unexpected error deleting data:", error);
    return {
      errorStatus: true,
      errorMessage: "An unexpected error occurred.",
    };
  }
}
