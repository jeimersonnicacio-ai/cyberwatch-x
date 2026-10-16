import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import SatelliteModel from "./SatelliteModel";

export default function Satellite({
  radius = 3.2,
  speed = 0.25,
  offset = 0,
}) {
  const satellite = useRef();

  useFrame(({ clock }) => {
    if (!satellite.current) return;

    const t = clock.getElapsedTime() * speed + offset;

    satellite.current.position.x = Math.cos(t) * radius;
    satellite.current.position.z = Math.sin(t) * radius;
    satellite.current.position.y = Math.sin(t * 0.6) * 0.4;

    satellite.current.lookAt(0, 0, 0);
  });

  return (
    <group ref={satellite}>
      <SatelliteModel />
    </group>
  );
}