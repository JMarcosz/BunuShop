import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { a as recordFailedAttempt, i as getSessionCookieOptions, n as checkRateLimit, o as resetRateLimit, r as createSessionToken, s as verifyCredentials, t as COOKIE_NAME } from "./auth_BXz4lFMk.mjs";
//#region src/pages/api/auth/login.ts
var login_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
function getClientIp(request) {
	const forwarded = request.headers.get("x-forwarded-for");
	if (forwarded) return forwarded.split(",")[0].trim();
	return request.headers.get("x-real-ip") || "127.0.0.1";
}
var POST = async ({ request, cookies }) => {
	const ip = getClientIp(request);
	const rateLimit = checkRateLimit(ip);
	if (!rateLimit.allowed) return new Response(JSON.stringify({
		success: false,
		error: `Demasiados intentos fallidos. Por seguridad, espera ${rateLimit.retryAfter} segundos antes de intentar nuevamente.`
	}), {
		status: 429,
		headers: {
			"Content-Type": "application/json",
			"Retry-After": String(rateLimit.retryAfter),
			"Cache-Control": "no-store"
		}
	});
	let email = "";
	let password = "";
	try {
		const body = await request.json();
		email = String(body.email || "").trim();
		password = String(body.password || "");
	} catch {
		return new Response(JSON.stringify({
			success: false,
			error: "Formato de petición inválido."
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
	if (!email || !password) return new Response(JSON.stringify({
		success: false,
		error: "Por favor ingresa correo y contraseña."
	}), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	if (!verifyCredentials(email, password)) {
		recordFailedAttempt(ip);
		return new Response(JSON.stringify({
			success: false,
			error: "Credenciales incorrectas."
		}), {
			status: 401,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			}
		});
	}
	resetRateLimit(ip);
	const token = createSessionToken(email);
	cookies.set(COOKIE_NAME, token, getSessionCookieOptions(true));
	return new Response(JSON.stringify({
		success: true,
		message: "Sesión iniciada correctamente."
	}), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "no-store"
		}
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/login@_@ts
var page = () => login_exports;
//#endregion
export { page };
