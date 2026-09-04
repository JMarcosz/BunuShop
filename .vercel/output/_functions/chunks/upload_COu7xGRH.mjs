import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { r as uploadImage } from "./storage_v4dFKsne.mjs";
//#region src/pages/api/upload.ts
var upload_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	try {
		if (!(request.headers.get("content-type") || "").includes("multipart/form-data")) return new Response(JSON.stringify({ error: "Se requiere Content-Type: multipart/form-data" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const file = (await request.formData()).get("file");
		if (!file || !(file instanceof File)) return new Response(JSON.stringify({ error: "No se ha enviado ningún archivo en el campo \"file\"" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (!file.type.startsWith("image/")) return new Response(JSON.stringify({ error: "Solo se permiten archivos de imagen (PNG, JPG, WEBP, SVG)" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const url = await uploadImage(file, file.name);
		return new Response(JSON.stringify({
			success: true,
			url,
			name: file.name,
			size: file.size
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("Error en POST /api/upload:", err);
		return new Response(JSON.stringify({
			error: "Error al subir la imagen",
			details: err?.message
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/upload@_@ts
var page = () => upload_exports;
//#endregion
export { page };
