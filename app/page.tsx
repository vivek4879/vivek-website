export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Gradient mesh blobs — decorative background */}
      {/* Layer 1: Large, faint blobs for depth */}
      <div
        aria-hidden="true"
        className="blob absolute -top-[10%] -left-[5%] h-[500px] w-[500px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "blob-drift-1 20s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        aria-hidden="true"
        className="blob absolute -bottom-[10%] -right-[5%] h-[550px] w-[550px] rounded-full opacity-45"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "blob-drift-2 24s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Layer 2: Medium blobs for color */}
      <div
        aria-hidden="true"
        className="blob absolute top-[15%] right-[20%] h-[350px] w-[350px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "blob-drift-3 16s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        aria-hidden="true"
        className="blob absolute bottom-[20%] left-[15%] h-[300px] w-[300px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "blob-drift-1 18s ease-in-out infinite reverse",
          willChange: "transform",
        }}
      />

      {/* Layer 3: Small, brighter blob for focal point */}
      <div
        aria-hidden="true"
        className="blob absolute top-[40%] left-[45%] h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, #06B6D4 0%, #8B5CF6 50%, transparent 70%)",
          filter: "blur(80px)",
          animation: "blob-drift-2 14s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Noise texture overlay — adds grain to break up smooth gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <h1
          className="text-4xl font-bold tracking-tight sm:text-6xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Vivek
        </h1>
        <p
          className="text-lg text-muted"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          &gt; full-stack engineer
        </p>
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/60 px-8 py-6 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)]">
          <p className="text-sm text-zinc-400">
            This site is currently being built.
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Check back soon.
          </p>
        </div>
        <div className="mt-6 flex gap-6">
          <a
            href="https://github.com/vivek4879"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 transition-colors hover:text-cyan-accent"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/ahervivek/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 transition-colors hover:text-cyan-accent"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            linkedin
          </a>
        </div>
      </main>
    </div>
  );
}
