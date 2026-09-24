import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as random from "maath/random/dist/maath-random.esm";

const StarBackgroundContent = ({ isDark, ...props }) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5001), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color={isDark ? "#ffffff" : "#8b5cf6"}
          opacity={isDark ? 0.9 : 0.25}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarBackground = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="w-full h-auto fixed inset-0 z-[20] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }} events={null} className="!pointer-events-none">
        <Suspense fallback={null}>
          <StarBackgroundContent isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
};
