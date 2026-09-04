import fs from "node:fs/promises";
import nodePath from "node:path";
import { list, put } from "@vercel/blob";
//#region src/lib/storage.ts
var LOCAL_DATA_PATH = nodePath.resolve(process.cwd(), "src/data/portafolio.json");
var LOCAL_UPLOADS_DIR = nodePath.resolve(process.cwd(), "public/uploads");
/**
* Carga los datos del portafolio.
* Intenta leer desde Vercel Blob si el token está presente.
* Si no o en caso de error/desarrollo local, recurre al archivo JSON local.
*/
async function getPortfolioData() {
	if (Boolean(process.env.BLOB_READ_WRITE_TOKEN)) try {
		const { blobs } = await list({ prefix: "datos/portafolio.json" });
		const mainBlob = blobs.find((b) => b.pathname === "datos/portafolio.json") || blobs[0];
		if (mainBlob) {
			const res = await fetch(`${mainBlob.url}?t=${Date.now()}`);
			if (res.ok) return await res.json();
		}
	} catch (err) {
		console.warn("Advertencia al consultar Vercel Blob, usando fallback local:", err);
	}
	try {
		const raw = await fs.readFile(LOCAL_DATA_PATH, "utf-8");
		return JSON.parse(raw);
	} catch (err) {
		console.error("Error al leer datos locales:", err);
		throw err;
	}
}
/**
* Guarda los datos del portafolio.
* En producción (o si existe el token) guarda físicamente en Vercel Blob: datos/portafolio.json
* En desarrollo local guarda en src/data/portafolio.json.
*/
async function savePortfolioData(jsonData) {
	if (Boolean(process.env.BLOB_READ_WRITE_TOKEN)) try {
		const blob = await put("datos/portafolio.json", jsonData, {
			access: "public",
			addRandomSuffix: false
		});
		try {
			await fs.writeFile(LOCAL_DATA_PATH, jsonData, "utf-8");
		} catch {}
		return {
			url: blob.url,
			storage: "blob"
		};
	} catch (err) {
		console.error("Error al guardar en Vercel Blob:", err);
		await fs.writeFile(LOCAL_DATA_PATH, jsonData, "utf-8");
		return {
			url: "/data/portafolio.json",
			storage: "local"
		};
	}
	else {
		await fs.writeFile(LOCAL_DATA_PATH, jsonData, "utf-8");
		return {
			url: "/data/portafolio.json",
			storage: "local"
		};
	}
}
/**
* Sube una imagen a Vercel Blob (o a public/uploads/ si está en modo local)
*/
async function uploadImage(file, filename) {
	const hasToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
	const cleanName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
	if (hasToken) return (await put(`imagenes/${cleanName}`, file, {
		access: "public",
		addRandomSuffix: true
	})).url;
	else {
		await fs.mkdir(LOCAL_UPLOADS_DIR, { recursive: true });
		const buffer = Buffer.from(await file.arrayBuffer());
		const filePath = nodePath.join(LOCAL_UPLOADS_DIR, cleanName);
		await fs.writeFile(filePath, buffer);
		return `/uploads/${cleanName}`;
	}
}
//#endregion
export { savePortfolioData as n, uploadImage as r, getPortfolioData as t };
