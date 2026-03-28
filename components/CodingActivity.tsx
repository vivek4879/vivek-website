"use client";

import { useTheme } from "@/lib/theme-provider";

// Placeholder data — will be replaced with live API calls later
const stats = {
  github: {
    contributions: 847,
    streak: 23,
    repos: 18,
  },
  leetcode: {
    solved: 142,
    easy: 58,
    medium: 67,
    hard: 17,
    streak: 12,
  },
};

// Generate a fake contribution grid (52 weeks × 7 days)
// Will be replaced with real GitHub data
function generatePlaceholderGrid(): number[][] {
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      // Weighted random: more 0s and 1s, fewer 3s and 4s
      const rand = Math.random();
      if (rand < 0.3) week.push(0);
      else if (rand < 0.55) week.push(1);
      else if (rand < 0.75) week.push(2);
      else if (rand < 0.9) week.push(3);
      else week.push(4);
    }
    weeks.push(week);
  }
  return weeks;
}

const contributionGrid = generatePlaceholderGrid();

const CYAN_LEVELS = [
  "bg-zinc-800",        // 0 — no contributions
  "bg-cyan-900/60",     // 1
  "bg-cyan-700/70",     // 2
  "bg-cyan-500/80",     // 3
  "bg-cyan-400",        // 4
];

const VIOLET_LEVELS = [
  "bg-zinc-800",
  "bg-violet-900/60",
  "bg-violet-700/70",
  "bg-violet-500/80",
  "bg-violet-400",
];

export default function CodingActivity() {
  const { mode } = useTheme();

  if (mode === "machine") {
    return (
      <section id="activity" className="px-6 py-8">
        <div className="mx-auto max-w-[700px]" style={{ fontFamily: "var(--font-mono)" }}>
          <p className="text-muted">---</p>
          <p className="mt-4 text-lg font-bold text-heading">## Coding Activity</p>
          <p className="mt-4 text-body">
            GitHub: {stats.github.contributions} contributions | {stats.github.streak} day streak | {stats.github.repos} repos
          </p>
          <p className="mt-2 text-body">
            LeetCode: {stats.leetcode.solved} solved ({stats.leetcode.easy} easy, {stats.leetcode.medium} medium, {stats.leetcode.hard} hard) | {stats.leetcode.streak} day streak
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
            <StatItem value={stats.github.contributions} label="contributions" color="text-cyan-400" />
            <StatItem value={stats.leetcode.solved} label="problems solved" color="text-violet-400" />
            <StatItem value={stats.github.streak} label="day streak" color="text-cyan-400" />
            <StatItem value={stats.github.repos} label="public repos" color="text-zinc-400" />
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
                  {contributionGrid.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((level, di) => (
                        <div
                          key={di}
                          className={`h-[10px] w-[10px] rounded-sm ${CYAN_LEVELS[level]} transition-colors`}
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
                  solved={stats.leetcode.easy}
                  total={800}
                  color="bg-green-500"
                  textColor="text-green-400"
                />
                <ProgressBar
                  label="Medium"
                  solved={stats.leetcode.medium}
                  total={1700}
                  color="bg-yellow-500"
                  textColor="text-yellow-400"
                />
                <ProgressBar
                  label="Hard"
                  solved={stats.leetcode.hard}
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
                  {stats.leetcode.solved}
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

function StatItem({ value, label, color }: { value: number; label: string; color: string }) {
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
