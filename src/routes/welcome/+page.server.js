// src/routes/welcome/+page.server.js
import { supabase } from '$lib/supabaseClient'; // Adjust the path if necessary

export async function load({ locals }) {
  const { user } = locals;

  if (!user) {
    return {
      status: 302,
      redirect: '/login',
    };
  }

  return {
    props: {
      user,
    },
  };
}
