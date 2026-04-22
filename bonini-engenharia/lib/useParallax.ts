"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ParallaxTarget {
  ref: React.RefObject<HTMLElement | null>;
  factorX: number;
  factorY: number;
  duration?: number;
}

/**
 * Global parallax driver: responds to mouse, touch and device gyroscope.
 * Pass an array of {ref, factorX, factorY} to animate independently.
 */
export function useParallax(targets: ParallaxTarget[]) {
  const gyroRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const apply = (nx: number, ny: number) => {
      targets.forEach(({ ref, factorX, factorY, duration = 0.9 }) => {
        if (!ref.current) return;
        gsap.to(ref.current, {
          x: nx * factorX,
          y: ny * factorY,
          duration,
          ease: "power1.out",
          overwrite: "auto",
        });
      });
    };

    // ── Mouse ─────────────────────────────────────────────
    const onMouse = (e: MouseEvent) => {
      const nx = (e.clientX - window.innerWidth  / 2) / window.innerWidth;
      const ny = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      apply(nx, ny);
    };

    // ── Touch ─────────────────────────────────────────────
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      const nx = (t.clientX - window.innerWidth  / 2) / window.innerWidth;
      const ny = (t.clientY - window.innerHeight / 2) / window.innerHeight;
      apply(nx, ny);
    };

    // ── Gyroscope (mobile) ────────────────────────────────
    const onGyro = (e: DeviceOrientationEvent) => {
      // gamma: left/right tilt (-90 to 90)
      // beta:  front/back tilt (-180 to 180), ~45° is flat on a table
      const gx = Math.max(-1, Math.min(1, (e.gamma ?? 0) / 30));
      const gy = Math.max(-1, Math.min(1, ((e.beta  ?? 45) - 45) / 30));

      // Smooth the gyro input
      gyroRef.current.x += (gx - gyroRef.current.x) * 0.08;
      gyroRef.current.y += (gy - gyroRef.current.y) * 0.08;

      apply(gyroRef.current.x, gyroRef.current.y);
    };

    window.addEventListener("mousemove",       onMouse,  { passive: true });
    window.addEventListener("touchmove",       onTouch,  { passive: true });
    window.addEventListener("deviceorientation", onGyro, { passive: true });

    return () => {
      window.removeEventListener("mousemove",       onMouse);
      window.removeEventListener("touchmove",       onTouch);
      window.removeEventListener("deviceorientation", onGyro);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
