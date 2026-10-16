import { useGLTF } from "@react-three/drei";

export default function SatelliteModel(props) {
  const { scene } = useGLTF("/models/satellites/satellite.glb");

  return (
    <primitive
      object={scene}
      scale={0.08}
      {...props}
    />
  );
}

useGLTF.preload("/models/satellites/satellite.glb");