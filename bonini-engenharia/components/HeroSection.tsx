"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroSection() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);

  // Scroll-driven refs (outer wrapper)
  const bgScrollRef    = useRef<HTMLDivElement>(null);
  const leftScrollRef  = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const textRef        = useRef<HTMLDivElement>(null);
  const taglineRef     = useRef<HTMLDivElement>(null);

  // Mouse parallax refs (inner wrapper)
  const bgMouseRef    = useRef<HTMLDivElement>(null);
  const leftMouseRef  = useRef<HTMLDivElement>(null);
  const rightMouseRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // ── BG: zoom out as user scrolls ──────────────────────
      gsap.fromTo(
        bgScrollRef.current,
        { scale: 1.35 },
        {
          scale: 0.82,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.8,
          },
        }
      );

      // ── Left image: enters from left ──────────────────────
      gsap.fromTo(
        leftScrollRef.current,
        { x: "-120%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "12% top",
            end: "55% top",
            scrub: 1.2,
          },
        }
      );

      // ── Right image: enters from right ───────────────────
      gsap.fromTo(
        rightScrollRef.current,
        { x: "120%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "22% top",
            end: "65% top",
            scrub: 1.2,
          },
        }
      );

      // ── Hero text reveal ──────────────────────────────────
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.6, ease: "power3.out", delay: 0.3 }
      ).fromTo(
        taglineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=0.8"
      );

      // ── Text floats up as scroll progresses ───────────────
      gsap.to(textRef.current, {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "30% top",
          end: "60% top",
          scrub: 1,
        },
      });

      // ── Mouse / Touch parallax ────────────────────────────
      const handleMouseMove = (e: MouseEvent) => {
        const nx = (e.clientX - window.innerWidth  / 2) / window.innerWidth;
        const ny = (e.clientY - window.innerHeight / 2) / window.innerHeight;

        gsap.to(bgMouseRef.current,    { x: nx * 22,  y: ny * 16,  duration: 0.9, ease: "power1.out" });
        gsap.to(leftMouseRef.current,  { x: nx * -32, y: ny * -22, duration: 0.9, ease: "power1.out" });
        gsap.to(rightMouseRef.current, { x: nx * 28,  y: ny * 20,  duration: 0.9, ease: "power1.out" });
      };

      // Gyroscope fallback for mobile
      const handleOrientation = (e: DeviceOrientationEvent) => {
        const nx = ((e.gamma  ?? 0) / 45) * 0.6;
        const ny = ((e.beta   ?? 0) / 45) * 0.4;

        gsap.to(bgMouseRef.current,    { x: nx * 18,  y: ny * 12,  duration: 1, ease: "power1.out" });
        gsap.to(leftMouseRef.current,  { x: nx * -24, y: ny * -18, duration: 1, ease: "power1.out" });
        gsap.to(rightMouseRef.current, { x: nx * 22,  y: ny * 16,  duration: 1, ease: "power1.out" });
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("deviceorientation", handleOrientation);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{ height: "220vh", position: "relative" }}
    >
      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "var(--forest-dark)",
        }}
      >
        {/* ── BG Forest image ─────────────────────────────── */}
        <div
          ref={bgScrollRef}
          style={{
            position: "absolute",
            inset: "-8%",
            willChange: "transform",
          }}
        >
          <div ref={bgMouseRef} style={{ width: "100%", height: "100%" }}>
            <img
              src={IMAGES.heroForest}
              alt="Floresta densa vista do alto"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            {/* Dark vignette overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at center, rgba(7,17,10,0.1) 0%, rgba(7,17,10,0.65) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* ── Left torn image ─────────────────────────────── */}
        <div
          ref={leftScrollRef}
          style={{
            position: "absolute",
            left: "-2%",
            bottom: "8%",
            width: "clamp(260px, 34vw, 520px)",
            aspectRatio: "3/4",
            willChange: "transform",
            opacity: 0,
          }}
        >
          <div
            ref={leftMouseRef}
            className="img-torn-2"
            style={{
              width: "100%",
              height: "100%",
              transform: "rotate(-5deg) skewX(-0.8deg)",
              filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.8))",
            }}
          >
            <img
              src={IMAGES.forestLight}
              alt="Floresta com luz"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>

        {/* ── Right torn image ────────────────────────────── */}
        <div
          ref={rightScrollRef}
          style={{
            position: "absolute",
            right: "-2%",
            top: "6%",
            width: "clamp(220px, 28vw, 440px)",
            aspectRatio: "4/5",
            willChange: "transform",
            opacity: 0,
          }}
        >
          <div
            ref={rightMouseRef}
            className="img-torn-3"
            style={{
              width: "100%",
              height: "100%",
              transform: "rotate(4deg) skewY(0.5deg)",
              filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.8))",
            }}
          >
            <img
              src={IMAGES.treeTrunk}
              alt="Árvore nativa"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>

        {/* ── Center text ─────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div ref={textRef} style={{ opacity: 0 }}>
            <p
              className="nav-glow"
              style={{
                fontFamily: "var(--font-dm)",
                fontSize: "clamp(0.6rem, 1.2vw, 0.8rem)",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "var(--forest-light)",
                marginBottom: "1.2rem",
              }}
            >
              Engenharia Ambiental e Florestal
            </p>

            <h1
              className="nav-glow"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                color: "var(--cream)",
              }}
            >
              Bonini
            </h1>
          </div>

          <div
            ref={taglineRef}
            style={{ opacity: 0, marginTop: "2rem" }}
          >
            <p
              className="nav-glow"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1rem, 2.2vw, 1.5rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "rgba(237,232,220,0.7)",
                letterSpacing: "0.05em",
              }}
            >
              Protegendo o que a terra oferece
            </p>
          </div>
        </div>

        {/* ── Scroll hint ─────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            zIndex: 10,
          }}
        >
          <p
            className="nav-glow"
            style={{
              fontFamily: "var(--font-dm)",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(237,232,220,0.4)",
            }}
          >
            Scroll
          </p>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, rgba(237,232,220,0.4), transparent)",
              animation: "scrollLine 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50%  { opacity: 1; transform: scaleY(1); transform-origin: top; }
          100% { opacity: 0; transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
