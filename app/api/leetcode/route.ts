import { NextResponse } from "next/server";

const LEETCODE_USERNAME = "atlantic_ocean";

// 24-hour CDN-level cache — LeetCode stats don't change by the minute
export const revalidate = 86400;

export async function GET() {
  const res = await fetch(
    `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`,
    { next: { revalidate: 86400 } },
  );

  if (!res.ok) {
    return NextResponse.json({ error: "LeetCode API error" }, { status: 500 });
  }

  const json = await res.json();

  const data = {
    solved: json.solvedProblem ?? 0,
    easy: json.easySolved ?? 0,
    medium: json.mediumSolved ?? 0,
    hard: json.hardSolved ?? 0,
  };

  return NextResponse.json(data);
}
