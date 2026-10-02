import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as random from "maath/random/dist/maath-random.esm";

const StarBackgroundContent = ({ isDark, ...props }) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(2400), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
    }
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
          color={isDark ? "#ffffff" : "#EC844D"}
          opacity={isDark ? 0.85 : 0.25}
          size={0.0022}
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

  if (!isDark) return null;

  return (
    <div className="w-full h-auto fixed inset-0 z-[20] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        events={null}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          alpha: true,
          stencil: false,
          depth: false,
        }}
        className="!pointer-events-none"
      >
        <Suspense fallback={null}>
          <StarBackgroundContent isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
};
