// REMOVED: import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

// ADDED: Declare Deno global for local TypeScript type checking
declare const Deno: any;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    return new Response("Missing RESEND_API_KEY secret", { status: 500, headers: corsHeaders });
  }

  let payload: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    to?: string;
  };

  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400, headers: corsHeaders });
  }

  const {
    name = "Unknown",
    email = "no-email-provided",
    phone = "",
    message = "",
    to,
  } = payload;

  const recipient = to || "hausexport@gmail.com";
  const subject = `New Contact Request from ${name}`;
  const html = `
    <div style="font-family: sans-serif;">
      <h2 style="margin:0 0 8px;">New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "—"}</p>
      <p><strong>Message:</strong></p>
      <div style="white-space: pre-wrap; border: 1px solid #eee; padding: 12px; border-radius: 6px;">${message}</div>
      <hr style="margin:16px 0;border:none;border-top:1px solid #eee;" />
      <p style="color:#666;font-size:12px;">Sent from HausExport contact form.</p>
    </div>
  `;

  const resendResp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Using Resend's onboarding sender for testing; swap to your verified domain when ready.
      from: "onboarding@resend.dev",
      to: [recipient],
      subject,
      html,
    }),
  });

  if (!resendResp.ok) {
    const text = await resendResp.text();
    return new Response(JSON.stringify({ error: text }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const result = await resendResp.json();
  return new Response(JSON.stringify({ id: result.id }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
});