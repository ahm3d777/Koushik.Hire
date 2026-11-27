import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SITE_CONFIG } from '../config/siteConfig';
import { usePortfolio } from '../context/PortfolioContext';

function detectInitial3DCapability() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { canWebGL: false, autoBoot3D: false, saveData: false };
  }
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const saveData = Boolean(
    conn?.saveData ||
      conn?.effectiveType === '2g' ||
      conn?.effectiveType === 'slow-2g' ||
      conn?.effectiveType === '3g' ||
      (window.matchMedia &&
        window.matchMedia('(prefers-reduced-data: reduce)').matches)
  );

  let canWebGL;
  try {
    const probe = document.createElement('canvas');
    canWebGL = Boolean(
      window.WebGLRenderingContext &&
        (probe.getContext('webgl2') || probe.getContext('webgl'))
    );
  } catch {
    canWebGL = false;
  }

  // v2 §4.2: base (<768px) or Save-Data shows lightweight poster by default, with optional "Load 3D" tap
  const isMobileBase = window.innerWidth < 768;
  return {
    canWebGL,
    saveData,
    autoBoot3D: canWebGL && !saveData && !isMobileBase,
  };
}

/**
 * SpatialDeviceForge — Capability-Gated Three.js WebGL Stage (v2 §4.2)
 * Max 8° cursor tilt, drag inertia, pauses off-screen & in background tabs, static poster on budget mobile / Save-Data.
 */
export default function SpatialDeviceForge({
  mode = 'monolith',
  imageUrl = '',
  captionLeft = 'FORGE // OBSIDIAN MONOLITH',
  captionRight = 'DRAG TO ORBIT · 60 FPS',
  ariaDescription = 'Interactive 3D bevelled obsidian monolith with crimson rim light',
}) {
  const mountRef = useRef(null);
  const { xray, theme, reducedMotion, setCursorLabel } = usePortfolio();
  const [caps] = useState(detectInitial3DCapability);
  const [manual3DEnabled, setManual3DEnabled] = useState(false);

  const shouldRender3D = caps.autoBoot3D || manual3DEnabled;

  const stateRef = useRef({
    mode,
    xray,
    theme,
    reducedMotion,
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
    stateRef.current.reducedMotion = reducedMotion;
  }, [mode, xray, theme, reducedMotion]);

  useEffect(() => {
    if (!shouldRender3D || !caps.canWebGL) return undefined;
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
    camera.position.set(0, 0.12, 5.4);

    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xf4f4f6, 2.2);
    keyLight.position.set(3.5, 4.5, 4.0);
    scene.add(keyLight);

    const crimsonRim = new THREE.PointLight(0xe11d48, 5.4, 12);
    crimsonRim.position.set(-3.0, 1.6, 2.2);
    scene.add(crimsonRim);

    const cyanRim = new THREE.PointLight(0x22d3ee, 3.0, 12);
    cyanRim.position.set(2.8, -2.0, 2.0);
    scene.add(cyanRim);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const obsidianMat = new THREE.MeshPhysicalMaterial({
      color: 0x111116,
      metalness: 0.78,
      roughness: 0.22,
      clearcoat: 0.85,
      clearcoatRoughness: 0.16,
    });

    const accentSeamMat = new THREE.MeshBasicMaterial({ color: 0xe11d48 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a24,
      metalness: 0.2,
      roughness: 0.12,
      transparent: true,
      opacity: 0.86,
      clearcoat: 1.0,
    });
    const screenMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const xrayWireMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });

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

    const slabGeo = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
    const mainSlab = new THREE.Mesh(slabGeo, obsidianMat);
    rootGroup.add(mainSlab);

    const wireOverlay = new THREE.Mesh(slabGeo, xrayWireMat);
    wireOverlay.scale.setScalar(1.015);
    mainSlab.add(wireOverlay);

    const seamGeo = new THREE.BoxGeometry(1.02, 1.02, 0.18);
    const coreSeam = new THREE.Mesh(seamGeo, accentSeamMat);
    mainSlab.add(coreSeam);

    const screenGeo = new THREE.PlaneGeometry(0.92, 0.88);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.515;
    mainSlab.add(screenMesh);

    const secondarySlab = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 1.35, 0.08),
      glassMat
    );
    secondarySlab.position.set(1.25, -0.35, 0.55);
    rootGroup.add(secondarySlab);

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.72, 0.011, 16, 96),
      new THREE.MeshBasicMaterial({
        color: 0x3a3a48,
        transparent: true,
        opacity: 0.65,
      })
    );
    ring1.rotation.x = Math.PI / 2.6;
    rootGroup.add(ring1);

    const onPointerDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.prevX = e.clientX;
      stateRef.current.prevY = e.clientY;
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = Math.max(
        -1,
        Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1)
      );
      const ny = Math.max(
        -1,
        Math.min(1, -(((e.clientY - rect.top) / rect.height) * 2 - 1))
      );
      stateRef.current.pointerX = nx;
      stateRef.current.pointerY = ny;

      if (stateRef.current.isDragging) {
        const dx = e.clientX - stateRef.current.prevX;
        const dy = e.clientY - stateRef.current.prevY;
        stateRef.current.userRotY += dx * 0.008;
        stateRef.current.userRotX = Math.max(
          -0.6,
          Math.min(0.6, stateRef.current.userRotX + dy * 0.006)
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

    let inViewport = true;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]) inViewport = entries[0].isIntersecting;
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

    let rafId = null;
    const targetScale = new THREE.Vector3(1.5, 2.25, 0.34);
    const MAX_TILT_RAD = 0.14; // ~8 degrees max tilt per v2 §4.2

    const animate = (timeMs) => {
      rafId = requestAnimationFrame(animate);
      if (!inViewport || document.hidden) return;

      const t = timeMs * 0.001;
      const {
        mode: curMode,
        xray: isXray,
        theme: curTheme,
        reducedMotion: isReduced,
      } = stateRef.current;

      obsidianMat.color.setHex(curTheme === 'daylight' ? 0x1c1c22 : 0x101015);
      wireOverlay.visible = isXray;
      ring1.material.color.setHex(isXray ? 0x22d3ee : 0x3a3a48);

      if (curMode === 'monolith') {
        targetScale.set(1.48, 2.24, 0.34);
        screenMesh.visible = false;
        coreSeam.visible = true;
        secondarySlab.visible = false;
        ring1.visible = true;
      } else if (curMode === 'desktop') {
        targetScale.set(2.85, 1.72, 0.12);
        screenMesh.visible = Boolean(imageUrl);
        coreSeam.visible = false;
        secondarySlab.visible = true;
        ring1.visible = false;
      } else if (curMode === 'mobile') {
        targetScale.set(1.28, 2.42, 0.14);
        screenMesh.visible = Boolean(imageUrl);
        coreSeam.visible = true;
        secondarySlab.visible = false;
        ring1.visible = true;
      } else if (curMode === 'workspace') {
        targetScale.set(2.75, 1.68, 0.12);
        screenMesh.visible = Boolean(imageUrl);
        coreSeam.visible = false;
        secondarySlab.visible = true;
        ring1.visible = false;
      } else {
        targetScale.set(2.45, 1.72, 0.16);
        screenMesh.visible = Boolean(imageUrl);
        coreSeam.visible = true;
        secondarySlab.visible = true;
        ring1.visible = true;
      }

      mainSlab.scale.lerp(targetScale, 0.08);

      const idleRotY = isReduced ? -0.28 : Math.sin(t * 0.55) * 0.22;
      const idleFloatY = isReduced ? 0 : Math.sin(t * 1.2) * 0.05;

      const desiredRotY =
        idleRotY +
        stateRef.current.userRotY +
        stateRef.current.pointerX * MAX_TILT_RAD;
      const desiredRotX =
        stateRef.current.userRotX -
        stateRef.current.pointerY * MAX_TILT_RAD +
        0.08;

      rootGroup.rotation.y += (desiredRotY - rootGroup.rotation.y) * 0.07;
      rootGroup.rotation.x += (desiredRotX - rootGroup.rotation.x) * 0.07;
      rootGroup.position.y = idleFloatY;

      if (!isReduced) {
        ring1.rotation.z = t * 0.18;
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
  }, [imageUrl, shouldRender3D, caps.canWebGL]);

  const posterSrc = imageUrl || SITE_CONFIG.monolithPoster;

  return (
    <div
      className="forge-canvas-wrap"
      role="img"
      aria-label={ariaDescription}
      onMouseEnter={() => {
        if (shouldRender3D) setCursorLabel('DRAG 3D');
      }}
      onMouseLeave={() => setCursorLabel('')}
    >
      {shouldRender3D ? (
        <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={posterSrc}
            alt={ariaDescription}
            width="640"
            height="800"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.92,
            }}
          />
          {caps.canWebGL && !caps.saveData && (
            <button
              type="button"
              className="hud-pill-btn"
              onClick={() => setManual3DEnabled(true)}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: 'rgba(9, 9, 11, 0.85)',
              }}
            >
              Load 3D Stage
            </button>
          )}
        </div>
      )}

      <div className="forge-hud-caption" aria-hidden="true">
        <span>{captionLeft}</span>
        <span style={{ color: xray ? 'var(--accent-telemetry)' : undefined }}>
          {xray
            ? 'X-RAY WIREFRAME'
            : shouldRender3D
            ? captionRight
            : 'STATIC POSTER · DATA SAFE'}
        </span>
      </div>
    </div>
  );
}
