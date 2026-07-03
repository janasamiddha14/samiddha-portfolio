"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * StarField — Ambient star particles
 * Creates 2000 randomly positioned stars that slowly rotate,
 * giving the illusion of drifting through space.
 */
export function StarField() {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const count = 2000;
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
        innerColor: { value: new THREE.Color(0x3fa9ff) },
        outerColor: { value: new THREE.Color(0x123a78) },
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
    // Tilt the disk and spin it extremely fast
    <mesh ref={ref} rotation={[Math.PI / 2.3, 0, 0]} material={diskMaterial}>
      <torusGeometry args={[2.5, 1.0, 2, 120]} />
    </mesh>
  );
}

/**
 * NeutronStarCore — Blindingly bright core of the neutron star
 */
export function NeutronStarCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      // Fast pulsation for a neutron star
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 15.0) * 0.02;
      ref.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.05, 64, 64]} />
      {/* Bright blue-white core */}
      <meshBasicMaterial color="#e0f7fa" />
    </mesh>
  );
}

/**
 * PulsarJets — Intense beams of radiation from the magnetic poles
 */
export function PulsarJets() {
  const ref = useRef<THREE.Mesh>(null);
  
  const jetMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x00ffff) },
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
          // Fade out towards the ends (y-axis)
          float fade = sin(vUv.y * 3.14159);
          // Pulsing intensity
          float pulse = 0.5 + 0.5 * sin(time * 20.0 + vUv.y * 10.0);
          // Core of the beam is brighter
          float core = smoothstep(0.5, 0.4, abs(vUv.x - 0.5));
          
          float alpha = fade * pulse * core;
          gl_FragColor = vec4(color, alpha * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      jetMaterial.uniforms.time.value = clock.getElapsedTime();
      // Fast rotation matching the star
      ref.current.rotation.y = clock.getElapsedTime() * 5.0;
    }
  });

  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[0.2, 1.5, 12, 32, 1, true]} />
      <primitive object={jetMaterial} attach="material" />
    </mesh>
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
          color: { value: new THREE.Color(0x3fa9ff) },
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
      <planeGeometry args={[4.5, 4.5]} />
    </mesh>
  );
}

/**
 * SpaceDust — Ambient floating particles around the black hole
 */
export function SpaceDust() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 600;
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
        color="#3FA9FF"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.4}
        fog={false}
      />
    </points>
  );
}
