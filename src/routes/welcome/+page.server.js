import { supabase } from "$lib/supabaseClient";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  const token = cookies.get("supabase_auth_token");
  let user = null;
  let errorMessage = null;

  if (token) {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
      errorMessage = error.message;
    } else if (data) {
      user = data.user;
    }
  } else {
    errorMessage = "No authentication token found.";
  }

  if (!user) {
    throw redirect(302, "/login");
  }

  return {
    user,
    errorMessage,
  };
}
