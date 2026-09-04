import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { S as createAstro } from "./server__RVhoahn.mjs";
import { t as createComponent } from "./compiler_BnY_TNkt.mjs";
//#region src/pages/portafolio.astro
var portafolio_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Portafolio,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Portafolio = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Portafolio;
	return Astro.redirect("/#galeria");
}, "C:/Users/jeanm/Desktop/BunuShop/BunuShop/src/pages/portafolio.astro", void 0);
var $$file = "C:/Users/jeanm/Desktop/BunuShop/BunuShop/src/pages/portafolio.astro";
var $$url = "/portafolio";
//#endregion
//#region \0virtual:astro:page:src/pages/portafolio@_@astro
var page = () => portafolio_exports;
//#endregion
export { page };
