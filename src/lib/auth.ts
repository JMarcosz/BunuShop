import crypto from 'node:crypto';

// Duración de la sesión: 8 horas
export const SESSION_DURATION_SECONDS = 8 * 60 * 60;
export const COOKIE_NAME = 'bunu_admin_session';

export interface SessionPayload {
  email: string;
  iat: number;
  exp: number;
}

/**
 * Obtiene las credenciales estándar y la clave secreta desde variables de entorno o valores seguros por defecto.
 */
export function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL || 'accesoriosbunushop@gmail.com';
  const password = process.env.ADMIN_PASSWORD || 'BunuShop2024!Admin';
  const secret = process.env.AUTH_SECRET || 'bunu_shop_secure_auth_secret_key_2024_x9f8e7d6c5b4a3';
  return { email, password, secret };
}

/**
 * Comparación en tiempo constante para neutralizar ataques de canal lateral (Timing Attacks).
 * Hashing previo con SHA-256 asegura que ambos buffers tengan exactamente la misma longitud.
 */
export function safeCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Valida credenciales contra las variables de entorno de forma segura.
 */
export function verifyCredentials(inputEmail: string, inputPass: string): boolean {
  const { email: adminEmail, password: adminPassword } = getAdminCredentials();
  const emailValid = safeCompare(inputEmail.trim().toLowerCase(), adminEmail.trim().toLowerCase());
  const passValid = safeCompare(inputPass, adminPassword);
  return emailValid && passValid;
}

/**
 * Genera un token de sesión criptográfico firmado con HMAC-SHA256.
 */
export function createSessionToken(email: string): string {
  const { secret } = getAdminCredentials();
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    email: email.trim().toLowerCase(),
    iat: now,
    exp: now + SESSION_DURATION_SECONDS
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
  return `${payloadB64}.${signature}`;
}

/**
 * Verifica la firma y expiración del token de sesión.
 */
export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;
  const { secret } = getAdminCredentials();
  const expectedSig = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');

  // Comparación en tiempo constante de la firma
  const sigHash = crypto.createHash('sha256').update(signature).digest();
  const expHash = crypto.createHash('sha256').update(expectedSig).digest();
  if (!crypto.timingSafeEqual(sigHash, expHash)) {
    return null;
  }

  try {
    const payload: SessionPayload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Sesión expirada
    }
    return payload;
  } catch {
    return null;
  }
}

// ----------------------------------------------------------------------------
// Rate Limiting en memoria para defensa contra ataques de fuerza bruta
// ----------------------------------------------------------------------------
interface RateLimitRecord {
  attempts: number;
  resetTime: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();
const MAX_ATTEMPTS = 5;
const WINDOW_SECONDS = 60;

/**
 * Verifica si una dirección IP ha superado el límite de intentos fallidos.
 */
export function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record || now > record.resetTime) {
    return { allowed: true, retryAfter: 0 };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter: Math.max(1, retryAfter) };
  }

  return { allowed: true, retryAfter: 0 };
}

/**
 * Registra un intento fallido para la IP especificada.
 */
export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record || now > record.resetTime) {
    loginAttempts.set(ip, { attempts: 1, resetTime: now + WINDOW_SECONDS * 1000 });
  } else {
    record.attempts += 1;
  }
}

/**
 * Restablece el contador de intentos al autenticarse exitosamente.
 */
export function resetRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}

/**
 * Devuelve opciones seguras para la cookie de sesión.
 */
export function getSessionCookieOptions(isProd: boolean) {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_DURATION_SECONDS
  };
}
