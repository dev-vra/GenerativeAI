"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutSection() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const stickyRef      = useRef<HTMLDivElement>(null);
  const mainImgRef     = useRef<HTMLDivElement>(null);
  const smallImgRef    = useRef<HTMLDivElement>(null);
  const textBlockRef   = useRef<HTMLDivElement>(null);
  const lineRefs       = useRef<HTMLElement[]>([]);

  const addLine = (el: HTMLElement | null) => {
    if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el);
  };

  useGSAP(
    () => {
      // Main photo slides in from left
      gsap.fromTo(
        mainImgRef.current,
        { x: -80, opacity: 0, rotation: -4 },
        {
          x: 0,
          opacity: 1,
          rotation: -3,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "40% 50%",
            scrub: 1.2,
          },
        }
      );

      // Small photo slides in from right
      gsap.fromTo(
        smallImgRef.current,
        { x: 60, opacity: 0, rotation: 6 },
        {
          x: 0,
          opacity: 1,
          rotation: 5,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "15% 85%",
            end: "55% 50%",
            scrub: 1,
          },
        }
      );

      // Text block reveal
      gsap.fromTo(
        textBlockRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textBlockRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Lines stagger in
      if (lineRefs.current.length) {
        gsap.fromTo(
          lineRefs.current,
          { clipPath: "inset(100% 0 0 0)", y: 12 },
          {
            clipPath: "inset(0% 0 0 0)",
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: textBlockRef.current,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
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
        position: "relative",
        minHeight: "100vh",
        padding: "10vh 0 14vh",
        overflow: "hidden",
      }}
    >
      <div
        ref={stickyRef}
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 6rem)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ── Left: image collage ── */}
        <div style={{ position: "relative", height: "clamp(480px, 65vh, 780px)" }}>
          {/* Main large photo */}
          <div
            ref={mainImgRef}
            className="img-torn-1"
            style={{
              position: "absolute",
              top: "5%",
              left: "0",
              width: "75%",
              height: "82%",
              opacity: 0,
              filter: "drop-shadow(0 24px 56px rgba(0,0,0,0.75))",
              transform: "rotate(-4deg)",
            }}
          >
            <img
              src={IMAGES.fieldWork}
              alt="Equipe em campo"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Small accent photo */}
          <div
            ref={smallImgRef}
            className="img-torn-4"
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "52%",
              height: "48%",
              opacity: 0,
              filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.8))",
              transform: "rotate(5deg)",
            }}
          >
            <img
              src={IMAGES.forestMist}
              alt="Floresta ao amanhecer"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>

        {/* ── Right: text ── */}
        <div ref={textBlockRef} style={{ opacity: 0 }}>
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
            Sobre nós
          </p>

          <h2
            ref={addLine}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "var(--cream)",
              marginBottom: "2rem",
            }}
          >
            Técnica que{" "}
            <em style={{ fontStyle: "italic", color: "var(--forest-light)" }}>
              respeita
            </em>
            <br />a floresta
          </h2>

          <p
            ref={addLine}
            style={{
              fontFamily: "var(--font-dm)",
              fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
              lineHeight: 1.8,
              color: "rgba(237,232,220,0.7)",
              marginBottom: "1.4rem",
              maxWidth: "44ch",
            }}
          >
            A Bonini Engenharia atua em projetos ambientais e florestais com
            rigor técnico e profundo compromisso com os biomas brasileiros.
            Entendemos que cada laudo, cada inventário e cada licença são
            parte de um ecossistema maior — o do futuro que queremos preservar.
          </p>

          <p
            ref={addLine}
            style={{
              fontFamily: "var(--font-dm)",
              fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
              lineHeight: 1.8,
              color: "rgba(237,232,220,0.55)",
              maxWidth: "44ch",
            }}
          >
            Nossa equipe une expertise técnica a conhecimento de campo,
            atuando em licenciamento ambiental, manejo florestal, regularização
            fundiária e diagnósticos ambientais em todo o território nacional.
          </p>

          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              gap: "3rem",
            }}
          >
            {[
              { num: "21+", label: "Serviços oferecidos" },
              { num: "MT",  label: "Mato Grosso & Brasil" },
            ].map((stat) => (
              <div key={stat.num}>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                    fontWeight: 300,
                    color: "var(--green-vivid)",
                    lineHeight: 1,
                  }}
                >
                  {stat.num}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(237,232,220,0.45)",
                    marginTop: "0.4rem",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: stack layout */}
      <style>{`
        @media (max-width: 768px) {
          #sobre > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
