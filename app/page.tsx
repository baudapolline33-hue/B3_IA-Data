"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { PoolBall } from "./components/PoolBall";
import { Preloader } from "./components/Preloader";

const eventDate = new Date("2026-11-30T10:00:00+01:00").getTime();

function Countdown() {
  const [days, setDays] = useState("61");

  useEffect(() => {
    const update = () => {
      const remaining = Math.max(0, eventDate - Date.now());
      setDays(String(Math.floor(remaining / (1000 * 60 * 60 * 24))).padStart(2, "0"));
    };
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdown" aria-label={`${days} jours avant Orange Open`}>
      <span className="countdown-number">{days}</span>
      <span className="countdown-copy">
        <b>JOURS</b>
        <span>AVANT LE COUP D’ENVOI</span>
      </span>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#accueil" aria-label="Orange Open — accueil">
        <span className="brand-mark">O<span>O</span></span>
        <span className="brand-name">
          <b>ORANGE</b>
          <span>OPEN · 2026</span>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Navigation principale">
        <a href="#tournoi">LE TOURNOI</a>
        <a href="#ville">LA VILLE</a>
        <a href="#infos">LE RENDEZ-VOUS</a>
      </nav>

      <a className="header-cta" href="#infos">
        <span>RESTER INFORMÉ</span>
        <ArrowUpRight size={15} strokeWidth={1.8} />
      </a>
    </header>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

function SectionEyebrow({ number, children }: { number: string; children: string }) {
  return (
    <div className="section-eyebrow">
      <span>{number}</span>
      <span className="eyebrow-rule" />
      <span>{children}</span>
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  return (
    <>
      <AnimatePresence>{loading && <Preloader onComplete={finishLoading} />}</AnimatePresence>
      <ScrollProgress />
      <PoolBall />
      <Header />

      <main className="relative min-h-screen">
        <section className="hero section-orange" id="accueil">
          <div className="hero-coordinate" aria-hidden="true">
            <span>44°08′ N</span>
            <span>04°48′ E</span>
          </div>

          <div className="hero-content">
            <motion.p
              className="eyebrow hero-eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.48, duration: 0.65 }}
            >
              BILLARD AMÉRICAIN <span>·</span> TOURNOI INTERNATIONAL
            </motion.p>

            <h1 className="hero-title">
              <motion.span
                initial={{ opacity: 0, y: 78, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 2.52, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                LE MONDE
              </motion.span>
              <motion.span
                className="hero-title-indent"
                initial={{ opacity: 0, y: 78, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 2.66, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                SE JOUE
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 78, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 2.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                À ORANGE<span className="title-period">.</span>
              </motion.span>
            </h1>

            <motion.div
              className="hero-bottom"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.02, duration: 0.65 }}
            >
              <p className="hero-deck">
                Dans deux mois, les meilleurs joueurs de la planète se retrouvent au cœur du
                Vaucluse.
              </p>
              <a className="round-link" href="#tournoi" aria-label="Découvrir le tournoi">
                <ArrowDown size={19} strokeWidth={1.6} />
              </a>
            </motion.div>
          </div>

          <div className="hero-stamp" aria-hidden="true">
            <span>30</span>
            <span>NOV</span>
            <span>2026</span>
          </div>

          <motion.div
            className="hero-foot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.08, duration: 0.7 }}
          >
            <span>ORANGE, VAUCLUSE — FRANCE</span>
            <span className="hero-foot-center">ORANGE OPEN · ÉDITION 2026</span>
            <span>SCROLL TO PLAY <MoveUpRight size={12} /></span>
          </motion.div>
        </section>

        <div className="marquee" aria-label="Orange Open — les meilleurs joueurs du monde">
          <div className="marquee-track">
            {[0, 1, 2, 3].map((item) => (
              <span className="marquee-group" key={item} aria-hidden={item > 0}>
                LES MEILLEURS JOUEURS DU MONDE <i>✳</i> ORANGE, FRANCE <i>✳</i> DANS DEUX MOIS <i>✳</i>
              </span>
            ))}
          </div>
        </div>

        <section className="tournament section-ink" id="tournoi">
          <div className="tournament-inner">
            <SectionEyebrow number="01" >LE TOURNOI</SectionEyebrow>
            <div className="tournament-grid">
              <div className="tournament-copy">
                <motion.h2
                  initial={{ opacity: 0, y: 42 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  Une table.<br />
                  <span>Le monde entier.</span>
                </motion.h2>
                <p>
                  Les meilleurs joueurs de la planète se retrouvent à Orange pour un rendez-vous
                  international. Une table, une ville, et toute la tension du billard américain.
                </p>
                <a className="text-link" href="#ville">
                  POURQUOI ORANGE <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="tournament-details">
                <div className="detail-row">
                  <span className="detail-index">A.</span>
                  <div>
                    <span className="detail-label">LE TERRAIN DE JEU</span>
                    <b>Billard américain</b>
                  </div>
                  <span className="detail-mark">↗</span>
                </div>
                <div className="detail-row">
                  <span className="detail-index">B.</span>
                  <div>
                    <span className="detail-label">LE CASTING</span>
                    <b>L’élite mondiale</b>
                  </div>
                  <span className="detail-mark">↗</span>
                </div>
                <div className="detail-row">
                  <span className="detail-index">C.</span>
                  <div>
                    <span className="detail-label">LE RENDEZ-VOUS</span>
                    <b>30 novembre 2026</b>
                  </div>
                  <span className="detail-mark">↗</span>
                </div>
                <div className="detail-footnote">
                  <span>UN NOUVEAU CHAPITRE</span>
                  <span>84° DE PRÉCISION <i>✳</i></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="city section-cream" id="ville">
          <div className="city-inner">
            <SectionEyebrow number="02">LA VILLE</SectionEyebrow>
            <div className="city-grid">
              <div className="city-heading-wrap">
                <p className="city-kicker">SUD DE LA FRANCE · PROVENCE</p>
                <motion.h2
                  initial={{ opacity: 0, y: 38 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  Orange.<br />
                  <span>Le décor.</span>
                </motion.h2>
              </div>

              <div className="city-note">
                <div className="city-orbit" aria-hidden="true">
                  <span className="orbit-cross orbit-cross-one" />
                  <span className="orbit-cross orbit-cross-two" />
                  <span className="orbit-dot" />
                  <span className="orbit-label">44°08′ N / 04°48′ E</span>
                  <span className="orbit-city">ORANGE</span>
                </div>
                <p>
                  Une ville de caractère, au cœur du Vaucluse. Le monde du billard américain s’y
                  donne rendez-vous pour écrire la suite.
                </p>
                <span className="city-coordinates">VAUCLUSE · 84 · FRANCE</span>
              </div>
            </div>

            <div className="city-bottomline">
              <span>UNE VILLE À L’ACCENT DU SUD</span>
              <span className="city-bottom-mark">O.</span>
              <span>LE MONDE À LA TABLE</span>
            </div>
          </div>
        </section>

        <section className="finale section-orange" id="infos">
          <div className="finale-inner">
            <SectionEyebrow number="03">LE COMPTE À REBOURS</SectionEyebrow>
            <div className="finale-grid">
              <div className="finale-copy">
                <p className="finale-overline">ORANGE OPEN · 30 NOVEMBRE 2026</p>
                <h2>
                  Le prochain<br />
                  coup se joue <span>ici.</span>
                </h2>
                <p className="finale-deck">
                  Dans deux mois, la planète billard aura les yeux tournés vers Orange.
                </p>
                <a className="finale-cta" href="#accueil">
                  REVENIR AU DÉPART <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="finale-countdown">
                <Countdown />
                <div className="countdown-date">
                  <span>LE RENDEZ-VOUS</span>
                  <b>30.11.2026</b>
                  <span>ORANGE · FRANCE</span>
                </div>
                <div className="countdown-asterisk">✳</div>
              </div>
            </div>
          </div>
          <footer className="site-footer">
            <a className="footer-brand" href="#accueil">ORANGE OPEN<span>✳</span></a>
            <span>BILLARD AMÉRICAIN · TOURNOI INTERNATIONAL</span>
            <a href="#accueil" className="footer-top">HAUT DE PAGE <ArrowUpRight size={13} /></a>
            <span className="footer-year">© 2026</span>
          </footer>
        </section>
      </main>
    </>
  );
}
