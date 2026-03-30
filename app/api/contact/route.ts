import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiter: max 3 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  // Rate limiting — get IP from header (Vercel sets x-forwarded-for)
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Server-side validation — never trust the client
  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as Record<string, unknown>).name !== "string" ||
    typeof (body as Record<string, unknown>).email !== "string" ||
    typeof (body as Record<string, unknown>).message !== "string"
  ) {
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });
  }

  const { name, email, message } = body as {
    name: string;
    email: string;
    message: string;
  };

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (trimmedName.length < 2) {
    return NextResponse.json({ error: "Name too short." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  if (trimmedMessage.length < 10) {
    return NextResponse.json({ error: "Message too short." }, { status: 400 });
  }
  if (trimmedMessage.length > 5000) {
    return NextResponse.json({ error: "Message too long." }, { status: 400 });
  }

  // Send email
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "vivek4879@gmail.com",
    replyTo: trimmedEmail,
    subject: `Portfolio message from ${trimmedName}`,
    text: `From: ${trimmedName} <${trimmedEmail}>\n\n${trimmedMessage}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
