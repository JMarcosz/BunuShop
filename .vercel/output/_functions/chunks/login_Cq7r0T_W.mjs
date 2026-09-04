import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { S as createAstro, d as maybeRenderHead, f as renderHead, i as renderComponent, p as addAttribute, s as renderSlot, t as spreadAttributes, u as renderTemplate } from "./server__RVhoahn.mjs";
import { t as createComponent } from "./compiler_BnY_TNkt.mjs";
/* empty css                 */
//#region node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/.Layout.astro
createAstro("https://astro.build");
var $$Component = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Component;
	const size = Astro.props.size;
	const cls = Astro.props.class;
	const name = Astro.props.iconName;
	delete Astro.props.size;
	delete Astro.props.class;
	delete Astro.props.iconName;
	const props = Object.assign({
		"xmlns": "http://www.w3.org/2000/svg",
		"stroke-width": 2,
		"width": size ?? 24,
		"height": size ?? 24,
		"stroke": "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"fill": "none",
		"viewBox": "0 0 24 24"
	}, Astro.props);
	return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute([
		"lucide",
		{ [`lucide-${name}`]: name },
		cls
	], "class:list")}>${renderSlot($$result, $$slots["default"])}</svg>`;
}, "C:/Users/jeanm/Desktop/BunuShop/BunuShop/node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/.Layout.astro", void 0);
//#endregion
//#region node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/ArrowRight.astro
createAstro("https://astro.build");
var $$ArrowRight = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ArrowRight;
	return renderTemplate`${renderComponent($$result, "Layout", $$Component, {
		"iconName": "arrow-right",
		...Astro.props
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>` })}`;
}, "C:/Users/jeanm/Desktop/BunuShop/BunuShop/node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/ArrowRight.astro", void 0);
//#endregion
//#region node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/Eye.astro
createAstro("https://astro.build");
var $$Eye = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Eye;
	return renderTemplate`${renderComponent($$result, "Layout", $$Component, {
		"iconName": "eye",
		...Astro.props
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle>` })}`;
}, "C:/Users/jeanm/Desktop/BunuShop/BunuShop/node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/Eye.astro", void 0);
//#endregion
//#region node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/EyeOff.astro
createAstro("https://astro.build");
var $$EyeOff = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EyeOff;
	return renderTemplate`${renderComponent($$result, "Layout", $$Component, {
		"iconName": "eye-off",
		...Astro.props
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path><path d="m2 2 20 20"></path>` })}`;
}, "C:/Users/jeanm/Desktop/BunuShop/BunuShop/node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/EyeOff.astro", void 0);
//#endregion
//#region node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/Key.astro
createAstro("https://astro.build");
var $$Key = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Key;
	return renderTemplate`${renderComponent($$result, "Layout", $$Component, {
		"iconName": "key",
		...Astro.props
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"></path><path d="m21 2-9.6 9.6"></path><circle cx="7.5" cy="15.5" r="5.5"></circle>` })}`;
}, "C:/Users/jeanm/Desktop/BunuShop/BunuShop/node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/Key.astro", void 0);
//#endregion
//#region node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/Lock.astro
createAstro("https://astro.build");
var $$Lock = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Lock;
	return renderTemplate`${renderComponent($$result, "Layout", $$Component, {
		"iconName": "lock",
		...Astro.props
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>` })}`;
}, "C:/Users/jeanm/Desktop/BunuShop/BunuShop/node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/Lock.astro", void 0);
//#endregion
//#region node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/Mail.astro
createAstro("https://astro.build");
var $$Mail = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Mail;
	return renderTemplate`${renderComponent($$result, "Layout", $$Component, {
		"iconName": "mail",
		...Astro.props
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect>` })}`;
}, "C:/Users/jeanm/Desktop/BunuShop/BunuShop/node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/Mail.astro", void 0);
//#endregion
//#region node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/ShieldCheck.astro
createAstro("https://astro.build");
var $$ShieldCheck = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ShieldCheck;
	return renderTemplate`${renderComponent($$result, "Layout", $$Component, {
		"iconName": "shield-check",
		...Astro.props
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path>` })}`;
}, "C:/Users/jeanm/Desktop/BunuShop/BunuShop/node_modules/.pnpm/lucide-astro@0.556.0_astro@_774bae43f7b7b37ddf1eb29b8786bd12/node_modules/lucide-astro/dist/ShieldCheck.astro", void 0);
//#endregion
//#region src/pages/admin/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Login = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es" data-astro-cid-xeimgta2><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><title>Iniciar Sesión - Accesorios Bunu Shop CMS</title><!-- Google Fonts: Outfit & Plus Jakarta Sans --><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead($$result)}</head><body class="bg-brand-lightBg min-h-screen flex items-center justify-center p-4 selection:bg-brand-pink selection:text-white relative overflow-hidden" data-astro-cid-xeimgta2><!-- Decorative Background Blurs --><div class="absolute -top-32 -left-32 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" data-astro-cid-xeimgta2></div><div class="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-lavender/15 rounded-full blur-3xl pointer-events-none" data-astro-cid-xeimgta2></div><div class="w-full max-w-md relative z-10" data-astro-cid-xeimgta2><!-- Main Login Card --><div class="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-pink-100 flex flex-col items-center" data-astro-cid-xeimgta2><!-- Brand Logo & Header --><div class="flex flex-col items-center text-center mb-8" data-astro-cid-xeimgta2><div class="relative mb-3" data-astro-cid-xeimgta2><img src="/images/bunu/logo.jpg" alt="Bunu Shop Logo" class="w-20 h-20 rounded-full object-cover shadow-md border-2 border-brand-pink/40" data-astro-cid-xeimgta2><div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-darkNavy text-white flex items-center justify-center shadow" data-astro-cid-xeimgta2>${renderComponent($$result, "Lock", $$Lock, {
		"class": "w-3 h-3 text-pink-300",
		"data-astro-cid-xeimgta2": true
	})}</div></div><h1 class="text-2xl font-bold font-display text-slate-900 tracking-tight" data-astro-cid-xeimgta2>BUNU SHOP</h1><p class="text-xs text-brand-pink font-semibold uppercase tracking-wider mt-0.5" data-astro-cid-xeimgta2>Admin Studio CMS</p><p class="text-xs text-slate-500 mt-2 max-w-xs" data-astro-cid-xeimgta2>Ingresa tus credenciales para gestionar el catálogo y contenidos de la tienda.</p></div><!-- Alert Box for Errors --><div id="alert-box" class="hidden w-full mb-5 p-3.5 rounded-xl text-xs font-semibold flex items-start gap-2.5 transition-all" data-astro-cid-xeimgta2><span id="alert-icon-container" class="mt-0.5 shrink-0" data-astro-cid-xeimgta2><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-xeimgta2><circle cx="12" cy="12" r="10" data-astro-cid-xeimgta2></circle><line x1="12" x2="12" y1="8" y2="12" data-astro-cid-xeimgta2></line><line x1="12" x2="12.01" y1="16" y2="16" data-astro-cid-xeimgta2></line></svg></span><span id="alert-msg" data-astro-cid-xeimgta2></span></div><!-- Login Form --><form id="login-form" class="w-full space-y-4" data-astro-cid-xeimgta2><!-- Email Field --><div class="space-y-1.5" data-astro-cid-xeimgta2><label for="email" class="block text-xs font-semibold text-slate-700" data-astro-cid-xeimgta2>Correo Electrónico</label><div class="relative" data-astro-cid-xeimgta2>${renderComponent($$result, "Mail", $$Mail, {
		"class": "w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400",
		"data-astro-cid-xeimgta2": true
	})}<input type="email" id="email" name="email" required autocomplete="email" placeholder="accesoriosbunushop@gmail.com" class="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all" data-astro-cid-xeimgta2></div></div><!-- Password Field --><div class="space-y-1.5" data-astro-cid-xeimgta2><label for="password" class="block text-xs font-semibold text-slate-700" data-astro-cid-xeimgta2>Contraseña</label><div class="relative" data-astro-cid-xeimgta2>${renderComponent($$result, "Key", $$Key, {
		"class": "w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400",
		"data-astro-cid-xeimgta2": true
	})}<input type="password" id="password" name="password" required autocomplete="current-password" placeholder="••••••••••••" class="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all" data-astro-cid-xeimgta2><button type="button" id="toggle-pass" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1 focus:outline-none flex items-center justify-center" title="Mostrar u ocultar contraseña" data-astro-cid-xeimgta2>${renderComponent($$result, "Eye", $$Eye, {
		"class": "w-4 h-4",
		"id": "toggle-icon-eye",
		"data-astro-cid-xeimgta2": true
	})}${renderComponent($$result, "EyeOff", $$EyeOff, {
		"class": "w-4 h-4 hidden",
		"id": "toggle-icon-eye-off",
		"data-astro-cid-xeimgta2": true
	})}</button></div></div><!-- Submit Button --><button type="submit" id="submit-btn" class="w-full mt-2 py-3 px-4 rounded-xl bg-brand-pink hover:bg-brand-pinkHover text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-brand-pink/25 transition-all flex items-center justify-center gap-2" data-astro-cid-xeimgta2><span id="submit-label" data-astro-cid-xeimgta2>Acceder al Panel</span>${renderComponent($$result, "ArrowRight", $$ArrowRight, {
		"class": "w-4 h-4",
		"id": "submit-arrow",
		"data-astro-cid-xeimgta2": true
	})}</button></form><!-- Security Notice --><div class="mt-8 pt-5 border-t border-slate-100 w-full text-center" data-astro-cid-xeimgta2><p class="text-[11px] text-slate-400 flex items-center justify-center gap-1.5" data-astro-cid-xeimgta2>${renderComponent($$result, "ShieldCheck", $$ShieldCheck, {
		"class": "w-3.5 h-3.5 text-brand-pink",
		"data-astro-cid-xeimgta2": true
	})}<span data-astro-cid-xeimgta2>Protegido con HMAC-SHA256 y Rate Limiting</span></p><a href="/" class="mt-3 inline-block text-xs text-slate-500 hover:text-brand-pink font-semibold transition-colors" data-astro-cid-xeimgta2>← Volver a la Tienda Pública</a></div></div></div><script>
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('login-form');
      const submitBtn = document.getElementById('submit-btn');
      const emailInput = document.getElementById('email');
      const passInput = document.getElementById('password');
      const toggleBtn = document.getElementById('toggle-pass');
      const eyeIcon = document.getElementById('toggle-icon-eye');
      const eyeOffIcon = document.getElementById('toggle-icon-eye-off');
      const alertBox = document.getElementById('alert-box');
      const alertMsg = document.getElementById('alert-msg');
      const alertIconContainer = document.getElementById('alert-icon-container');

      // Toggle password visibility
      if (toggleBtn && passInput && eyeIcon && eyeOffIcon) {
        toggleBtn.addEventListener('click', () => {
          if (passInput.type === 'password') {
            passInput.type = 'text';
            eyeIcon.classList.add('hidden');
            eyeOffIcon.classList.remove('hidden');
          } else {
            passInput.type = 'password';
            eyeIcon.classList.remove('hidden');
            eyeOffIcon.classList.add('hidden');
          }
        });
      }

      function showAlert(msg, isRateLimit = false) {
        alertMsg.textContent = msg;
        alertBox.classList.remove('hidden');

        if (isRateLimit) {
          alertBox.className = 'w-full mb-5 p-3.5 rounded-xl text-xs font-semibold flex items-start gap-2.5 bg-amber-50 text-amber-800 border border-amber-200';
          alertIconContainer.innerHTML = '<svg class="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
        } else {
          alertBox.className = 'w-full mb-5 p-3.5 rounded-xl text-xs font-semibold flex items-start gap-2.5 bg-rose-50 text-rose-800 border border-rose-200';
          alertIconContainer.innerHTML = '<svg class="w-4 h-4 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>';
        }
      }

      function hideAlert() {
        alertBox.classList.add('hidden');
      }

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideAlert();

        const email = emailInput.value.trim();
        const password = passInput.value;

        if (!email || !password) {
          showAlert('Por favor completa todos los campos.');
          return;
        }

        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = \`<svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg><span>Verificando...</span>\`;

        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });

          const data = await res.json();

          if (res.ok && data.success) {
            submitBtn.innerHTML = \`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>¡Acceso Concedido!</span>\`;
            submitBtn.classList.remove('bg-brand-pink');
            submitBtn.classList.add('bg-emerald-600');
            // Redirigir al panel de administración
            window.location.href = '/admin';
          } else {
            const isRateLimit = res.status === 429;
            showAlert(data.error || 'Credenciales incorrectas.', isRateLimit);
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        } catch (err) {
          console.error('Error al iniciar sesión:', err);
          showAlert('Error de conexión con el servidor. Intenta de nuevo.');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      });
    });
  <\/script></body></html>`;
}, "C:/Users/jeanm/Desktop/BunuShop/BunuShop/src/pages/admin/login.astro", void 0);
var $$file = "C:/Users/jeanm/Desktop/BunuShop/BunuShop/src/pages/admin/login.astro";
var $$url = "/admin/login";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
