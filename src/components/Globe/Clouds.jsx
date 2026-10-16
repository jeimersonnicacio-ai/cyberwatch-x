import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Clouds() {
  const cloudsRef = useRef();

  const cloudsTexture = useTexture(
    "/textures/earth/earth_clouds.png",
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
    },
  );

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
