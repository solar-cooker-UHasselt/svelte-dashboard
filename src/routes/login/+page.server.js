/** @type {import('./$types').PageServerLoad} */
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export async function load() {
  // const response = await supabase.from("vrienden").select();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // return {
  //   aantal: response.data.length,
  //   mensen: JSON.stringify(response.data),
  // };
}
