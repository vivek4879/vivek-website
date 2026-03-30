"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-provider";

type GitHubData = {
  contributions: number;
  repos: number;
  streak: number;
  weeks: number[][];
};

type LeetCodeData = {
  solved: number;
  easy: number;
  medium: number;
  hard: number;
};

// GitHub's exact contribution graph colors (light / dark mode)
const GITHUB_COLORS_LIGHT = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const GITHUB_COLORS_DARK  = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];


export default function CodingActivity() {
  const { mode, theme } = useTheme();
  const githubColors = theme === "dark" ? GITHUB_COLORS_DARK : GITHUB_COLORS_LIGHT;
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => setGithub(data))
      .catch(() => {});

    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((data) => setLeetcode(data))
      .catch(() => {});
  }, []);

  // Use real data if loaded, show "—" while loading
  const contributions = github?.contributions ?? "—";
  const repos = github?.repos ?? "—";
  const streak = github?.streak ?? "—";
  const grid = github?.weeks ?? Array(52).fill(Array(7).fill(0));

  const lcSolved = leetcode?.solved ?? "—";
  const lcEasy = leetcode?.easy ?? 0;
  const lcMedium = leetcode?.medium ?? 0;
  const lcHard = leetcode?.hard ?? 0;

  if (mode === "machine") {
    return (
      <section id="activity" className="px-6 py-8">
        <div className="mx-auto max-w-[700px]" style={{ fontFamily: "var(--font-mono)" }}>
          <p className="text-muted">---</p>
          <p className="mt-4 text-lg font-bold text-heading">## Coding Activity</p>
          <p className="mt-4 text-body">
            GitHub: {contributions} contributions | {streak} day streak | {repos} repos
          </p>
          <p className="mt-2 text-body">
            LeetCode: {lcSolved} solved ({lcEasy} easy, {lcMedium} medium, {lcHard} hard)
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="activity" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <p
          className="mb-4 text-xs uppercase tracking-wider text-cyan"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Activity
        </p>
        <h2
          className="mb-12 text-3xl font-bold tracking-tight text-heading sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          I ship code and sharpen fundamentals
        </h2>

        {/* Terminal-style card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {/* Terminal header — three dots */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span
              className="ml-3 text-xs text-muted"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              coding-activity
            </span>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 border-b border-border px-6 py-4 sm:gap-10">
            <StatItem value={contributions} label="contributions" color="text-cyan-400" />
            <StatItem value={lcSolved} label="problems solved" color="text-violet-400" />
            <StatItem value={streak} label="day streak" color="text-cyan-400" />
            <StatItem value={repos} label="public repos" color="text-zinc-400" />
          </div>

          {/* Grids */}
          <div className="flex flex-col gap-8 p-6 lg:flex-row lg:gap-10">
            {/* GitHub Contributions */}
            <div className="flex-1">
              <p
                className="mb-4 text-xs uppercase tracking-wider text-cyan-400"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                GitHub Contributions
              </p>
              <div className="overflow-x-auto">
                <div className="flex gap-[3px]">
                  {grid.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((level: number, di: number) => (
                        <div
                          key={di}
                          className="h-[10px] w-[10px] rounded-sm transition-colors"
                          style={{ backgroundColor: githubColors[level] }}
                          title={`${level} contributions`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* LeetCode Stats */}
            <div className="flex-1 lg:max-w-[320px]">
              <p
                className="mb-4 text-xs uppercase tracking-wider text-violet-400"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                LeetCode Progress
              </p>
              <div className="flex flex-col gap-4">
                <ProgressBar
                  label="Easy"
                  solved={lcEasy}
                  total={800}
                  color="bg-green-500"
                  textColor="text-green-400"
                />
                <ProgressBar
                  label="Medium"
                  solved={lcMedium}
                  total={1700}
                  color="bg-yellow-500"
                  textColor="text-yellow-400"
                />
                <ProgressBar
                  label="Hard"
                  solved={lcHard}
                  total={750}
                  color="bg-red-500"
                  textColor="text-red-400"
                />
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span
                  className="text-3xl font-bold text-violet-400"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {lcSolved}
                </span>
                <span
                  className="text-xs text-zinc-500"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  / 3250 problems
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({
  value,
  label,
  color,
}: {
  value: number | string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className={`text-2xl font-bold ${color}`}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {value}
      </span>
      <span
        className="text-xs text-zinc-500"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </span>
    </div>
  );
}

function ProgressBar({
  label,
  solved,
  total,
  color,
  textColor,
}: {
  label: string;
  solved: number;
  total: number;
  color: string;
  textColor: string;
}) {
  const percentage = (solved / total) * 100;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span
          className={`text-xs ${textColor}`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {label}
        </span>
        <span
          className="text-xs text-zinc-500"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {solved}/{total}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
