"use server";

import { Resend } from "resend";
import { ExampleEmailTemplate } from "@/emails/registration-confirmation-email";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

export interface SendExampleEmailParams {
  name: string;
  email: string;
}

export async function sendExampleEmail({
  name,
  email,
}: SendExampleEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: "Example <noreply@example.com>",
      to: email,
      subject: "Welcome!",
      react: ExampleEmailTemplate({ name }),
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
