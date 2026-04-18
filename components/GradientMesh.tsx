"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme-provider";

interface BlobState {
  el: HTMLDivElement;
  x: number;
  y: number;
  lerpFactor: number;
}

// Blob config: each blob has a color, size, blur, opacity, and lerp speed.
// Larger blobs move slower (heavy/atmospheric), smaller move faster (reactive).
const BLOB_CONFIG = [
  // Large background blobs — slow, diffuse, set the base atmosphere
  { color: "#06B6D4", size: 600, blur: 120, opacity: 0.6, lerp: 0.02, offsetX: -200, offsetY: -150 },
  { color: "#7C3AED", size: 650, blur: 120, opacity: 0.5, lerp: 0.025, offsetX: 200, offsetY: 100 },
  // Medium blobs — the main color presence
  { color: "#8B5CF6", size: 400, blur: 90, opacity: 0.7, lerp: 0.04, offsetX: 150, offsetY: -100 },
  { color: "#0891B2", size: 380, blur: 80, opacity: 0.65, lerp: 0.045, offsetX: -180, offsetY: 120 },
  { color: "#A78BFA", size: 350, blur: 85, opacity: 0.6, lerp: 0.05, offsetX: 80, offsetY: 180 },
  // Small accent blobs — reactive, brighter, create focal points
  { color: "#22D3EE", size: 220, blur: 60, opacity: 0.8, lerp: 0.07, offsetX: -50, offsetY: -80 },
  { color: "#06B6D4", mix: "#8B5CF6", size: 180, blur: 60, opacity: 0.75, lerp: 0.08, offsetX: 30, offsetY: 50 },
] as const;

// CSS keyframe animation names for mobile fallback
const DRIFT_ANIMATIONS = [
  "blob-drift-1 22s ease-in-out infinite",
  "blob-drift-2 26s ease-in-out infinite",
  "blob-drift-3 18s ease-in-out infinite",
  "blob-drift-1 20s ease-in-out infinite reverse",
  "blob-drift-2 24s ease-in-out infinite",
  "blob-drift-3 16s ease-in-out infinite reverse",
  "blob-drift-1 14s ease-in-out infinite",
];

export default function GradientMesh() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<BlobState[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isMobile = window.matchMedia("(hover: none)").matches;
    const container = containerRef.current;
    if (!container) return;

    const blobEls = Array.from(container.querySelectorAll<HTMLDivElement>("[data-blob]"));
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    blobsRef.current = blobEls.map((el, i) => ({
      el,
      // Start each blob at its offset position from center
      x: centerX + (BLOB_CONFIG[i]?.offsetX ?? 0),
      y: centerY + (BLOB_CONFIG[i]?.offsetY ?? 0),
      lerpFactor: BLOB_CONFIG[i]?.lerp ?? 0.05,
    }));

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function animate() {
      const { x: mx, y: my } = mouseRef.current;

      blobsRef.current.forEach((blob, i) => {
        // Each blob follows cursor but offset by its config position
        // This keeps blobs spread out instead of all converging on cursor
        const targetX = mx + (BLOB_CONFIG[i]?.offsetX ?? 0);
        const targetY = my + (BLOB_CONFIG[i]?.offsetY ?? 0);

        blob.x += (targetX - blob.x) * blob.lerpFactor;
        blob.y += (targetY - blob.y) * blob.lerpFactor;

        blob.el.style.transform = `translate(calc(${blob.x}px - 50%), calc(${blob.y}px - 50%))`;
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    if (!isMobile) {
      // Desktop: disable CSS animations, enable cursor tracking
      blobsRef.current.forEach((blob) => {
        blob.el.style.animation = "none";
      });
      mouseRef.current = { x: centerX, y: centerY };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      {/* Gradient blobs */}
      {BLOB_CONFIG.map((blob, i) => (
        <div
          key={i}
          data-blob
          className="blob absolute rounded-full"
          style={{
            top: 0,
            left: 0,
            width: blob.size,
            height: blob.size,
            opacity: isLight ? blob.opacity * 0.9 : blob.opacity,
            background: "mix" in blob && blob.mix
              ? `radial-gradient(circle, ${blob.color} 0%, ${blob.mix} 50%, transparent 70%)`
              : `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: `blur(${blob.blur}px)`,
            willChange: "transform",
            animation: DRIFT_ANIMATIONS[i],
          }}
        />
      ))}

      {/* Dark wash + grain — dark mode only */}
      {!isLight && <div className="absolute inset-0 bg-black/15" />}
      {!isLight && (
        <div
          className="noise-overlay absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />
      )}
    </div>
  );
}
