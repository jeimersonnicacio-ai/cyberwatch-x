import { useEffect, useState } from "react";
import { generateAttack } from "../data/attacks";
import { analyzeAttack } from "../services/aiAttackAnalyzer";
import {
  MAX_ROUTES,
  buildRoute,
  buildSeedRoutes,
  pruneRoutes,
} from "../services/globeRoutes";

const CYCLE_MS = 9000;
const PRUNE_MS = 1000;
const MAX_FEED = 6;

function buildEvent() {
  return analyzeAttack(generateAttack());
}

export default function useLiveAttackFeed() {
  const [current, setCurrent] = useState(() => buildEvent());
  const [feed, setFeed] = useState(() => [current]);
  const [routes, setRoutes] = useState(() => buildSeedRoutes());

  const [totals, setTotals] = useState({
    attacks: 24871,
    defense: 19642,
    protected: 17908,
  });

  useEffect(() => {
    const cycle = setInterval(() => {
      const next = buildEvent();
      const route = buildRoute(next);
      const blocked = next.result === "FAILED";

      setCurrent(next);
      setFeed((items) => [next, ...items].slice(0, MAX_FEED));

      if (route) {
        setRoutes((items) => [route, ...items].slice(0, MAX_ROUTES));
      }

      setTotals((values) => ({
        attacks: values.attacks + Math.floor(Math.random() * 6) + 1,
        defense: values.defense + (blocked ? Math.floor(Math.random() * 4) + 1 : 0),
        protected: values.protected + (blocked ? Math.floor(Math.random() * 3) + 1 : 0),
      }));
    }, CYCLE_MS);

    const prune = setInterval(() => {
      setRoutes((items) => pruneRoutes(items));
    }, PRUNE_MS);

    return () => {
      clearInterval(cycle);
      clearInterval(prune);
    };
  }, []);

  return { current, feed, routes, totals };
}
