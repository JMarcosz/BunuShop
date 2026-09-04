import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as COOKIE_NAME } from "./auth_BXz4lFMk.mjs";
//#region src/pages/api/auth/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ cookies }) => {
	cookies.delete(COOKIE_NAME, { path: "/" });
	return new Response(JSON.stringify({
		success: true,
		message: "Sesión finalizada exitosamente."
	}), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "no-store"
		}
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/logout@_@ts
var page = () => logout_exports;
//#endregion
export { page };
