/**
 * Enquiry submission.
 * Replace the body of `submitEnquiry` with a real endpoint: a form
 * service, a serverless function, or a CRM / WhatsApp Business webhook.
 * Attachments arrive as File objects in `payload.files`.
 */
export async function submitEnquiry(payload) {
  await new Promise((resolve) => setTimeout(resolve, 900))
  if (import.meta.env.DEV) console.info('[OyeExpress enquiry]', payload)
  return { ok: true }
}
