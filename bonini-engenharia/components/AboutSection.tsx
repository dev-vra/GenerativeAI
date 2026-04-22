"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useParallax } from "@/lib/useParallax";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainImgRef   = useRef<HTMLDivElement>(null);
  const smallImgRef  = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const lineRefs     = useRef<HTMLElement[]>([]);

  const addLine = (el: HTMLElement | null) => {
    if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el);
  };

  useParallax([
    { ref: mainImgRef  as React.RefObject<HTMLElement>, factorX: -20, factorY: -14, duration: 1.1 },
    { ref: smallImgRef as React.RefObject<HTMLElement>, factorX:  18, factorY:  16, duration: 0.9 },
  ]);

  useGSAP(
    () => {
      gsap.fromTo(mainImgRef.current,
        { x: -90, opacity: 0, rotation: -5 },
        { x: 0, opacity: 1, rotation: -4, ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top 88%", end: "45% 50%", scrub: 1.2 },
        }
      );

      gsap.fromTo(smallImgRef.current,
        { x: 70, opacity: 0, rotation: 7 },
        { x: 0, opacity: 1, rotation: 5.5, ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "15% 88%", end: "60% 50%", scrub: 1 },
        }
      );

      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 78%", toggleActions: "play none none reverse" },
        }
      );

      if (lineRefs.current.length) {
        gsap.fromTo(lineRefs.current,
          { clipPath: "inset(0 0 100% 0)", y: 14 },
          { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.9, ease: "power3.out", stagger: 0.13,
            scrollTrigger: { trigger: cardRef.current, start: "top 74%", toggleActions: "play none none reverse" },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="sobre"
      ref={containerRef}
      style={{
        position: "relative", zIndex: 1,
        minHeight: "100vh",
        padding: "12vh clamp(1.5rem, 5vw, 5rem) 14vh",
      }}
    >
      <div style={{
        maxWidth: "1360px", margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(2rem, 4vw, 5rem)",
        alignItems: "center",
      }}>
        {/* ── Left: floating image collage ── */}
        <div style={{ position: "relative", height: "clamp(420px, 60vh, 720px)" }}>
          <div
            ref={mainImgRef}
            className="img-torn-1"
            style={{
              position: "absolute", top: "4%", left: "0",
              width: "74%", height: "80%",
              opacity: 0,
              transform: "rotate(-4deg)",
              filter: "drop-shadow(0 28px 60px rgba(0,0,0,0.82))",
              zIndex: 2,
            }}
          >
            <img src={IMAGES.fieldWork} alt="Equipe em campo"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>

          <div
            ref={smallImgRef}
            className="img-torn-4"
            style={{
              position: "absolute", bottom: "0", right: "0",
              width: "50%", height: "46%",
              opacity: 0,
              transform: "rotate(5.5deg)",
              filter: "drop-shadow(0 18px 44px rgba(0,0,0,0.88))",
              zIndex: 3,
            }}
          >
            <img src={IMAGES.forestMist} alt="Floresta ao amanhecer"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>

        {/* ── Right: glass card ── */}
        <div
          ref={cardRef}
          className="glass-strong"
          style={{
            opacity: 0, padding: "clamp(2rem, 4vw, 3.5rem)",
            borderRadius: "4px",
          }}
        >
          <p style={{
            fontFamily: "var(--font-dm)", fontSize: "0.62rem", fontWeight: 600,
            letterSpacing: "0.35em", textTransform: "uppercase",
            color: "var(--forest-light)", marginBottom: "1.4rem",
          }}>
            Sobre nós
          </p>

          <h2 ref={addLine} style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
            fontWeight: 400, lineHeight: 1.06,
            color: "var(--cream)", marginBottom: "1.8rem",
          }}>
            Técnica que{" "}
            <em style={{ fontStyle: "italic", color: "var(--forest-light)" }}>
              respeita
            </em>
            <br />a floresta
          </h2>

          <p ref={addLine} style={{
            fontFamily: "var(--font-dm)", fontSize: "clamp(0.88rem, 1.2vw, 0.98rem)",
            lineHeight: 1.82, color: "rgba(237,232,220,0.72)", marginBottom: "1.2rem", maxWidth: "42ch",
          }}>
            A Bonini Engenharia e Agronegócios atua com rigor técnico e profundo
            compromisso com os biomas brasileiros. Cada laudo, cada inventário e
            cada licença fazem parte de um sistema maior — o futuro que queremos
            preservar.
          </p>

          <p ref={addLine} style={{
            fontFamily: "var(--font-dm)", fontSize: "clamp(0.88rem, 1.2vw, 0.98rem)",
            lineHeight: 1.82, color: "rgba(237,232,220,0.52)", maxWidth: "42ch",
          }}>
            Nossa equipe une expertise técnica a conhecimento de campo —
            licenciamento ambiental, manejo florestal, regularização fundiária e
            diagnósticos em todo o território nacional.
          </p>

          {/* Stats */}
          <div style={{ marginTop: "2.8rem", display: "flex", gap: "3rem" }}>
            {[
              { num: "21+", label: "Serviços" },
              { num: "MT",  label: "Mato Grosso & Brasil" },
            ].map((s) => (
              <div key={s.num}>
                <p style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400,
                  color: "var(--green-vivid)", lineHeight: 1,
                }}>
                  {s.num}
                </p>
                <p style={{
                  fontFamily: "var(--font-dm)", fontSize: "0.6rem", fontWeight: 500,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "rgba(237,232,220,0.4)", marginTop: "0.35rem",
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #sobre > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
