import { useEffect, useState } from "react";

function getLocalClock() {
  const now = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "LOCAL";
  const time = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  return { time, timeZone };
}

export default function useLocalClock() {
  const [clock, setClock] = useState(getLocalClock);

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(getLocalClock());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return clock;
}
