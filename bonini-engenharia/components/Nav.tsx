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
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, delay: 0.6, ease: "power3.out" }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-7"
      style={{ opacity: 0 }}
    >
      {/* Logo mark */}
      <a
        href="#hero"
        className="nav-glow tracking-[0.25em] uppercase text-[var(--cream)] font-light text-sm"
        style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", letterSpacing: "0.3em" }}
      >
        Bonini
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-10">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="nav-glow text-[0.72rem] tracking-[0.2em] uppercase text-[var(--cream-dim)] hover:text-[var(--cream)] transition-colors duration-300"
              style={{ color: "rgba(237,232,220,0.7)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--cream)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(237,232,220,0.7)")
              }
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile: hamburger placeholder */}
      <button
        className="nav-glow md:hidden text-[var(--cream)] text-xs tracking-widest uppercase"
        aria-label="Menu"
      >
        Menu
      </button>
    </nav>
  );
}
