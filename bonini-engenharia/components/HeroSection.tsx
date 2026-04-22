"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useParallax } from "@/lib/useParallax";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroSection() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const leftImgRef     = useRef<HTMLDivElement>(null);
  const rightImgRef    = useRef<HTMLDivElement>(null);
  const textRef        = useRef<HTMLDivElement>(null);
  const taglineRef     = useRef<HTMLDivElement>(null);
  const scrollHintRef  = useRef<HTMLDivElement>(null);

  // Parallax on floating images (different layers = different depth)
  useParallax([
    { ref: leftImgRef  as React.RefObject<HTMLElement>, factorX: -28, factorY: -18, duration: 1.0 },
    { ref: rightImgRef as React.RefObject<HTMLElement>, factorX:  24, factorY:  20, duration: 0.8 },
  ]);

  useGSAP(
    () => {
      // ── Left image: enters from far left ─────────────────
      gsap.fromTo(
        leftImgRef.current,
        { x: "-130%", opacity: 0 },
        {
          x: "0%", opacity: 1, ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "10% top", end: "55% top", scrub: 1.3,
          },
        }
      );

      // ── Right image: enters from far right ───────────────
      gsap.fromTo(
        rightImgRef.current,
        { x: "130%", opacity: 0 },
        {
          x: "0%", opacity: 1, ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "20% top", end: "65% top", scrub: 1.3,
          },
        }
      );

      // ── Hero text entrance ────────────────────────────────
      const tl = gsap.timeline();
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 36, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.8, ease: "power3.out", delay: 0.2 }
      ).fromTo(
        taglineRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=0.9"
      ).fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.4"
      );

      // ── Text drifts up + fades as user scrolls past ───────
      gsap.to([textRef.current, taglineRef.current], {
        y: -80, opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "28% top", end: "58% top", scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{ height: "220vh", position: "relative", zIndex: 1 }}
    >
      <div
        style={{
          position: "sticky", top: 0,
          height: "100vh", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {/* ── Left floating torn image ─────────────────────── */}
        <div
          ref={leftImgRef}
          style={{
            position: "absolute",
            left: "clamp(-20px, -2vw, 10px)",
            bottom: "clamp(4%, 8vh, 80px)",
            width: "clamp(220px, 30vw, 460px)",
            aspectRatio: "3/4",
            opacity: 0,
            willChange: "transform",
            zIndex: 3,
          }}
        >
          <div
            className="img-torn-2"
            style={{
              width: "100%", height: "100%",
              transform: "rotate(-5deg) skewX(-0.6deg)",
              filter: "drop-shadow(0 24px 56px rgba(0,0,0,0.85))",
            }}
          >
            <img src={IMAGES.forestLight} alt="Floresta"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>

        {/* ── Right floating torn image ────────────────────── */}
        <div
          ref={rightImgRef}
          style={{
            position: "absolute",
            right: "clamp(-20px, -1vw, 15px)",
            top: "clamp(5%, 8vh, 70px)",
            width: "clamp(180px, 24vw, 380px)",
            aspectRatio: "4/5",
            opacity: 0,
            willChange: "transform",
            zIndex: 3,
          }}
        >
          <div
            className="img-torn-3"
            style={{
              width: "100%", height: "100%",
              transform: "rotate(4.5deg) skewY(0.4deg)",
              filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.85))",
            }}
          >
            <img src={IMAGES.treeTrunk} alt="Árvore nativa"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>

        {/* ── Center text ──────────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", pointerEvents: "none" }}>
          <div ref={textRef} style={{ opacity: 0 }}>
            <p className="nav-glow" style={{
              fontFamily: "var(--font-dm)",
              fontSize: "clamp(0.58rem, 1vw, 0.72rem)",
              fontWeight: 500,
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "var(--forest-light)",
              marginBottom: "1.4rem",
            }}>
              Engenharia Ambiental e Florestal
            </p>

            <h1 className="nav-glow" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(4rem, 10vw, 9rem)",
              fontWeight: 400,
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              color: "var(--cream)",
            }}>
              Bonini
            </h1>
          </div>

          <div ref={taglineRef} style={{ opacity: 0, marginTop: "2.2rem" }}>
            <p className="nav-glow" style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1rem, 2vw, 1.45rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(237,232,220,0.65)",
              letterSpacing: "0.06em",
            }}>
              Protegendo o que a terra oferece
            </p>
          </div>
        </div>

        {/* ── Scroll hint ───────────────────────────────────── */}
        <div ref={scrollHintRef} style={{
          position: "absolute", bottom: "2.5rem", left: "50%",
          transform: "translateX(-50%)", opacity: 0,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem",
          zIndex: 10, pointerEvents: "none",
        }}>
          <p className="nav-glow" style={{
            fontFamily: "var(--font-dm)", fontSize: "0.56rem",
            letterSpacing: "0.38em", textTransform: "uppercase",
            color: "rgba(237,232,220,0.35)", fontWeight: 500,
          }}>
            Scroll
          </p>
          <div style={{
            width: "1px", height: "44px",
            background: "linear-gradient(to bottom, rgba(157,191,142,0.5), transparent)",
            animation: "scrollLine 1.8s ease-in-out infinite",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { opacity:0; transform:scaleY(0); transform-origin:top; }
          50%  { opacity:1; transform:scaleY(1); transform-origin:top; }
          100% { opacity:0; transform:scaleY(1); transform-origin:bottom; }
        }
      `}</style>
    </section>
  );
}
