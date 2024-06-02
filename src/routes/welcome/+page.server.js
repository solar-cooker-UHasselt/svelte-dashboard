import { supabase } from "$lib/supabaseClient";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  const token = cookies.get("supabase_auth_token");
  let user = null;
  let userProfile = null;
  let errorMessage = null;

  if (token) {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
      errorMessage = error.message;
    } else if (data) {
      user = data.user;
      
      // Fetch user profile from the profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        errorMessage = profileError.message;
      } else {
        userProfile = profileData;
      }
    }
  } else {
    errorMessage = "No authentication token found.";
  }

  if (!user) {
    throw redirect(302, "/login");
  }

  return {
    user,
    userProfile,
    errorMessage,
  };
}
