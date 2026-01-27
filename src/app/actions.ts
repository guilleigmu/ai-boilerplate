"use server";

import { waitlistSchema } from "@/lib/validations/waitlist";

export async function joinWaitlist(formData: FormData) {
  const result = waitlistSchema.safeParse({
    email: formData.get("email"),
  });

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  const { email } = result.data;

  try {
    // TODO: Plug in your own backend here.
    // Examples:
    //   - Supabase: await supabase.from("waitlist").insert({ email })
    //   - Mailchimp: await addToMailchimpAudience(email)
    //   - Airtable: await airtable("Waitlist").create({ Email: email })
    //   - Resend: await resend.contacts.create({ email, audienceId: "..." })
    console.log("Waitlist signup:", email);

    return { success: true, error: null };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
