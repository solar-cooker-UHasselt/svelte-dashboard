import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, url }) {
  const token = cookies.get("supabase_auth_token");

  // If the token exists and the user is on the login page, redirect to the welcome page
  if (token && url.pathname === "/login") {
    throw redirect(302, "/account");
  }

  // Return any necessary props (empty in this case)
  return {};
}
