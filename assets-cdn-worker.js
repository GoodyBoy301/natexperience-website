export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (!response.ok) return response;

    const headers = new Headers(response.headers);
    headers.set("cache-control", "public, max-age=3600, s-maxage=86400");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
