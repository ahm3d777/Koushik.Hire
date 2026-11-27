import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * SpatialDeviceForge — Scroll & State-Choreographed Three.js WebGL Stage
 * Modes: 'monolith' | 'desktop' | 'mobile' | 'workspace' | 'commerce' | 'constellation'
 * Automatically pauses render loop when off-viewport or tab hidden; falls back gracefully if WebGL is unavailable.
 */
export default function SpatialDeviceForge({
  mode = 'monolith',
  imageUrl = '',
  captionLeft = 'FORGE // OBSIDIAN MONOLITH',
  captionRight = 'DRAG TO ORBIT · 60 FPS',
}) {
  const mountRef = useRef(null);
  const { xray, theme, setCursorLabel } = usePortfolio();
  const [webglSupported] = useState(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }
    try {
      const probe = document.createElement('canvas');
      return Boolean(
        window.WebGLRenderingContext &&
          (probe.getContext('webgl2') || probe.getContext('webgl'))
      );
    } catch {
      return false;
    }
  });

  const stateRef = useRef({
    mode,
    xray,
    theme,
    isDragging: false,
    prevX: 0,
    prevY: 0,
    userRotX: 0,
    userRotY: 0,
    pointerX: 0,
    pointerY: 0,
  });

  useEffect(() => {
    stateRef.current.mode = mode;
    stateRef.current.xray = xray;
    stateRef.current.theme = theme;
  }, [mode, xray, theme]);

  useEffect(() => {
    if (!webglSupported) return undefined;
    const container = mountRef.current;
    if (!container) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return undefined;
    }

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 400;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 5.4);

    // Studio Lighting: Key Alabaster + Crimson Rim + Signal Cyan Fill
    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xf4f4f6, 2.2);
    keyLight.position.set(3.5, 4.5, 4.0);
    scene.add(keyLight);

    const crimsonRim = new THREE.PointLight(0xe11d48, 5.5, 12);
    crimsonRim.position.set(-3.0, 1.6, 2.2);
    scene.add(crimsonRim);

    const cyanRim = new THREE.PointLight(0x22d3ee, 3.2, 12);
    cyanRim.position.set(2.8, -2.0, 2.0);
    scene.add(cyanRim);

    // Master Pivot Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Materials
    const obsidianMat = new THREE.MeshPhysicalMaterial({
      color: 0x111116,
      metalness: 0.78,
      roughness: 0.22,
      clearcoat: 0.85,
      clearcoatRoughness: 0.16,
    });

    const accentSeamMat = new THREE.MeshBasicMaterial({
      color: 0xe11d48,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a24,
      metalness: 0.2,
      roughness: 0.12,
      transparent: true,
      opacity: 0.86,
      clearcoat: 1.0,
    });

    const screenMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const xrayWireMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });

    // Load screen texture if imageUrl provided
    const textureLoader = new THREE.TextureLoader();
    let loadedTexture = null;
    if (imageUrl) {
      loadedTexture = textureLoader.load(
        imageUrl,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          screenMat.map = tex;
          screenMat.needsUpdate = true;
        },
        undefined,
        () => {}
      );
    }

    // Primary Slab (morphs scale/proportions smoothly across modes!)
    const slabGeo = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
    const mainSlab = new THREE.Mesh(slabGeo, obsidianMat);
    rootGroup.add(mainSlab);

    // Wireframe shell for X-Ray inspection
    const wireOverlay = new THREE.Mesh(slabGeo, xrayWireMat);
    wireOverlay.scale.setScalar(1.015);
    mainSlab.add(wireOverlay);

    // Beveled Crimson Inner Core Seam
    const seamGeo = new THREE.BoxGeometry(1.02, 1.02, 0.18);
    const coreSeam = new THREE.Mesh(seamGeo, accentSeamMat);
    mainSlab.add(coreSeam);

    // Screen Display Plane attached to front of mainSlab
    const screenGeo = new THREE.PlaneGeometry(0.92, 0.88);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.515;
    mainSlab.add(screenMesh);

    // Secondary Companion Floating Card (for Desktop check-in / Split Workspace / Commerce badge)
    const secondarySlab = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 1.35, 0.08),
      glassMat
    );
    secondarySlab.position.set(1.25, -0.35, 0.55);
    rootGroup.add(secondarySlab);

    const secondaryRim = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(0.86, 1.36, 0.085)),
      new THREE.LineBasicMaterial({ color: 0xe11d48, transparent: true, opacity: 0.65 })
    );
    secondarySlab.add(secondaryRim);

    // Precision Orbital Rings (Hero Monolith & Constellation)
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.72, 0.012, 16, 96),
      new THREE.MeshBasicMaterial({ color: 0x3a3a48, transparent: true, opacity: 0.7 })
    );
    ring1.rotation.x = Math.PI / 2.6;
    rootGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.02, 0.009, 12, 96),
      new THREE.MeshBasicMaterial({ color: 0xe11d48, transparent: true, opacity: 0.42 })
    );
    ring2.rotation.y = Math.PI / 3.2;
    ring2.rotation.x = -Math.PI / 4;
    rootGroup.add(ring2);

    // Constellation Satellites
    const satellitesGroup = new THREE.Group();
    const satPositions = [
      [-1.55, 0.95, 0.4],
      [1.6, 0.85, -0.3],
      [-1.35, -0.95, 0.5],
      [1.45, -1.0, 0.3],
      [0, 1.55, -0.4],
    ];
    const satGeo = new THREE.OctahedronGeometry(0.11, 0);
    satPositions.forEach(([x, y, z], idx) => {
      const m = new THREE.Mesh(
        satGeo,
        new THREE.MeshStandardMaterial({
          color: idx % 2 === 0 ? 0xe11d48 : 0x22d3ee,
          emissive: idx % 2 === 0 ? 0x55081b : 0x083a44,
          roughness: 0.25,
          metalness: 0.7,
        })
      );
      m.position.set(x, y, z);
      satellitesGroup.add(m);
    });
    rootGroup.add(satellitesGroup);

    // Pointer & Drag Interactions
    const onPointerDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.prevX = e.clientX;
      stateRef.current.prevY = e.clientY;
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.pointerX = nx;
      stateRef.current.pointerY = ny;

      if (stateRef.current.isDragging) {
        const dx = e.clientX - stateRef.current.prevX;
        const dy = e.clientY - stateRef.current.prevY;
        stateRef.current.userRotY += dx * 0.009;
        stateRef.current.userRotX = Math.max(
          -0.8,
          Math.min(0.8, stateRef.current.userRotX + dy * 0.007)
        );
        stateRef.current.prevX = e.clientX;
        stateRef.current.prevY = e.clientY;
      }
    };

    const onPointerUp = () => {
      stateRef.current.isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    // Visibility & Viewport Pause Guardrail
    let inViewport = true;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          inViewport = entries[0].isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 480;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = null;
    const targetScale = new THREE.Vector3(1.5, 2.25, 0.34);

    const animate = (timeMs) => {
      rafId = requestAnimationFrame(animate);
      if (!inViewport || document.hidden) return;

      const t = timeMs * 0.001;
      const { mode: curMode, xray: isXray, theme: curTheme } = stateRef.current;

      // Adapt material tone for Daylight vs Obsidian
      obsidianMat.color.setHex(curTheme === 'daylight' ? 0x1c1c22 : 0x101015);
      wireOverlay.visible = isXray;
      ring1.material.color.setHex(isXray ? 0x22d3ee : 0x3a3a48);

      // Morph target geometry proportions smoothly by stage mode
      if (curMode === 'monolith') {
        targetScale.set(1.48, 2.24, 0.34);
        screenMesh.visible = false;
        coreSeam.visible = true;
        secondarySlab.visible = false;
        ring1.visible = true;
        ring2.visible = true;
      } else if (curMode === 'desktop') {
        targetScale.set(2.85, 1.72, 0.12);
        screenMesh.visible = Boolean(imageUrl);
        coreSeam.visible = false;
        secondarySlab.visible = true;
        secondarySlab.position.lerp(new THREE.Vector3(1.32, -0.45, 0.42), 0.08);
        ring1.visible = false;
        ring2.visible = false;
      } else if (curMode === 'mobile') {
        targetScale.set(1.28, 2.42, 0.14);
        screenMesh.visible = Boolean(imageUrl);
        coreSeam.visible = true;
        secondarySlab.visible = false;
        ring1.visible = true;
        ring2.visible = false;
      } else if (curMode === 'workspace') {
        targetScale.set(2.75, 1.68, 0.12);
        screenMesh.visible = Boolean(imageUrl);
        coreSeam.visible = false;
        secondarySlab.visible = true;
        secondarySlab.position.lerp(new THREE.Vector3(-1.35, 0.25, 0.38), 0.08);
        ring1.visible = false;
        ring2.visible = true;
      } else if (curMode === 'commerce') {
        targetScale.set(2.45, 1.72, 0.16);
        screenMesh.visible = Boolean(imageUrl);
        coreSeam.visible = true;
        secondarySlab.visible = true;
        secondarySlab.position.lerp(new THREE.Vector3(1.25, 0.32, 0.45), 0.08);
        ring1.visible = true;
        ring2.visible = false;
      } else {
        // constellation
        targetScale.set(0.95, 0.95, 0.95);
        screenMesh.visible = false;
        coreSeam.visible = true;
        secondarySlab.visible = false;
        ring1.visible = true;
        ring2.visible = true;
      }

      mainSlab.scale.lerp(targetScale, 0.08);

      // Weighted inertial motion
      const idleRotY = prefersReducedMotion
        ? 0.25
        : curMode === 'monolith'
        ? Math.sin(t * 0.55) * 0.28 + t * 0.14
        : Math.sin(t * 0.65) * 0.14;
      const idleFloatY = prefersReducedMotion ? 0 : Math.sin(t * 1.35) * 0.07;

      const desiredRotY =
        idleRotY + stateRef.current.userRotY + stateRef.current.pointerX * 0.24;
      const desiredRotX =
        stateRef.current.userRotX - stateRef.current.pointerY * 0.18 + 0.08;

      rootGroup.rotation.y += (desiredRotY - rootGroup.rotation.y) * 0.07;
      rootGroup.rotation.x += (desiredRotX - rootGroup.rotation.x) * 0.07;
      rootGroup.position.y = idleFloatY;

      if (!prefersReducedMotion) {
        ring1.rotation.z = t * 0.22;
        ring2.rotation.z = -t * 0.18;
        satellitesGroup.rotation.y = -t * 0.25;
      }

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      if (loadedTexture) loadedTexture.dispose();
      slabGeo.dispose();
      seamGeo.dispose();
      screenGeo.dispose();
      obsidianMat.dispose();
      accentSeamMat.dispose();
      glassMat.dispose();
      screenMat.dispose();
      xrayWireMat.dispose();
      renderer.dispose();
    };
  }, [imageUrl, webglSupported]);

  return (
    <div
      className="forge-canvas-wrap"
      onMouseEnter={() => setCursorLabel('DRAG 3D')}
      onMouseLeave={() => setCursorLabel('')}
    >
      {webglSupported ? (
        <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={captionLeft}
              style={{
                maxHeight: '84%',
                borderRadius: 12,
                border: '1px solid var(--border-seam)',
              }}
            />
          ) : (
            <div
              style={{
                width: 150,
                height: 220,
                borderRadius: 18,
                background: 'linear-gradient(145deg, #181820, #09090b)',
                border: '1px solid #e11d48',
                boxShadow: '0 24px 60px rgba(225,29,72,0.22)',
              }}
            />
          )}
        </div>
      )}
      <div className="forge-hud-caption">
        <span>{captionLeft}</span>
        <span style={{ color: xray ? 'var(--accent-telemetry)' : undefined }}>
          {xray ? 'X-RAY WIREFRAME ACTIVE' : captionRight}
        </span>
      </div>
    </div>
  );
}
