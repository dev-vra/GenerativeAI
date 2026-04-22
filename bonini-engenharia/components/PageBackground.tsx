"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useParallax } from "@/lib/useParallax";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PageBackground() {
  const imgRef     = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // ── Global scroll-driven zoom out (entire page) ──────────
  useGSAP(() => {
    gsap.fromTo(
      imgRef.current,
      { scale: 1.5 },
      {
        scale: 1.0,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 2.5,
        },
      }
    );

    // Overlay darkens slightly in the middle of the page, lightens at end
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0.55 },
      {
        opacity: 0.38,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      }
    );
  });

  // ── Parallax: mouse / touch / gyro ───────────────────────
  useParallax([
    { ref: imgRef as React.RefObject<HTMLElement>, factorX: 18, factorY: 12, duration: 1.2 },
  ]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: "-6%",
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <img
        ref={imgRef}
        src={IMAGES.heroForest}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 40%",
          willChange: "transform",
          display: "block",
        }}
      />
      {/* Radial vignette so text stays readable */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(7,17,10,0.25) 0%, rgba(7,17,10,0.72) 100%)",
        }}
      />
    </div>
  );
}
