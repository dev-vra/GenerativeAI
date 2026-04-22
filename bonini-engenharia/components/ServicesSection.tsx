"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useParallax } from "@/lib/useParallax";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Scene {
  id: string; label: string; title: string; sub: string;
  description: string; items: string[];
  imgA: string; imgB: string;
  clsA: string; clsB: string;
  rotA: string; rotB: string;
}

const SCENES: Scene[] = [
  {
    id: "licenciamento", label: "01", title: "Licenciamento", sub: "Ambiental",
    description: "Da LAC simplificada ao EIA-RIMA completo, conduzimos cada etapa com precisão técnica e relacionamento institucional consolidado.",
    items: ["LAC / LAS", "Plano de Controle Ambiental", "EIA-RIMA", "PGRS", "Diagnóstico Ambiental"],
    imgA: IMAGES.forestLight, imgB: IMAGES.aerialField,
    clsA: "img-torn-1", clsB: "img-torn-3", rotA: "rotate(-4deg)", rotB: "rotate(5deg)",
  },
  {
    id: "florestal", label: "02", title: "Manejo &", sub: "Inventário Florestal",
    description: "Inventários, planos de exploração e manejo sustentável — registrando cada árvore com dados de campo que sustentam decisões técnicas e legais.",
    items: ["Inventário Florestal", "PEF", "PMFS", "PRA", "CC-SEMA"],
    imgA: IMAGES.heroForest, imgB: IMAGES.deforestation,
    clsA: "img-torn-2", clsB: "img-torn-4", rotA: "rotate(-6deg)", rotB: "rotate(3.5deg)",
  },
  {
    id: "car", label: "03", title: "CAR &", sub: "Georreferenciamento",
    description: "Regularizamos imóveis rurais com georreferenciamento preciso, inscrição e retificação de CAR e toda a regularização fundiária do Código Florestal.",
    items: ["Cadastro Ambiental Rural (CAR)", "Georreferenciamento", "Regularização Fundiária", "Outorga de Poço", "Laudo ITR"],
    imgA: IMAGES.aerialField, imgB: IMAGES.cerrado,
    clsA: "img-torn-5", clsB: "img-torn-2", rotA: "rotate(4deg)", rotB: "rotate(-5deg)",
  },
  {
    id: "laudos", label: "04", title: "Laudos &", sub: "Diagnósticos",
    description: "Contestações de embargo, tipologia, hidrografia, queima controlada — laudos com embasamento científico e respaldo jurídico.",
    items: ["Contestação de Embargo", "Contestação de Tipologia", "AQC", "DLA", "Corte de Árvores Isoladas"],
    imgA: IMAGES.river, imgB: IMAGES.forestFloor,
    clsA: "img-torn-3", clsB: "img-torn-1", rotA: "rotate(-3deg)", rotB: "rotate(6deg)",
  },
];

function ServiceBlock({ scene }: { scene: Scene }) {
  const blockRef  = useRef<HTMLDivElement>(null);
  const imgARef   = useRef<HTMLDivElement>(null);
  const imgBRef   = useRef<HTMLDivElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);

  useParallax([
    { ref: imgARef as React.RefObject<HTMLElement>, factorX: -22, factorY: -16, duration: 1.0 },
    { ref: imgBRef as React.RefObject<HTMLElement>, factorX:  20, factorY:  18, duration: 0.85 },
  ]);

  useGSAP(
    () => {
      gsap.fromTo(imgARef.current,
        { x: "-115%", opacity: 0 },
        { x: "0%", opacity: 1, ease: "none",
          scrollTrigger: { trigger: blockRef.current, start: "top 92%", end: "42% 50%", scrub: 1.2 },
        }
      );
      gsap.fromTo(imgBRef.current,
        { x: "115%", opacity: 0 },
        { x: "0%", opacity: 1, ease: "none",
          scrollTrigger: { trigger: blockRef.current, start: "18% 92%", end: "58% 50%", scrub: 1.2 },
        }
      );
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 44, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 78%", toggleActions: "play none none reverse" },
        }
      );
    },
    { scope: blockRef }
  );

  return (
    <div
      ref={blockRef}
      style={{
        position: "relative", minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "8vh clamp(1.5rem, 5vw, 5rem)",
        overflow: "hidden",
      }}
    >
      {/* Image A — large left */}
      <div
        ref={imgARef}
        className={scene.clsA}
        style={{
          position: "absolute", left: "-3%",
          top: "50%", transform: `translateY(-50%) ${scene.rotA}`,
          width: "clamp(200px, 32vw, 520px)",
          height: "clamp(260px, 44vw, 660px)",
          opacity: 0,
          filter: "drop-shadow(0 24px 60px rgba(0,0,0,0.85))",
          zIndex: 2,
        }}
      >
        <img src={scene.imgA} alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      {/* Image B — smaller right */}
      <div
        ref={imgBRef}
        className={scene.clsB}
        style={{
          position: "absolute", right: "1%", bottom: "7%",
          width: "clamp(160px, 22vw, 360px)",
          height: "clamp(200px, 28vw, 460px)",
          opacity: 0,
          filter: "drop-shadow(0 18px 48px rgba(0,0,0,0.88))",
          zIndex: 2,
        }}
      >
        <img src={scene.imgB} alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      {/* Glass card — center */}
      <div
        ref={cardRef}
        className="glass-strong"
        style={{
          position: "relative", zIndex: 10,
          maxWidth: "520px", width: "100%",
          padding: "clamp(2rem, 4vw, 3.2rem)",
          borderRadius: "4px", opacity: 0,
          textAlign: "center",
        }}
      >
        <p style={{
          fontFamily: "var(--font-dm)", fontSize: "0.58rem", fontWeight: 600,
          letterSpacing: "0.35em", textTransform: "uppercase",
          color: "var(--forest-light)", marginBottom: "1rem",
        }}>
          {scene.label} / {scene.title.replace("\n", " ")}
        </p>

        <h2 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
          fontWeight: 400, lineHeight: 1.04,
          color: "var(--cream)", marginBottom: "1.4rem",
        }}>
          {scene.title}
          <br />
          <em style={{ fontStyle: "italic", color: "var(--forest-light)" }}>
            {scene.sub}
          </em>
        </h2>

        <p style={{
          fontFamily: "var(--font-dm)", fontSize: "clamp(0.84rem, 1.1vw, 0.94rem)",
          lineHeight: 1.8, color: "rgba(237,232,220,0.65)",
          marginBottom: "1.8rem",
        }}>
          {scene.description}
        </p>

        {/* Service tags */}
        <ul style={{
          listStyle: "none", display: "flex",
          flexWrap: "wrap", gap: "0.4rem", justifyContent: "center",
        }}>
          {scene.items.map((item) => (
            <li
              key={item}
              className="glass-subtle"
              style={{
                fontFamily: "var(--font-dm)", fontSize: "0.58rem", fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "rgba(157,191,142,0.82)",
                padding: "0.28rem 0.65rem", borderRadius: "2px",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );
    },
    { scope: headerRef }
  );

  return (
    <section id="servicos" style={{ position: "relative", zIndex: 1 }}>
      {/* Header */}
      <div ref={headerRef} style={{
        padding: "14vh clamp(1.5rem, 5vw, 5rem) 2vh",
        textAlign: "center", opacity: 0,
      }}>
        <p style={{
          fontFamily: "var(--font-dm)", fontSize: "0.62rem", fontWeight: 600,
          letterSpacing: "0.35em", textTransform: "uppercase",
          color: "var(--forest-light)", marginBottom: "1rem",
        }}>
          O que fazemos
        </p>
        <h2 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(2.6rem, 5vw, 5rem)",
          fontWeight: 400, color: "var(--cream)", lineHeight: 1,
        }}>
          Serviços
        </h2>
        <div style={{
          width: "1px", height: "56px",
          background: "linear-gradient(to bottom, var(--forest-accent), transparent)",
          margin: "2rem auto 0",
        }} />
      </div>

      {SCENES.map((s) => <ServiceBlock key={s.id} scene={s} />)}
    </section>
  );
}
