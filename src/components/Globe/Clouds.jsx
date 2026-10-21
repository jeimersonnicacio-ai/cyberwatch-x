import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// BASE_URL keeps public assets working both locally and under GitHub Pages
// when the project is served from /cyberwatch-x/ instead of the domain root.
const CLOUDS_TEXTURE_URL = `${import.meta.env.BASE_URL}textures/earth/earth_clouds.png`;

export default function Clouds() {
  const cloudsRef = useRef();

  const cloudsTexture = useTexture(CLOUDS_TEXTURE_URL, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
  });

  useFrame((_, delta) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.008;
    }
  });

  return (
    <mesh ref={cloudsRef}>
      <sphereGeometry args={[2.175, 96, 96]} />
      <meshStandardMaterial
        map={cloudsTexture}
        transparent
        opacity={0.42}
        depthWrite={false}
        alphaTest={0.02}
      />
    </mesh>
  );
}
