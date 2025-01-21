import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { to, subject, html } = await req.json();

    // Initialize SMTP client
    const client = new SmtpClient();

    // Configure connection using environment variables
    await client.connectTLS({
      hostname: Deno.env.get("SMTP_HOSTNAME")!,
      port: Number(Deno.env.get("SMTP_PORT")),
      username: Deno.env.get("SMTP_USERNAME")!,
      password: Deno.env.get("SMTP_PASSWORD")!,
    });

    // Send email
    await client.send({
      from: Deno.env.get("SMTP_FROM_EMAIL")!,
      to: to,
      subject: subject,
      content: html,
      html: html,
    });

    // Close connection
    await client.close();

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Failed to send email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
