
import { Resend } from "resend";
import { NextResponse } from "next/server";
console.log("Email notice API route loaded");
if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");
const resend = new Resend(process.env.RESEND_API_KEY);
console.log("Resend client initialized");
export async function POST(request: Request) {
  try {
    const body = await request.json();
console.log("Received contact form submission:", body);
    // Normalize Strapi / client data
    const raw = body.data ?? {};
    const data = (raw.attributes ?? raw) as Record<string, any>;

    // Map actual contact form fields
    const name         = `${data.Fname ?? ""} ${data.Lname ?? ""}`.trim() || "<no-name>";
    const businessName = data.Business_name ?? "<no-business>";
    const email        = data.emial ?? "<no-email>";  // keep the same typo if that's what you send
    const phone        = data.phone_number ?? "<no-phone>";
    const postalCode   = data.postal_code ?? "<no-postal>";
    const message      = data.message ?? "";

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Business:</strong> ${businessName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Postal Code:</strong> ${postalCode}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;
console.log("Sending email with content:", emailHtml);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "prenako.kosice@gmail.com",
      subject: `Contact Form Submission from ${name}`,
      html: emailHtml,
    });
console.log("Email sent successfully");
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    console.log("Failed to send email");
    return NextResponse.json({ success: false, error });
  }
}