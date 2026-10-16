/**
 * Routes drawn over the globe. Each live attack becomes a route that fades in,
 * travels for a while and fades out, so the lines keep alternating.
 */

export const MAX_ROUTES = 6;
export const ROUTE_LIFETIME_MS = 15000;
export const ROUTE_FADE_MS = 1300;

const COUNTRY_COORDINATES = {
  Brazil: { lat: -14.235, lon: -51.9253 },
  "United States": { lat: 37.0902, lon: -95.7129 },
  Germany: { lat: 51.1657, lon: 10.4515 },
  "United Kingdom": { lat: 55.3781, lon: -3.436 },
  France: { lat: 46.2276, lon: 2.2137 },
  Japan: { lat: 36.2048, lon: 138.2529 },
  China: { lat: 35.8617, lon: 104.1954 },
  Russia: { lat: 61.524, lon: 105.3188 },
  Canada: { lat: 56.1304, lon: -106.3468 },
  Australia: { lat: -25.2744, lon: 133.7751 },
  "South Korea": { lat: 35.9078, lon: 127.7669 },
  India: { lat: 20.5937, lon: 78.9629 },
};

function point(country) {
  const coordinates = COUNTRY_COORDINATES[country];
  return coordinates ? { name: country, ...coordinates } : null;
}

/** Turns a live attack event into a globe route (or null if a country is unknown). */
export function buildRoute(event, now = Date.now()) {
  const origin = point(event?.attackerCountry);
  const destination = point(event?.targetCountry);

  if (!origin || !destination) return null;

  return {
    id: `${now}-${origin.name}-${destination.name}-${Math.random().toString(36).slice(2, 7)}`,
    type: event.result === "SUCCESS" ? "attack" : "defense",
    origin,
    destination,
    speed: 0.16 + Math.random() * 0.05,
    offset: 0,
    born: now,
  };
}

/** A few routes already on screen when the dashboard opens. */
export function buildSeedRoutes(now = Date.now()) {
  const seeds = [
    ["China", "Brazil", "attack", 4000],
    ["Russia", "United States", "attack", 1500],
    ["Brazil", "Germany", "defense", 0],
    ["Japan", "Australia", "protected", 6000],
  ];

  return seeds.map(([from, to, type, age], index) => ({
    id: `seed-${from}-${to}`,
    type,
    origin: point(from),
    destination: point(to),
    speed: 0.14 + index * 0.012,
    offset: 0.1 + index * 0.2,
    born: now - age,
  }));
}

export function pruneRoutes(routes, now = Date.now()) {
  const alive = routes.filter((route) => now - route.born < ROUTE_LIFETIME_MS);
  return alive.length === routes.length ? routes : alive;
}
