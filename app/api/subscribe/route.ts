import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Validates input and acks. When you wire a real list provider
// (Buttondown, Resend Audiences, ConvertKit, Mailchimp, etc.) replace
// the body of this handler with a call to that provider's API using a
// server-side env var. See:
//   - https://docs.buttondown.email/api-subscribers-creating-a-subscriber
//   - https://resend.com/docs/api-reference/contacts/create-contact
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // TODO: replace with a real list-provider call.
  console.log(`[subscribe] new signup: ${email}`);

  return NextResponse.json({ ok: true });
}
