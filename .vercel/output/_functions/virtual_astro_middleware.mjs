import { M as defineMiddleware, t as sequence } from "./chunks/sequence_CxRXVYZ0.mjs";
import { c as verifySessionToken, t as COOKIE_NAME } from "./chunks/auth_BXz4lFMk.mjs";
//#region src/middleware.ts
function applySecurityHeaders(res, sensitive = false) {
	res.headers.set("X-Frame-Options", "SAMEORIGIN");
	res.headers.set("X-Content-Type-Options", "nosniff");
	res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	if (sensitive) {
		res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
		res.headers.set("Pragma", "no-cache");
	}
	return res;
}
var onRequest$1 = defineMiddleware(async (context, next) => {
	const { url, request, cookies, redirect } = context;
	const pathname = url.pathname;
	const isApi = pathname.startsWith("/api/");
	const isAdmin = pathname.startsWith("/admin");
	const sessionCookie = cookies.get(COOKIE_NAME);
	const session = verifySessionToken(sessionCookie?.value);
	if (isAdmin) {
		if (pathname === "/admin/login" || pathname === "/admin/login/") {
			if (session) return applySecurityHeaders(redirect("/admin"), true);
		} else {
			if (!session) return applySecurityHeaders(redirect("/admin/login"), true);
			context.locals.user = session;
		}
	}
	if (isApi) {
		const isAuthEndpoint = pathname.startsWith("/api/auth/");
		const isMutatingMethod = [
			"POST",
			"PUT",
			"DELETE",
			"PATCH"
		].includes(request.method);
		if (!isAuthEndpoint && isMutatingMethod) {
			if (!session) return applySecurityHeaders(new Response(JSON.stringify({
				success: false,
				error: "No autorizado. Se requiere inicio de sesión administrativo."
			}), {
				status: 401,
				headers: { "Content-Type": "application/json" }
			}), true);
		}
	}
	return applySecurityHeaders(await next(), isAdmin || isApi);
});
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
//#endregion
export { onRequest };
