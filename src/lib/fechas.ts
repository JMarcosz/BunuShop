/**
 * Los artículos guardan la fecha como texto de visualización ("MARZO 2024"),
 * que no sirve ni para schema.org datePublished, ni para <time datetime>, ni
 * para el <lastmod> de un sitemap: los tres exigen ISO 8601.
 *
 * Esta función traduce ese formato a ISO. Devuelve null si no reconoce la
 * entrada, para que quien la use decida omitir el dato en lugar de publicar
 * una fecha inválida.
 */
const MESES: Record<string, string> = {
  enero: '01',
  febrero: '02',
  marzo: '03',
  abril: '04',
  mayo: '05',
  junio: '06',
  julio: '07',
  agosto: '08',
  septiembre: '09',
  setiembre: '09',
  octubre: '10',
  noviembre: '11',
  diciembre: '12',
};

export function aFechaISO(valor: unknown): string | null {
  if (typeof valor !== 'string' || !valor.trim()) return null;

  const texto = valor.trim();

  // Ya viene en ISO (2024-03-01, con o sin hora): tomamos la parte de fecha.
  const iso = texto.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;

  // Formato "MARZO 2024" / "Marzo 2024" / "marzo de 2024".
  // Ningún mes en español lleva tilde, así que no hace falta normalizar.
  const partes = texto.toLowerCase().match(/([a-z]+)\s+(?:de\s+)?(\d{4})/);
  if (partes) {
    const mes = MESES[partes[1]];
    if (mes) return `${partes[2]}-${mes}-01`;
  }

  return null;
}
