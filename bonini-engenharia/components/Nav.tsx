"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const links = [
  { label: "Início",    href: "#hero" },
  { label: "Sobre",     href: "#sobre" },
  { label: "Serviços",  href: "#servicos" },
  { label: "Contato",   href: "#contato" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -28, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.4rem clamp(1.5rem, 5vw, 4rem)",
        opacity: 0,
      }}
    >
      {/* Logo — imagem se existir, fallback em texto */}
      <a href="#hero" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img
          src="/logo.png"
          alt="Bonini Engenharia e Agronegócios"
          style={{ height: "36px", width: "auto", filter: "brightness(0) invert(1)", opacity: 0.92 }}
          onError={(e) => {
            const img = e.currentTarget;
            img.style.display = "none";
            const fallback = img.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "block";
          }}
        />
        {/* Fallback texto caso a logo não exista ainda */}
        <span
          className="nav-glow"
          style={{
            display: "none",
            fontFamily: "var(--font-dm)",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--cream)",
          }}
        >
          Bonini
        </span>
      </a>

      {/* Links desktop */}
      <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
        {links.map((l) => (
          <li key={l.href} style={{ display: "none" }}
            className="md-show"
          >
            <a
              href={l.href}
              className="nav-glow"
              style={{
                fontFamily: "var(--font-dm)",
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(237,232,220,0.65)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--cream)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(237,232,220,0.65)")}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <style>{`
        @media (min-width: 768px) { .md-show { display: list-item !important; } }
      `}</style>
    </nav>
  );
}
