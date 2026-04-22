"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef        = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const imgAccentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // BG zooms in (inverse of hero) as we reach the end
      gsap.fromTo(
        bgRef.current,
        { scale: 0.88 },
        {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Accent image enters from left
      gsap.fromTo(
        imgAccentRef.current,
        { x: -80, opacity: 0, rotation: -6 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "40% 50%",
            scrub: 1,
          },
        }
      );

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contato"
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* BG image — zooms in on approach */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-8%",
          willChange: "transform",
        }}
      >
        <img
          src={IMAGES.waterBody}
          alt="Natureza"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(7,17,10,0.55) 0%, rgba(7,17,10,0.88) 100%)",
          }}
        />
      </div>

      {/* Accent torn image */}
      <div
        ref={imgAccentRef}
        className="img-torn-2"
        style={{
          position: "absolute",
          left: "2%",
          bottom: "8%",
          width: "clamp(180px, 22vw, 340px)",
          height: "clamp(220px, 28vw, 420px)",
          opacity: 0,
          filter: "drop-shadow(0 16px 48px rgba(0,0,0,0.8))",
          transform: "rotate(-5deg)",
          zIndex: 2,
        }}
      >
        <img
          src={IMAGES.cerrado}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 clamp(1.5rem, 6vw, 8rem)",
          opacity: 0,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm)",
            fontSize: "0.65rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--forest-light)",
            marginBottom: "1.4rem",
          }}
        >
          Entre em contato
        </p>

        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 300,
            lineHeight: 1.0,
            color: "var(--cream)",
            marginBottom: "1rem",
          }}
        >
          Fale com a{" "}
          <em style={{ fontStyle: "italic", color: "var(--forest-light)" }}>
            Bonini
          </em>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(237,232,220,0.6)",
            marginBottom: "3.5rem",
            maxWidth: "40ch",
            margin: "0 auto 3.5rem",
          }}
        >
          Cada projeto começa com uma conversa.
          <br />
          Vamos entender a sua necessidade.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            alignItems: "center",
          }}
        >
          <a
            href="mailto:contato@boniniengenharia.com.br"
            style={{
              fontFamily: "var(--font-dm)",
              fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--cream)",
              textDecoration: "none",
              padding: "1rem 2.8rem",
              border: "1px solid rgba(157,191,142,0.4)",
              transition: "all 0.35s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(61,107,74,0.25)";
              el.style.borderColor = "rgba(157,191,142,0.8)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.borderColor = "rgba(157,191,142,0.4)";
            }}
          >
            Enviar e-mail
          </a>

          <p
            style={{
              fontFamily: "var(--font-dm)",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              color: "rgba(237,232,220,0.4)",
              textTransform: "uppercase",
            }}
          >
            Ou via WhatsApp
          </p>
        </div>

        {/* Bottom tagline */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.8rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(157,191,142,0.35)",
            marginTop: "6rem",
          }}
        >
          Bonini Engenharia — Ambiental & Florestal
        </p>
      </div>
    </section>
  );
}
