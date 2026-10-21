import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Satellites from "./Satellites";
import RotatingWorld from "./RotatingWorld";
import Moon from "./Moon";
import Sun from "./Sun";
import GlobeAssetErrorBoundary from "./GlobeAssetErrorBoundary";

function LoadingPlanet() {
  return (
    <mesh>
      <sphereGeometry args={[2.15, 48, 48]} />
      <meshBasicMaterial color="#063d5c" wireframe />
    </mesh>
  );
}

export default function CyberGlobe({ routes }) {
  return (
    <div className="globe-container" style={{ width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 6.8], fov: 45 }}
      >
        <color attach="background" args={["#01040b"]} />

        <ambientLight intensity={0.22} />
        <directionalLight position={[8, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, -2, 3]} intensity={5} color="#0077ff" />

        <Stars radius={90} depth={45} count={4500} factor={4} fade speed={0.25} />

        <Sun />

        <GlobeAssetErrorBoundary>
          <Suspense fallback={<LoadingPlanet />}>
            <RotatingWorld routes={routes} />
            <Moon />
            <Satellites />
          </Suspense>
        </GlobeAssetErrorBoundary>

        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={4.8}
          maxDistance={10}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>

      <div className="globe-label">
        <span className="status-dot"></span>
        GLOBAL MONITORING ACTIVE
      </div>
    </div>
  );
}
