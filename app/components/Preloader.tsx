"use client";

import { motion } from "motion/react";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { preloaderAnimation } from "../preloader-animation";

type PreloaderProps = {
  onComplete: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2350);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
      aria-label="Chargement d’Orange Open"
      role="status"
    >
      <div className="preloader-topline">
        <span>ORANGE OPEN</span>
        <span>30.11.26 — FRANCE</span>
      </div>

      <motion.div
        className="preloader-orbit"
        initial={{ scale: 0.72, rotate: -16 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Lottie
          animationData={preloaderAnimation}
          autoplay
          loop
          className="preloader-lottie"
          aria-hidden="true"
        />
        <span className="preloader-mark">O</span>
      </motion.div>

      <div className="preloader-bottomline">
        <div>
          <p>LE MONDE SE JOUE ICI</p>
          <span>Billard américain · tournoi international</span>
        </div>
        <span className="preloader-count">01 / 01</span>
      </div>
      <motion.div
        className="preloader-progress"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.1, ease: [0.6, 0, 0.4, 1] }}
      />
    </motion.div>
  );
}
