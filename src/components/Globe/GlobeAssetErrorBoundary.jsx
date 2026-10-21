import { Component } from "react";

/**
 * Three.js asset loading failures should degrade to a visible placeholder globe,
 * not leave the Canvas completely black.
 */
export default class GlobeAssetErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("CyberWatch X: falha ao carregar um recurso 3D.", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <group>
          <mesh>
            <sphereGeometry args={[2.15, 48, 48]} />
            <meshBasicMaterial color="#0879a8" wireframe />
          </mesh>
          <mesh scale={1.035}>
            <sphereGeometry args={[2.15, 32, 32]} />
            <meshBasicMaterial color="#00d9ff" wireframe transparent opacity={0.2} />
          </mesh>
        </group>
      );
    }

    return this.props.children;
  }
}
