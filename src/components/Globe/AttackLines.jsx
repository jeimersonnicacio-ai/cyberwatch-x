import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { ROUTE_FADE_MS, ROUTE_LIFETIME_MS } from "../../services/globeRoutes";

const SURFACE_RADIUS = 2.19;

/*
  Caso os pontos fiquem deslocados horizontalmente
  em relação à sua textura, altere este valor:

  0    = posição padrão
  90   = gira 90 graus
  -90  = gira -90 graus
  180  = inverte o lado
*/
const LONGITUDE_OFFSET_DEGREES = 0;

const EVENT_COLORS = {
  attack: "#ff3030",
  defense: "#1684ff",
  protected: "#00ff95",
};

function latLonToUnitVector(latitude, longitude) {
  const adjustedLongitude =
    longitude + LONGITUDE_OFFSET_DEGREES;

  const latitudeRadians = THREE.MathUtils.degToRad(latitude);
  const longitudeRadians =
    THREE.MathUtils.degToRad(adjustedLongitude);

  const x =
    Math.cos(latitudeRadians) *
    Math.cos(longitudeRadians);

  const y = Math.sin(latitudeRadians);

  const z =
    -Math.cos(latitudeRadians) *
    Math.sin(longitudeRadians);

  return new THREE.Vector3(x, y, z).normalize();
}

function sphericalInterpolation(start, end, t) {
  const dot = THREE.MathUtils.clamp(
    start.dot(end),
    -1,
    1,
  );

  const angle = Math.acos(dot);

  if (angle < 0.0001) {
    return start.clone();
  }

  const sinAngle = Math.sin(angle);

  const startWeight =
    Math.sin((1 - t) * angle) / sinAngle;

  const endWeight =
    Math.sin(t * angle) / sinAngle;

  return start
    .clone()
    .multiplyScalar(startWeight)
    .add(end.clone().multiplyScalar(endWeight))
    .normalize();
}

function createArc(origin, destination) {
  const startDirection = latLonToUnitVector(
    origin.lat,
    origin.lon,
  );

  const endDirection = latLonToUnitVector(
    destination.lat,
    destination.lon,
  );

  const angularDistance = Math.acos(
    THREE.MathUtils.clamp(
      startDirection.dot(endDirection),
      -1,
      1,
    ),
  );

  const arcHeight = THREE.MathUtils.clamp(
    angularDistance * 0.75,
    0.35,
    1.15,
  );

  const points = [];
  const totalPoints = 100;

  for (let index = 0; index <= totalPoints; index += 1) {
    const progress = index / totalPoints;

    const direction = sphericalInterpolation(
      startDirection,
      endDirection,
      progress,
    );

    const altitude =
      Math.sin(Math.PI * progress) * arcHeight;

    const radius = SURFACE_RADIUS + altitude;

    points.push(direction.multiplyScalar(radius));
  }

  const curve = new THREE.CatmullRomCurve3(points);

  return {
    points,
    curve,
    start: points[0],
    end: points[points.length - 1],
  };
}

function fadeOpacity(bornAt) {
  const age = Date.now() - bornAt;

  if (age < ROUTE_FADE_MS) {
    return THREE.MathUtils.clamp(age / ROUTE_FADE_MS, 0, 1);
  }

  const remaining = ROUTE_LIFETIME_MS - age;

  if (remaining < ROUTE_FADE_MS) {
    return THREE.MathUtils.clamp(remaining / ROUTE_FADE_MS, 0, 1);
  }

  return 1;
}

function EventMarker({ position, color, size = 0.035, opacityRef }) {
  const materialRef = useRef();

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.opacity = opacityRef.current * 0.9;
    }
  });

  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 16, 16]} />

      <meshBasicMaterial
        ref={materialRef}
        color={color}
        toneMapped={false}
        transparent
        opacity={0}
        depthTest
      />
    </mesh>
  );
}

function CyberEventLine({ event }) {
  const particleRef = useRef();
  const particleMaterialRef = useRef();
  const lineRef = useRef();
  const progressRef = useRef(event.offset ?? 0);
  const opacityRef = useRef(0);

  const arc = useMemo(
    () => createArc(event.origin, event.destination),
    [event.origin, event.destination],
  );

  const color = EVENT_COLORS[event.type] ?? EVENT_COLORS.attack;

  useFrame((_, delta) => {
    opacityRef.current = fadeOpacity(event.born);

    if (lineRef.current?.material) {
      lineRef.current.material.opacity = opacityRef.current * 0.82;
    }

    if (particleMaterialRef.current) {
      particleMaterialRef.current.opacity = opacityRef.current;
    }

    if (!particleRef.current) return;

    progressRef.current += delta * (event.speed ?? 0.16);

    if (progressRef.current >= 1) {
      progressRef.current = 0;
    }

    particleRef.current.position.copy(arc.curve.getPointAt(progressRef.current));
  });

  return (
    <group>
      <Line
        ref={lineRef}
        points={arc.points}
        color={color}
        lineWidth={1.5}
        transparent
        opacity={0}
        depthTest
        depthWrite={false}
      />

      <EventMarker position={arc.start} color={color} size={0.025} opacityRef={opacityRef} />
      <EventMarker position={arc.end} color={color} size={0.038} opacityRef={opacityRef} />

      <mesh ref={particleRef}>
        <sphereGeometry args={[0.042, 18, 18]} />

        <meshBasicMaterial
          ref={particleMaterialRef}
          color={color}
          toneMapped={false}
          transparent
          opacity={0}
          depthTest
        />

        <pointLight color={color} intensity={1.8} distance={0.6} />
      </mesh>
    </group>
  );
}

export default function AttackLines({ routes = [] }) {
  return (
    <group>
      {routes.map((route) => (
        <CyberEventLine key={route.id} event={route} />
      ))}
    </group>
  );
}
