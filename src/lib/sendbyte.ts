import { renderEnquiry, type Enquiry } from './enquiry-template';

const API_URL = 'https://api.sendbyte.africa/v1/emails';

/**
 * Validates a standard email address format (user@domain.tld).
 */
function isValidEmail(email: string): boolean {
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email.trim());
}

/**
 * Validates sender string which may be an email or "Display Name <email@domain.tld>".
 */
function isValidSender(sender: string): boolean {
  const trimmed = sender.trim();
  return /^(?:[^<@>]+<)?[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>?$/.test(trimmed);
}

/**
 * Reads and validates server-side SendByte environment configuration.
 * Returns null if any required variable is missing or invalid.
 */
export function sendbyteConfig() {
  const apiKey = process.env.SENDBYTE_API_KEY?.trim() || '';
  const from = process.env.SENDBYTE_FROM_EMAIL?.trim() || '';
  const to = process.env.ENQUIRY_TO_EMAIL?.trim() || '';

  const sandbox = apiKey.startsWith('sk_test_');
  const live = apiKey.startsWith('sk_live_');

  // Must have a valid SendByte key prefix and valid email formats
  if (!(sandbox || live) || !isValidSender(from) || !isValidEmail(to)) {
    return null;
  }

  return { apiKey, from, to, sandbox };
}

export type SendEnquiryResult =
  | { accepted: true; id: string; sandbox: boolean }
  | { accepted: false; status?: number; code?: string; message: string };

/**
 * Transports an enquiry email notification to SendByte.
 *
 * Parameters passed to SendByte REST API:
 * - from: Server-configured verified sender address
 * - to: Fixed recipient inbox (never accepted from client)
 * - reply_to: Visitor's validated email address
 * - subject: Fixed notification subject
 * - html: Rendered & escaped HTML notification
 * - text: Plain-text fallback alternative
 * - idempotency_key: Unique enquiry key preventing duplicate sends on retries
 */
export async function sendEnquiry(
  enquiry: Enquiry,
  config: NonNullable<ReturnType<typeof sendbyteConfig>>,
  fetcher: typeof fetch = fetch
): Promise<SendEnquiryResult> {
  const template = renderEnquiry(enquiry);
  const idempotencyKey = `caelum-enquiry-${enquiry.enquiryId}`;

  const response = await fetcher(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify({
      from: config.from,
      to: config.to,
      reply_to: enquiry.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
      idempotency_key: idempotencyKey,
    }),
    signal: AbortSignal.timeout(10_000),
    cache: 'no-store',
  });

  const responseText = await response.text().catch(() => '');
  let receipt: Record<string, unknown> | null = null;
  try {
    receipt = responseText ? JSON.parse(responseText) : null;
  } catch {
    receipt = null;
  }

  // SendByte returns 201 Created or 200 OK or 202 Accepted on success with { "id": "em_..." }
  if (response.status === 200 || response.status === 201 || response.status === 202) {
    if (receipt && typeof receipt.id === 'string' && receipt.id.length > 0) {
      return { accepted: true, id: receipt.id, sandbox: config.sandbox };
    }
  }

  // Log error server-side without exposing API key
  const errObj = receipt?.error as { code?: string; message?: string } | undefined;
  console.error('[SendByte API Error]', {
    status: response.status,
    statusText: response.statusText,
    code: errObj?.code,
    message: errObj?.message || responseText,
  });

  return {
    accepted: false,
    status: response.status,
    code: errObj?.code,
    message: errObj?.message || `SendByte rejected request with HTTP ${response.status}`,
  };
}
