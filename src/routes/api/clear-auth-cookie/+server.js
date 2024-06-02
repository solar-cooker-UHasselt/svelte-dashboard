// src/routes/api/clear-auth-cookie/+server.js
export async function POST() {
  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie":
        "supabase_auth_token=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    },
  });
}
