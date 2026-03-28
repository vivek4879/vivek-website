"use client";

import Image from "next/image";
import { useTheme } from "@/lib/theme-provider";

export default function AboutMe() {
  const { mode } = useTheme();

  if (mode === "machine") {
    return (
      <section id="about" className="px-6 py-8">
        <div className="mx-auto max-w-[700px]" style={{ fontFamily: "var(--font-mono)" }}>
          <p className="text-muted">---</p>
          <p className="mt-4 text-heading text-lg font-bold">## About</p>
          <p className="mt-4 text-body">
            I&apos;m Vivek — a full-stack engineer at Q IT Technologies, where
            I&apos;m currently building an AI-native dance choreography platform.
            Before that, I built FavorIt, a React Native mobile app. I&apos;m
            drawn to problems where technology can make a real difference in
            people&apos;s lives.
          </p>
          <p className="mt-4 text-body">
            Right now I&apos;m deep into full-stack development, AI tooling, and
            distributed systems — learning by building, always. I work with
            Claude as a daily pair programming partner, and I think the best way
            to understand something is to ship it.
          </p>
          <p className="mt-4 text-body">
            Outside of code, I&apos;m a PG Wodehouse devotee, a runner, and
            someone who&apos;s happiest outdoors — whether that&apos;s on a
            tennis court, on a trail, or just somewhere with animals and
            countryside. I&apos;m trying to say yes to more things and put
            myself out there.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <p
          className="mb-4 text-xs uppercase tracking-wider text-cyan"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          About
        </p>
        <h2
          className="mb-12 text-3xl font-bold tracking-tight text-heading sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          A bit about me
        </h2>

        {/* Two-column layout: photo left, text right. Stacks on mobile. */}
        <div className="flex flex-col items-start gap-12 md:flex-row md:gap-16">
          {/* Photo */}
          <div className="w-full shrink-0 md:w-[320px]">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                src="/images/vivek_picture.jpeg"
                alt="Photo of Vivek"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
                priority={false}
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-body sm:text-lg">
              I&apos;m Vivek — a full-stack engineer at Q IT Technologies, where
              I&apos;m currently building an AI-native dance choreography
              platform. Before that, I built FavorIt, a React Native mobile app.
              I&apos;m drawn to problems where technology can make a real
              difference in people&apos;s lives.
            </p>
            <p className="text-base leading-relaxed text-body sm:text-lg">
              Right now I&apos;m deep into full-stack development, AI tooling,
              and distributed systems — learning by building, always. I work
              with Claude as a daily pair programming partner, and I think the
              best way to understand something is to ship it.
            </p>
            <p className="text-base leading-relaxed text-body sm:text-lg">
              Outside of code, I&apos;m a PG Wodehouse devotee, a runner, and
              someone who&apos;s happiest outdoors — whether that&apos;s on a
              tennis court, on a trail, or just somewhere with animals and
              countryside. I&apos;m trying to say yes to more things and put
              myself out there.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
