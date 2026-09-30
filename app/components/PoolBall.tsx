"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function PoolBall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      stage.dataset.unavailable = "true";
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
    camera.position.set(0, 0, 6.5);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.14;

    scene.add(new THREE.HemisphereLight(0xfff0d7, 0x5a1b0d, 2.1));

    const keyLight = new THREE.DirectionalLight(0xfff0d8, 4.1);
    keyLight.position.set(-3.7, 5.2, 6.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xff713b, 2.6);
    fillLight.position.set(4.8, -1.6, 2.2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffe9c7, 3.4);
    rimLight.position.set(-3.8, 1.8, -4.5);
    scene.add(rimLight);

    const pivot = new THREE.Group();
    scene.add(pivot);

    let targetRotation = -0.48;
    let currentRotation = targetRotation;
    let targetTilt = 0.18;
    let currentTilt = targetTilt;
    let frameId = 0;
    let disposed = false;

    const updateScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      targetRotation = -0.48 + progress * Math.PI * 5.2;
      targetTilt = 0.18 + Math.sin(progress * Math.PI * 2) * 0.42;
    };

    const resize = () => {
      const bounds = stage.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const loader = new GLTFLoader();
    loader.load(
      "/ball.glb",
      ({ scene: model }) => {
        if (disposed) return;
        const bounds = new THREE.Box3().setFromObject(model);
        const center = bounds.getCenter(new THREE.Vector3());
        const size = bounds.getSize(new THREE.Vector3());
        const scale = 2.58 / Math.max(size.x, size.y, size.z);

        model.scale.setScalar(scale);
        model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
        model.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.castShadow = true;
          object.receiveShadow = true;
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => {
              material.side = THREE.DoubleSide;
            });
          } else {
            object.material.side = THREE.DoubleSide;
          }
        });
        pivot.add(model);
        stage.dataset.loaded = "true";
      },
      undefined,
      (error) => {
        console.error("Could not load the Orange Open ball model.", error);
        stage.dataset.unavailable = "true";
      },
    );

    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    const render = () => {
      frameId = window.requestAnimationFrame(render);
      currentRotation += (targetRotation - currentRotation) * 0.065;
      currentTilt += (targetTilt - currentTilt) * 0.055;
      pivot.rotation.y = currentRotation;
      pivot.rotation.x = currentTilt;
      pivot.rotation.z = 0.08 + Math.sin(currentRotation * 0.38) * 0.07;
      renderer.render(scene, camera);
    };
    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateScroll);
      observer.disconnect();
      pivot.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="ball-stage" ref={stageRef} aria-hidden="true">
      <canvas className="ball-canvas" ref={canvasRef} />
      <div className="ball-fallback" />
    </div>
  );
}
