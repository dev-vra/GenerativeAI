"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useParallax } from "@/lib/useParallax";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef       = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);

  useParallax([
    { ref: imgRef as React.RefObject<HTMLElement>, factorX: 22, factorY: 16, duration: 1.0 },
  ]);

  useGSAP(
    () => {
      gsap.fromTo(imgRef.current,
        { x: -80, opacity: 0, rotation: -5 },
        { x: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top 85%", end: "40% 50%", scrub: 1.1 },
        }
      );
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 44, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 80%", toggleActions: "play none none reverse" },
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
        position: "relative", zIndex: 1,
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "12vh clamp(1.5rem, 5vw, 5rem)",
        overflow: "hidden",
      }}
    >
      {/* Floating accent image */}
      <div
        ref={imgRef}
        className="img-torn-2"
        style={{
          position: "absolute", left: "2%", bottom: "8%",
          width: "clamp(160px, 20vw, 320px)",
          height: "clamp(200px, 26vw, 400px)",
          opacity: 0,
          transform: "rotate(-5deg)",
          filter: "drop-shadow(0 18px 50px rgba(0,0,0,0.85))",
          zIndex: 2,
        }}
      >
        <img src={IMAGES.cerrado} alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      {/* Glass card */}
      <div
        ref={cardRef}
        className="glass-strong"
        style={{
          position: "relative", zIndex: 10,
          maxWidth: "560px", width: "100%",
          padding: "clamp(2.5rem, 5vw, 4rem)",
          borderRadius: "4px", textAlign: "center",
          opacity: 0,
        }}
      >
        <p style={{
          fontFamily: "var(--font-dm)", fontSize: "0.62rem", fontWeight: 600,
          letterSpacing: "0.35em", textTransform: "uppercase",
          color: "var(--forest-light)", marginBottom: "1.4rem",
        }}>
          Entre em contato
        </p>

        <h2 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
          fontWeight: 400, lineHeight: 1.0,
          color: "var(--cream)", marginBottom: "1rem",
        }}>
          Fale com a{" "}
          <em style={{ fontStyle: "italic", color: "var(--forest-light)" }}>
            Bonini
          </em>
        </h2>

        <p style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
          fontWeight: 300, fontStyle: "italic",
          color: "rgba(237,232,220,0.58)",
          marginBottom: "3rem", lineHeight: 1.6,
        }}>
          Cada projeto começa com uma conversa.
          <br />
          Vamos entender a sua necessidade.
        </p>

        <a
          href="mailto:contato@boniniengenharia.com.br"
          className="glass"
          style={{
            display: "inline-block",
            fontFamily: "var(--font-dm)", fontSize: "0.7rem", fontWeight: 600,
            letterSpacing: "0.24em", textTransform: "uppercase",
            color: "var(--cream)", textDecoration: "none",
            padding: "1rem 2.6rem", borderRadius: "3px",
            transition: "all 0.35s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(61,107,74,0.3)";
            el.style.borderColor = "rgba(157,191,142,0.5)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "";
            el.style.borderColor = "";
          }}
        >
          Enviar E-mail
        </a>

        <p style={{
          fontFamily: "var(--font-dm)", fontSize: "0.62rem", fontWeight: 500,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(237,232,220,0.3)",
          marginTop: "4rem",
        }}>
          Bonini Engenharia e Agronegócios
        </p>
      </div>
    </section>
  );
}
