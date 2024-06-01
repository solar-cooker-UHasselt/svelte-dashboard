// src/routes/api/set-auth-cookie/+server.js
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  const { token } = await request.json();

  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": `supabase_auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });
}
