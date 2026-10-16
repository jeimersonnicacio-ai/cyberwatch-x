import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Earth() {
  const earthTexture = useTexture(
    "/textures/earth/earth_day.jpg",
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
    },
  );

  return (
    <mesh>
      <sphereGeometry args={[2.15, 96, 96]} />
      <meshStandardMaterial
        map={earthTexture}
        roughness={0.82}
        metalness={0.02}
      />
    </mesh>
  );
}
