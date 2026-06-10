// Genera URLs de imagen optimizadas vía wsrv.nl (proxy CDN gratuito):
// redimensiona al ancho indicado, convierte a WebP y cachea en CDN.
// Las rutas locales (assets bundleados) se devuelven sin tocar.
const CDN_BASE = "https://wsrv.nl/";

export const optimized = (url, width) => {
  if (!url || typeof url !== "string" || !url.startsWith("http")) return url;
  const params = new URLSearchParams({
    url,
    w: String(width),
    output: "webp",
    q: "80",
  });
  return `${CDN_BASE}?${params.toString()}`;
};

// srcSet con variante 2x para pantallas retina
export const optimizedSrcSet = (url, width) => {
  if (!url || typeof url !== "string" || !url.startsWith("http")) return undefined;
  return `${optimized(url, width)} 1x, ${optimized(url, width * 2)} 2x`;
};

// onError handler: si wsrv.nl no responde, volvemos a la URL original (S3)
// para que las imágenes nunca queden rotas por culpa del proxy.
export const fallbackToOriginal = (url) => (event) => {
  const img = event.currentTarget;
  if (url && typeof url === "string" && url.startsWith("http") && img.src !== url) {
    img.srcset = "";
    img.src = url;
  }
};
