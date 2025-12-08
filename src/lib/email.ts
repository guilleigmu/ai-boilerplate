"use server";

import fs from "node:fs";
import path from "node:path";
import { Resend } from "resend";
import { RegistrationConfirmationEmail } from "@/emails/registration-confirmation-email";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

const rulesFilepath = path.join(
  process.cwd(),
  "public",
  "normativa-magnetic.pdf",
);
const rulesAttachment = fs.readFileSync(rulesFilepath).toString("base64");

const logoFilepath = path.join(process.cwd(), "public", "logo.png");
const logoAttachment = fs.readFileSync(logoFilepath).toString("base64");

export interface SendRegistrationEmailParams {
  name: string;
  email: string;
}

export async function sendRegistrationEmail({
  name,
  email,
}: SendRegistrationEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Magnetic Pole Studio <registro@magneticpolestudio.com>",
      to: email,
      subject: "¡Bienvenido/a a Magnetic Pole Studio!",
      react: RegistrationConfirmationEmail({ name }),
      attachments: [
        {
          content: rulesAttachment,
          filename: "normativa-magnetic.pdf",
        },
        {
          content: logoAttachment,
          filename: "logo.png",
          contentId: "logo",
        },
      ],
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error: error.message };
    }

    console.log("Registration email sent successfully:", data);
    return { success: true };
  } catch (error) {
    console.error("Registration email error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
