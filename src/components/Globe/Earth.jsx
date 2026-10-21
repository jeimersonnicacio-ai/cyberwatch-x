import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// BASE_URL keeps public assets working both locally and under GitHub Pages
// when the project is served from /cyberwatch-x/ instead of the domain root.
const EARTH_TEXTURE_URL = `${import.meta.env.BASE_URL}textures/earth/earth_day.jpg`;

export default function Earth() {
  const earthTexture = useTexture(EARTH_TEXTURE_URL, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  });

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
