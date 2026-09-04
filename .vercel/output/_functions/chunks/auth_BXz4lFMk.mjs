import crypto from "node:crypto";
//#region src/lib/auth.ts
var SESSION_DURATION_SECONDS = 28800;
var COOKIE_NAME = "bunu_admin_session";
/**
* Obtiene las credenciales estándar y la clave secreta desde variables de entorno o valores seguros por defecto.
*/
function getAdminCredentials() {
	return {
		email: process.env.ADMIN_EMAIL || "accesoriosbunushop@gmail.com",
		password: process.env.ADMIN_PASSWORD || "BunuShop2024!Admin",
		secret: process.env.AUTH_SECRET || "bunu_shop_secure_auth_secret_key_2024_x9f8e7d6c5b4a3"
	};
}
/**
* Comparación en tiempo constante para neutralizar ataques de canal lateral (Timing Attacks).
* Hashing previo con SHA-256 asegura que ambos buffers tengan exactamente la misma longitud.
*/
function safeCompare(a, b) {
	if (typeof a !== "string" || typeof b !== "string") return false;
	const hashA = crypto.createHash("sha256").update(a).digest();
	const hashB = crypto.createHash("sha256").update(b).digest();
	return crypto.timingSafeEqual(hashA, hashB);
}
/**
* Valida credenciales contra las variables de entorno de forma segura.
*/
function verifyCredentials(inputEmail, inputPass) {
	const { email: adminEmail, password: adminPassword } = getAdminCredentials();
	const emailValid = safeCompare(inputEmail.trim().toLowerCase(), adminEmail.trim().toLowerCase());
	const passValid = safeCompare(inputPass, adminPassword);
	return emailValid && passValid;
}
/**
* Genera un token de sesión criptográfico firmado con HMAC-SHA256.
*/
function createSessionToken(email) {
	const { secret } = getAdminCredentials();
	const now = Math.floor(Date.now() / 1e3);
	const payload = {
		email: email.trim().toLowerCase(),
		iat: now,
		exp: now + SESSION_DURATION_SECONDS
	};
	const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
	return `${payloadB64}.${crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url")}`;
}
/**
* Verifica la firma y expiración del token de sesión.
*/
function verifySessionToken(token) {
	if (!token || typeof token !== "string") return null;
	const parts = token.split(".");
	if (parts.length !== 2) return null;
	const [payloadB64, signature] = parts;
	const { secret } = getAdminCredentials();
	const expectedSig = crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");
	const sigHash = crypto.createHash("sha256").update(signature).digest();
	const expHash = crypto.createHash("sha256").update(expectedSig).digest();
	if (!crypto.timingSafeEqual(sigHash, expHash)) return null;
	try {
		const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf-8"));
		const now = Math.floor(Date.now() / 1e3);
		if (payload.exp && payload.exp < now) return null;
		return payload;
	} catch {
		return null;
	}
}
var loginAttempts = /* @__PURE__ */ new Map();
var MAX_ATTEMPTS = 5;
var WINDOW_SECONDS = 60;
/**
* Verifica si una dirección IP ha superado el límite de intentos fallidos.
*/
function checkRateLimit(ip) {
	const now = Date.now();
	const record = loginAttempts.get(ip);
	if (!record || now > record.resetTime) return {
		allowed: true,
		retryAfter: 0
	};
	if (record.attempts >= MAX_ATTEMPTS) {
		const retryAfter = Math.ceil((record.resetTime - now) / 1e3);
		return {
			allowed: false,
			retryAfter: Math.max(1, retryAfter)
		};
	}
	return {
		allowed: true,
		retryAfter: 0
	};
}
/**
* Registra un intento fallido para la IP especificada.
*/
function recordFailedAttempt(ip) {
	const now = Date.now();
	const record = loginAttempts.get(ip);
	if (!record || now > record.resetTime) loginAttempts.set(ip, {
		attempts: 1,
		resetTime: now + WINDOW_SECONDS * 1e3
	});
	else record.attempts += 1;
}
/**
* Restablece el contador de intentos al autenticarse exitosamente.
*/
function resetRateLimit(ip) {
	loginAttempts.delete(ip);
}
/**
* Devuelve opciones seguras para la cookie de sesión.
*/
function getSessionCookieOptions(isProd) {
	return {
		httpOnly: true,
		secure: isProd,
		sameSite: "lax",
		path: "/",
		maxAge: SESSION_DURATION_SECONDS
	};
}
//#endregion
export { recordFailedAttempt as a, verifySessionToken as c, getSessionCookieOptions as i, checkRateLimit as n, resetRateLimit as o, createSessionToken as r, verifyCredentials as s, COOKIE_NAME as t };
