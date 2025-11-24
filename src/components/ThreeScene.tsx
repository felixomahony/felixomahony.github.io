"use client";

import { useEffect, useRef } from "react";
import { SceneManager } from "@/lib/three/SceneManager";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sceneManager = new SceneManager(containerRef.current);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollBottom = scrollTop + clientHeight;

      // Check if at top (within 10px) or bottom (within 10px)
      const isAtTop = scrollTop < 10;
      const isAtBottom = scrollBottom >= scrollHeight - 10;

      // Pause if at top or bottom
      sceneManager.setScrollPause(isAtTop || isAtBottom);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sceneManager.dispose();
    };
  }, []);

  return (
    <div className="relative w-full" style={{ height: "300vh" }}>
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-full"
        style={{
          background:
            "linear-gradient(180deg, #b7edd1 0%, #84e0b1 50%, #53b583 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 p-8">
        <div className="flex flex-col gap-4 font-[family-name:var(--font-roboto-mono)]">
          <p className="text-white text-left max-w-lg">
            Felix O&apos;Mahony is a PhD candidate at Cambridge University.
            Supervised by Roberto Cipolla and Ayush Tewari. His research focuses
            on 3D computer vision.
          </p>
          <nav className="flex flex-row gap-4">
            <a
              href="https://www.linkedin.com/in/felix-o-mahony-37851213a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-75 transition-opacity whitespace-nowrap"
            >
              LinkedIn
            </a>
            <a
              href="https://scholar.google.com/citations?user=pGRdscoAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-75 transition-opacity whitespace-nowrap"
            >
              Scholar
            </a>
            <a
              href="mailto:firstlast_no_apostrophe@gmail.com"
              className="text-white hover:opacity-75 transition-opacity whitespace-nowrap"
            >
              Mail
            </a>
            <a
              href="https://github.com/felixomahony"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-75 transition-opacity whitespace-nowrap"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
