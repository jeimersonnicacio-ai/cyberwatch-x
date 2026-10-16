import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import Earth from "./Earth";
import Clouds from "./Clouds";
import Atmosphere from "./Atmosphere";
import AttackLines from "./AttackLines";

export default function RotatingWorld({ routes }) {
  const worldRef = useRef();

  useFrame((_, delta) => {
    if (worldRef.current) {
      worldRef.current.rotation.y += delta * 0.045;
    }
  });

  return (
    <group ref={worldRef}>
      <Earth />
      <Clouds />
      <Atmosphere />
      <AttackLines routes={routes} />
    </group>
  );
}