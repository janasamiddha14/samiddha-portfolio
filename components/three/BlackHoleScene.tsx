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
      items.push(geometry);
    }
    return items;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      // Rotate the entire magnetic field rapidly with the jets
      ref.current.rotation.y = clock.getElapsedTime() * 5.0;
      // Pulse opacity
      ref.current.children.forEach((child, i) => {
        const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
        mat.opacity = 0.2 + 0.3 * Math.sin(clock.getElapsedTime() * 10.0 + i);
      });
    }
  });

  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 12]}>
      {lines.map((geom, idx) => (
        <line key={idx} geometry={geom}>
          <lineBasicMaterial color="#3fa9ff" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
        </line>
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
