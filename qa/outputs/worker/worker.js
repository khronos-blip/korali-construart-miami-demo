// worker.js
var PREFIX = "/demos/construart-miami";
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === PREFIX || url.pathname === `${PREFIX}/`) {
      url.pathname = "/index.html";
    } else if (url.pathname.startsWith(`${PREFIX}/`)) {
      url.pathname = url.pathname.slice(PREFIX.length);
    } else {
      return new Response("Not found", { status: 404 });
    }
    const assetResponse = await env.ASSETS.fetch(new Request(url.toString(), request));
    const response = new Response(assetResponse.body, assetResponse);
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    response.headers.set("Content-Security-Policy", "default-src 'self'; img-src 'self'; style-src 'self'; script-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'");
    return response;
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
