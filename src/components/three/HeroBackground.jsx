import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function FloatingParticles() {
  const ref = useRef();

  // Create particles manually - reduce count on mobile
  const particles = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const count = isMobile ? 0 : isTablet ? 400 : 1500; // Reduced from 2000
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.02;
      ref.current.rotation.y += delta * 0.03;
    }
  });

  if (particles.length === 0) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#38bdf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function InteractiveShape() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time / 4) * 0.5;
    meshRef.current.rotation.y = Math.sin(time / 2) * 0.5;

    // Subtle mouse interaction
    meshRef.current.rotation.x += state.mouse.y * 0.1;
    meshRef.current.rotation.y += state.mouse.x * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#0ea5e9"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

export function HeroBackground() {
  // Robust mobile detection - check both viewport and user agent
  const isMobileDevice = () => {
    if (typeof window === "undefined") return false;

    // Check viewport width
    const isMobileViewport = window.innerWidth < 768;

    // Check user agent for mobile devices
    const isMobileUA =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    // Return true if either condition is met
    return isMobileViewport || isMobileUA;
  };

  const [isMobile, setIsMobile] = useState(isMobileDevice);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Optimize DPR based on device
  const dpr = useMemo(() => {
    return Math.min(window.devicePixelRatio, isMobile ? 1 : 2);
  }, [isMobile]);

  // On mobile, return a lightweight CSS gradient instead of Three.js
  if (isMobile) {
    return (
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(56, 189, 248, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom left, rgba(6, 182, 212, 0.08) 0%, transparent 50%)
          `,
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: false, // Disable antialiasing for better performance
          alpha: true,
          powerPreference: "high-performance",
          stencil: false, // Disable stencil buffer
          depth: true,
        }}
        dpr={dpr}
        style={{ background: "transparent" }}
        performance={{ min: 0.5 }} // Allow frame rate to drop if needed
      >
        <ambientLight intensity={0.5} />
        <FloatingParticles />
        <InteractiveShape />
      </Canvas>
    </div>
  );
}
