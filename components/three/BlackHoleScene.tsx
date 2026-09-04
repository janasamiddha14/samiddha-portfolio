"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * StarField — Ambient star particles
 * Creates 2000 randomly positioned stars that slowly rotate,
 * giving the illusion of drifting through space.
 */
export function StarField() {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 20 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      sizes[i] = 0.05 + Math.random() * 0.15;
    }
    return { positions, sizes };
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.008;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.003) * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#B8D4FF"
        size={0.12}
        sizeAttenuation
        transparent
        opacity={0.85}
        fog={false}
      />
    </points>
  );
}

/**
 * ShootingStar — Occasional fast-moving particle streak
 */
export function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null);
  const startTime = useRef(Math.random() * 10);
  const direction = useMemo(
    () => new THREE.Vector3(Math.random() - 0.5, Math.random() * 0.3 - 0.15, 0).normalize(),
    []
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() - startTime.current) % 12;
    const progress = t / 3;
    ref.current.visible = progress >= 0 && progress <= 1;
    if (ref.current.visible) {
      ref.current.position.x = -8 + direction.x * progress * 20;
      ref.current.position.y = 4 + direction.y * progress * 10;
      ref.current.position.z = -5;
      (ref.current.material as THREE.MeshBasicMaterial).opacity = Math.sin(progress * Math.PI);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#5CCBFF" transparent opacity={0} />
    </mesh>
  );
}

/**
 * AccretionDisk — Glowing ring around the black hole
 * Renders a torus geometry with animated glow shader.
 */
export function AccretionDisk() {
  const ref = useRef<THREE.Mesh>(null);

  const diskMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        innerColor: { value: new THREE.Color(0xffaa55) }, // Interstellar bright orange/yellow
        outerColor: { value: new THREE.Color(0x772200) }, // Deep red/brown at the edges
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vAngle;
        void main() {
          vUv = uv;
          vAngle = atan(position.z, position.x);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 innerColor;
        uniform vec3 outerColor;
        varying vec2 vUv;
        varying float vAngle;

        void main() {
          // Radial gradient from inner to outer
          float radial = smoothstep(0.0, 1.0, vUv.x);
          vec3 color = mix(innerColor, outerColor, radial);

          // Brightness variation like real accretion disk
          float brightness = 0.5 + 0.5 * sin(vAngle * 3.0 + time * 0.8);
          brightness *= 1.0 - radial * 0.7;

          // Fade edges
          float edgeFade = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);

          gl_FragColor = vec4(color * brightness, edgeFade * 0.85);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      diskMaterial.uniforms.time.value = clock.getElapsedTime();
      ref.current.rotation.z = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    // Tilt the disk almost edge-on to mimic the Interstellar perspective
    <mesh ref={ref} rotation={[Math.PI / 2.1, 0, 0]} material={diskMaterial}>
      {/* Wider, thinner disk for Gargantua */}
      <torusGeometry args={[3.0, 0.8, 2, 120]} />
    </mesh>
  );
}

/**
 * NeutronStarCore — Blindingly bright core of the neutron star
 */
export function NeutronStarCore() {
  const ref = useRef<THREE.Mesh>(null);

  const coreShader = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          baseColor: { value: new THREE.Color(0xdffff) }, // Blinding bright blue-white
          pulseColor: { value: new THREE.Color(0x3fa9ff) }, // Electric blue
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPositionNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal); // Normal in view space
            vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 baseColor;
          uniform vec3 pulseColor;
          varying vec3 vNormal;
          varying vec3 vPositionNormal;

          void main() {
            // Fresnel effect for edge glow
            float fresnel = dot(vNormal, vPositionNormal);
            fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
            fresnel = pow(fresnel, 2.0);

            // Pulsating energy
            float pulse = sin(time * 15.0) * 0.5 + 0.5;
            
            vec3 finalColor = mix(baseColor, pulseColor, fresnel * pulse);
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (ref.current) {
      coreShader.uniforms.time.value = clock.getElapsedTime();
      const scale = 1.0 + Math.sin(clock.getElapsedTime() * 20.0) * 0.015;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} material={coreShader}>
      <sphereGeometry args={[1.0, 64, 64]} />
    </mesh>
  );
}

/**
 * PulsarJets — Intense relativistic jets shooting from the poles
 */
export function PulsarJets() {
  const ref = useRef<THREE.Group>(null);

  const jetShader = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0x5ccbff) }, // Nebula glow
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vPosition;
          void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          varying vec2 vUv;
          varying vec3 vPosition;

          void main() {
            // Jet fading away from the core
            float fade = 1.0 - abs(vPosition.y) / 8.0;
            fade = clamp(fade, 0.0, 1.0);
            
            // Central core of the jet is brighter
            float centerDist = abs(vPosition.x) + abs(vPosition.z);
            float coreGlow = smoothstep(0.4, 0.0, centerDist);
            
            // Rapid pulsation
            float pulse = 0.7 + 0.3 * sin(vPosition.y * 5.0 - time * 30.0);
            
            float alpha = fade * coreGlow * pulse;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (ref.current) {
      jetShader.uniforms.time.value = clock.getElapsedTime();
      // Rapid spinning of the jets
      ref.current.rotation.y = clock.getElapsedTime() * 5.0;
    }
  });

  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 12]}> {/* Tilt the magnetic axis */}
      {/* Top Jet */}
      <mesh position={[0, 4, 0]} material={jetShader}>
        <cylinderGeometry args={[0.01, 1.2, 8, 32, 1, true]} />
      </mesh>
      {/* Bottom Jet */}
      <mesh position={[0, -4, 0]} material={jetShader}>
        <cylinderGeometry args={[1.2, 0.01, 8, 32, 1, true]} />
      </mesh>
    </group>
  );
}

/**
 * MagneticFieldLines — Glowing sweeping arcs around the pulsar
 */
export function MagneticFieldLines() {
  const ref = useRef<THREE.Group>(null);
  
  // Create static arcs representing field lines
  const lines = useMemo(() => {
    const lineCount = 12;
    const items = [];
    const material = new THREE.LineBasicMaterial({ color: "#3fa9ff", transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false });
    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2;
      const points = [];
      // Create a semi-circle arc
      for (let j = 0; j <= 20; j++) {
        const t = j / 20;
        const theta = t * Math.PI; // 0 to PI
        const radius = 2.5 + Math.sin(theta) * 2.0; // Bulge outwards
        const y = Math.cos(theta) * 3.5;
        const x = Math.sin(theta) * radius * Math.cos(angle);
        const z = Math.sin(theta) * radius * Math.sin(angle);
        points.push(new THREE.Vector3(x, y, z));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      items.push(new THREE.Line(geometry, material));
    }
    return items;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      // Rotate the entire magnetic field rapidly with the jets
      ref.current.rotation.y = clock.getElapsedTime() * 5.0;
      // Pulse opacity
      ref.current.children.forEach((child, i) => {
        if ((child as THREE.Line).isLine) {
          const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
          mat.opacity = 0.2 + 0.3 * Math.sin(clock.getElapsedTime() * 10.0 + i);
        }
      });
    }
  });

  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 12]}>
      {lines.map((line, idx) => (
        <primitive key={idx} object={line} />
      ))}
    </group>
  );
}

/**
 * GravitationalLensRing — Photon sphere glow
 */
export function GravitationalLensRing() {
  const ref = useRef<THREE.Mesh>(null);

  const lensShader = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0xff8833) }, // Gargantua photon ring glow
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          varying vec2 vUv;

          void main() {
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(vUv, center);

            // Einstein ring
            float ring = smoothstep(0.48, 0.49, dist) * smoothstep(0.52, 0.51, dist);
            float glow = exp(-pow((dist - 0.5) * 8.0, 2.0)) * 0.3;

            float alpha = ring + glow;
            gl_FragColor = vec4(color, alpha * 0.7);
          }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame(({ clock }) => {
    lensShader.uniforms.time.value = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={ref} material={lensShader}>
      {/* Slightly larger plane for the intense neutron star glow */}
      <planeGeometry args={[4.8, 4.8]} />
    </mesh>
  );
}

/**
 * SpaceDust — Ambient floating particles around the black hole
 */
export function SpaceDust() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 6;
      const height = (Math.random() - 0.5) * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffaa55" // Warm interstellar dust
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.4}
        fog={false}
      />
    </points>
  );
}

/**
 * SpacetimeGrid — 3D Spacetime Curvature & Quantum Wave Grid
 * Renders an undulating 3D gravitational potential well and quantum wave fabric
 * that smoothly reacts to cursor coordinates and time.
 */
export function SpacetimeGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const spacetimeShader = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScroll: { value: 0 },
        uColor1: { value: new THREE.Color(0x3fa9ff) }, // Electric blue
        uColor2: { value: new THREE.Color(0x5ccbff) }, // Nebula cyan
        uDeepColor: { value: new THREE.Color(0x0a1c3d) }, // Cosmic deep blue
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uScroll;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Distance from center of the grid
          float distToCenter = length(pos.xy);

          // Gravitational potential well (General Relativity curvature)
          float well = -1.6 / (distToCenter * 0.6 + 0.85);

          // Quantum ripple waves propagating outwards with time and scroll
          float wave = sin(distToCenter * 2.8 - uTime * 2.0 + uScroll * 3.14) * 0.18 * exp(-distToCenter * 0.15);
          float crossWave = cos(pos.x * 1.8 + uTime * 0.8) * sin(pos.y * 1.8 + uTime * 0.8) * 0.08;

          // Cursor spacetime warping (subtle gravitational attraction to mouse pointer)
          vec2 mouseWorld = uMouse * 4.0;
          float distToMouse = length(pos.xy - mouseWorld);
          float mouseDent = -0.55 * exp(-distToMouse * distToMouse * 0.5);

          pos.z += well + wave + crossWave + mouseDent;
          vElevation = pos.z;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uDeepColor;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          // Anti-aliased primary grid lines
          vec2 gridUv = abs(fract(vUv * 36.0 - 0.5) - 0.5) / fwidth(vUv * 36.0);
          float line = min(gridUv.x, gridUv.y);
          float gridAlpha = 1.0 - min(line, 1.0);

          // Fine secondary quantum grid lines
          vec2 fineGridUv = abs(fract(vUv * 108.0 - 0.5) - 0.5) / fwidth(vUv * 108.0);
          float fineLine = min(fineGridUv.x, fineGridUv.y);
          float fineGridAlpha = (1.0 - min(fineLine, 1.0)) * 0.35;

          float combinedGrid = max(gridAlpha, fineGridAlpha);

          // Radial fade to seamlessly blend into space background
          float distFromCenter = length(vUv - 0.5) * 2.0;
          float edgeFade = smoothstep(1.0, 0.15, distFromCenter);

          // Dynamic energy gradient based on curvature elevation
          float colorBlend = smoothstep(-1.8, 0.2, vElevation);
          vec3 gridColor = mix(uDeepColor, mix(uColor1, uColor2, sin(uTime * 1.5 + vElevation * 2.5) * 0.5 + 0.5), colorBlend);

          // Ambient quantum glow pulse
          float pulse = 0.85 + 0.15 * sin(uTime * 2.5 + vElevation * 3.0);

          float finalAlpha = combinedGrid * edgeFade * pulse * 0.8;

          if (finalAlpha < 0.01) discard;

          gl_FragColor = vec4(gridColor * 1.25, finalAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    spacetimeShader.uniforms.uTime.value = time;

    // Smoothly interpolate mouse uniform
    spacetimeShader.uniforms.uMouse.value.x += (mousePos.current.x - spacetimeShader.uniforms.uMouse.value.x) * 0.05;
    spacetimeShader.uniforms.uMouse.value.y += (mousePos.current.y - spacetimeShader.uniforms.uMouse.value.y) * 0.05;

    // Smoothly interpolate scroll uniform
    const maxScroll = typeof document !== 'undefined' ? (document.documentElement.scrollHeight - window.innerHeight || 1) : 1;
    const targetScrollNorm = Math.min(Math.max(scrollY.current / maxScroll, 0), 1);
    spacetimeShader.uniforms.uScroll.value += (targetScrollNorm - spacetimeShader.uniforms.uScroll.value) * 0.05;

    if (meshRef.current) {
      // Gentle reactive rotation with mouse and scroll
      const targetRotY = mousePos.current.x * 0.1;
      meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.04;
      meshRef.current.rotation.z = Math.sin(time * 0.05) * 0.03;

      // Subtle vertical shift with scroll
      const targetPosY = -0.5 - targetScrollNorm * 1.2;
      meshRef.current.position.y += (targetPosY - meshRef.current.position.y) * 0.04;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, -0.5, -0.5]}
      rotation={[-Math.PI / 2.6, 0, 0]}
      material={spacetimeShader}
    >
      <planeGeometry args={[22, 22, 64, 64]} />
    </mesh>
  );
}

/**
 * CosmicBackground — Global 3D Background Canvas
 * Renders an interactive 3D spacetime curvature grid, space dust,
 * shooting stars, and starfield that persists across the entire website.
 */
export function CosmicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        dpr={1} // Capped at 1 for buttery fluidic 60-120fps performance on all devices
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#050608"]} />
        <ambientLight intensity={0.25} />

        <group position={[0, 0, 0]}>
          <SpacetimeGrid />
          <SpaceDust />
        </group>

        <StarField />
        <ShootingStar />

        <pointLight position={[10, 10, 10]} intensity={0.3} />
      </Canvas>
      {/* Subtle atmospheric vignette at viewport edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,6,8,0.75)_100%)]" />
    </div>
  );
}
