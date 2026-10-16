import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Moon() {
  const moon = useRef();

  useFrame(({ clock }) => {
    if (!moon.current) return;

    const t = clock.getElapsedTime() * 0.12;
    moon.current.position.x = Math.sin(t) * 7.2;
    moon.current.position.z = Math.cos(t) * 7.2;
    moon.current.position.y = Math.sin(t * 0.7) * 1.1;
    moon.current.rotation.y += 0.002;
  });

  return (
    <group ref={moon}>
      <mesh>
        <sphereGeometry args={[0.48, 64, 64]} />
        <meshStandardMaterial color="#aeb5bd" roughness={0.92} metalness={0.02} />
      </mesh>

      <mesh scale={1.04}>
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshBasicMaterial color="#d8dee4" transparent opacity={0.08} depthWrite={false} />
      </mesh>
    </group>
  );
}
