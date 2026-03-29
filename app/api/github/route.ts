import { NextResponse } from "next/server";

// Cache this route's response for 1 hour at the CDN level.
// All serverless instances share this cache — one GitHub API call per hour globally.
export const revalidate = 86400; // 24 hours

const GITHUB_USERNAME = "vivek4879";

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      repositories(
        first: 100
        ownerAffiliations: OWNER
        isFork: false
        privacy: PUBLIC
      ) {
        totalCount
      }
    }
  }
`;

function countToLevel(count: number): number {
  if (count === 0) return 0;
  if (count < 5) return 1;
  if (count < 10) return 2;
  if (count < 20) return 3;
  return 4;
}

function calculateStreak(
  weeks: { contributionDays: { contributionCount: number; date: string }[] }[],
): number {
  // Flatten all days, most recent last
  const days = weeks.flatMap((w) => w.contributionDays);

  // Walk backwards from today, count consecutive days with contributions
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].contributionCount > 0) {
      streak++;
    } else {
      // Allow one gap for today (contributions may not be counted yet)
      if (i === days.length - 1) continue;
      break;
    }
  }
  return streak;
}

export async function GET() {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USERNAME } }),
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "GitHub API error" }, { status: 500 });
  }

  const json = await res.json();
  const user = json?.data?.user;

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const calendar = user.contributionsCollection.contributionCalendar;
  const weeks: number[][] = calendar.weeks.map(
    (w: { contributionDays: { contributionCount: number }[] }) =>
      w.contributionDays.map((d) => countToLevel(d.contributionCount)),
  );

  const data = {
    contributions: calendar.totalContributions,
    repos: user.repositories.totalCount,
    streak: calculateStreak(calendar.weeks),
    weeks, // 52 × 7 grid of levels 0–4
  };

  return NextResponse.json(data);
}
