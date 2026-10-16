import Satellite from "./Satellite";

export default function Satellites() {
  return (
    <>
      <Satellite
        radius={3.1}
        speed={0.18}
        offset={0}
      />

      <Satellite
        radius={3.4}
        speed={0.23}
        offset={2}
      />

      <Satellite
        radius={3.7}
        speed={0.15}
        offset={4}
      />

      <Satellite
        radius={3.9}
        speed={0.28}
        offset={6}
      />
    </>
  );
}