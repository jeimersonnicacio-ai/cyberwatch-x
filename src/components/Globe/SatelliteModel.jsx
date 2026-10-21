import { useGLTF } from "@react-three/drei";

// BASE_URL keeps public assets working both locally and under GitHub Pages
// when the project is served from /cyberwatch-x/ instead of the domain root.
const SATELLITE_MODEL_URL = `${import.meta.env.BASE_URL}models/satellites/satellite.glb`;

export default function SatelliteModel(props) {
  const { scene } = useGLTF(SATELLITE_MODEL_URL);

  return <primitive object={scene} scale={0.08} {...props} />;
}

useGLTF.preload(SATELLITE_MODEL_URL);
