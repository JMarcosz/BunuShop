import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { n as savePortfolioData, t as getPortfolioData } from "./storage_v4dFKsne.mjs";
//#region src/pages/api/portafolio.ts
var portafolio_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async () => {
	try {
		const data = await getPortfolioData();
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-cache, no-store, must-revalidate"
			}
		});
	} catch (err) {
		return new Response(JSON.stringify({
			error: "Error al obtener datos del portafolio",
			details: err?.message
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var POST = async ({ request }) => {
	try {
		const jsonData = await request.text();
		if (!jsonData) return new Response(JSON.stringify({ error: "El contenido JSON no puede estar vacío" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		try {
			JSON.parse(jsonData);
		} catch {
			return new Response(JSON.stringify({ error: "Formato JSON inválido" }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}
		const result = await savePortfolioData(jsonData);
		return new Response(JSON.stringify({
			success: true,
			url: result.url,
			storage: result.storage,
			message: result.storage === "blob" ? "Datos sincronizados exitosamente en Vercel Blob." : "Datos guardados localmente (configura BLOB_READ_WRITE_TOKEN en Vercel para sincronización en la nube)."
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("Error en POST /api/portafolio:", err);
		return new Response(JSON.stringify({
			error: "Error al guardar datos del portafolio",
			details: err?.message
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/portafolio@_@ts
var page = () => portafolio_exports;
//#endregion
export { page };
