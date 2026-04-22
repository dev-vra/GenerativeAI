"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IMAGES } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ServiceScene {
  id: string;
  label: string;
  title: string;
  description: string;
  items: string[];
  imgA: string;
  imgB: string;
  imgAClass: string;
  imgBClass: string;
  rotateA: string;
  rotateB: string;
  fromA: { x: string };
  fromB: { x: string };
}

const SCENES: ServiceScene[] = [
  {
    id:    "licenciamento",
    label: "01 / Licenciamento",
    title: "Licenciamento\nAmbiental",
    description:
      "Da LAC simplificada ao EIA-RIMA completo, conduzimos cada etapa do licenciamento com precisão técnica e relacionamento institucional consolidado.",
    items: ["LAC / LAS", "Plano de Controle Ambiental", "EIA-RIMA", "PGRS", "Diagnóstico Ambiental"],
    imgA: IMAGES.forestLight,
    imgB: IMAGES.aerialField,
    imgAClass: "img-torn-1",
    imgBClass: "img-torn-3",
    rotateA: "rotate(-4deg)",
    rotateB: "rotate(5deg)",
    fromA: { x: "-110%" },
    fromB: { x: "110%"  },
  },
  {
    id:    "florestal",
    label: "02 / Projetos Florestais",
    title: "Manejo &\nInventário Florestal",
    description:
      "Elaboramos inventários, planos de exploração e manejo sustentável — registrando cada árvore, cada talhão, com dados de campo que sustentam decisões técnicas e legais.",
    items: ["Inventário Florestal", "Plano de Exploração Florestal (PEF)", "PMFS", "PRA", "CC-SEMA"],
    imgA: IMAGES.heroForest,
    imgB: IMAGES.deforestation,
    imgAClass: "img-torn-2",
    imgBClass: "img-torn-4",
    rotateA: "rotate(-6deg)",
    rotateB: "rotate(3deg)",
    fromA: { x: "-110%" },
    fromB: { x: "110%"  },
  },
  {
    id:    "car",
    label: "03 / CAR & Regularização",
    title: "CAR &\nGeorreferenciamento",
    description:
      "Regularizamos imóveis rurais com georreferenciamento preciso, inscrição e retificação de CAR e toda a regularização fundiária exigida pelo Código Florestal.",
    items: ["Cadastro Ambiental Rural (CAR)", "Georreferenciamento de imóveis rurais", "Regularização Fundiária", "Outorga de Poço", "Laudo ITR"],
    imgA: IMAGES.aerialField,
    imgB: IMAGES.cerrado,
    imgAClass: "img-torn-5",
    imgBClass: "img-torn-2",
    rotateA: "rotate(4deg)",
    rotateB: "rotate(-5deg)",
    fromA: { x: "-110%" },
    fromB: { x: "110%"  },
  },
  {
    id:    "laudos",
    label: "04 / Laudos & Diagnósticos",
    title: "Laudos Técnicos\n& Diagnósticos",
    description:
      "Contestações de embargo, contestação de tipologia, hidrografia, queima controlada e muito mais — laudos elaborados com embasamento científico e respaldo jurídico.",
    items: ["Laudo de Contestação de Embargo", "Contestação de Tipologia/Hidrografia", "Autorização de Queima Controlada (AQC)", "Corte de Árvores Isoladas", "Declaração de Limpeza de Área (DLA)"],
    imgA: IMAGES.river,
    imgB: IMAGES.forestFloor,
    imgAClass: "img-torn-3",
    imgBClass: "img-torn-1",
    rotateA: "rotate(-3deg)",
    rotateB: "rotate(6deg)",
    fromA: { x: "-110%" },
    fromB: { x: "110%"  },
  },
];

function ServiceBlock({ scene }: { scene: ServiceScene }) {
  const blockRef  = useRef<HTMLDivElement>(null);
  const imgARef   = useRef<HTMLDivElement>(null);
  const imgBRef   = useRef<HTMLDivElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Image A: slides in
      gsap.fromTo(
        imgARef.current,
        { x: scene.fromA.x, opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: blockRef.current,
            start: "top 90%",
            end: "40% 50%",
            scrub: 1.1,
          },
        }
      );

      // Image B: slides in from opposite
      gsap.fromTo(
        imgBRef.current,
        { x: scene.fromB.x, opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: blockRef.current,
            start: "15% 90%",
            end: "55% 50%",
            scrub: 1.1,
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: blockRef }
  );

  const titleLines = scene.title.split("\n");

  return (
    <div
      ref={blockRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "10vh clamp(1.5rem, 5vw, 6rem)",
        overflow: "hidden",
      }}
    >
      {/* Image A — large, left */}
      <div
        ref={imgARef}
        className={scene.imgAClass}
        style={{
          position: "absolute",
          left: "-4%",
          top: "50%",
          transform: `translateY(-50%) ${scene.rotateA}`,
          width: "clamp(240px, 36vw, 580px)",
          height: "clamp(320px, 48vw, 720px)",
          opacity: 0,
          filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.8))",
          zIndex: 1,
        }}
      >
        <img
          src={scene.imgA}
          alt={scene.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Image B — smaller, right */}
      <div
        ref={imgBRef}
        className={scene.imgBClass}
        style={{
          position: "absolute",
          right: "2%",
          bottom: "8%",
          width: "clamp(180px, 24vw, 380px)",
          height: "clamp(220px, 32vw, 500px)",
          opacity: 0,
          filter: "drop-shadow(0 16px 48px rgba(0,0,0,0.85))",
          zIndex: 1,
        }}
      >
        <img
          src={scene.imgB}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Text — center */}
      <div
        ref={textRef}
        style={{
          position: "relative",
          zIndex: 10,
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "560px",
          padding: "3rem",
          textAlign: "center",
          opacity: 0,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm)",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--forest-light)",
            marginBottom: "1.2rem",
          }}
        >
          {scene.label}
        </p>

        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "var(--cream)",
            marginBottom: "1.6rem",
            textShadow: "0 2px 30px rgba(7,17,10,0.9)",
          }}
        >
          {titleLines.map((line, i) => (
            <span key={i} style={{ display: "block" }}>
              {i === 1 ? (
                <em style={{ fontStyle: "italic", color: "var(--forest-light)" }}>
                  {line}
                </em>
              ) : (
                line
              )}
            </span>
          ))}
        </h2>

        <p
          style={{
            fontFamily: "var(--font-dm)",
            fontSize: "clamp(0.85rem, 1.2vw, 0.98rem)",
            lineHeight: 1.8,
            color: "rgba(237,232,220,0.65)",
            marginBottom: "1.8rem",
            textShadow: "0 1px 12px rgba(7,17,10,0.8)",
          }}
        >
          {scene.description}
        </p>

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
          }}
        >
          {scene.items.map((item) => (
            <li
              key={item}
              style={{
                fontFamily: "var(--font-dm)",
                fontSize: "0.62rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(157,191,142,0.8)",
                padding: "0.3rem 0.7rem",
                border: "1px solid rgba(61,107,74,0.4)",
                borderRadius: "2px",
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
  return (
    <section id="servicos" style={{ position: "relative" }}>
      {/* Section header */}
      <div
        style={{
          padding: "12vh clamp(1.5rem, 5vw, 6rem) 4vh",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm)",
            fontSize: "0.65rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--forest-light)",
            marginBottom: "1rem",
          }}
        >
          O que fazemos
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.8rem, 5vw, 5rem)",
            fontWeight: 300,
            color: "var(--cream)",
            lineHeight: 1,
          }}
        >
          Serviços
        </h2>
      </div>

      {/* Subtle divider */}
      <div
        style={{
          width: "1px",
          height: "60px",
          background: "linear-gradient(to bottom, var(--forest-accent), transparent)",
          margin: "0 auto 0",
        }}
      />

      {SCENES.map((scene) => (
        <ServiceBlock key={scene.id} scene={scene} />
      ))}
    </section>
  );
}
