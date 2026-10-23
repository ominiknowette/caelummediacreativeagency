import { NextResponse } from 'next/server';
import { brandStrategy, contentBankPackages, managementPackages } from '@/data/caelum';
import { dispatchEnquiryEmail, getEmailConfig } from '@/lib/email-service';
import type { Enquiry } from '@/lib/enquiry-template';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 12_000;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; reset: number }>();

const services = new Set([
  'social-media-management',
  'content-bank',
  'growth-marketing',
  'brand-strategy',
  'not-sure',
]);

const packages: Record<string, Set<string>> = {
  'social-media-management': new Set(managementPackages.map((item) => item.id)),
  'content-bank': new Set(contentBankPackages.map((item) => item.id)),
  'brand-strategy': new Set(brandStrategy.map((item) => item.id)),
};

const limits: Record<string, number> = {
  name: 120,
  email: 254,
  business: 160,
  phone: 40,
  service: 60,
  package: 100,
  website: 240,
  message: 3000,
  startDate: 10,
  websiteCheck: 120,
  enquiryId: 36,
  submittedAt: 24,
};

const error = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

export async function GET() {
  const config = getEmailConfig();
  return NextResponse.json(
    {
      configured: Boolean(config),
      provider: config?.provider || null,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(request: Request) {
  const config = getEmailConfig();
  if (!config) {
    return error('Online enquiries are currently unavailable', 503);
  }

  // Verify same-origin
  const origin = request.headers.get('origin');
  const rawHost = request.headers.get('x-forwarded-host') || request.headers.get('host');
  const host = rawHost?.split(',')[0]?.trim();
  if (origin && host) {
    let originHost: string;
    try {
      originHost = new URL(origin).host;
    } catch {
      return error('Invalid request origin', 403);
    }
    if (originHost !== host) {
      return error('Invalid request origin', 403);
    }
  }

  // Header & size safeguards
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return error('Invalid content type', 415);
  }
  if (Number(request.headers.get('content-length') || 0) > MAX_BODY_BYTES) {
    return error('Request too large', 413);
  }

  // In-memory rate limiter safeguards (5 attempts per IP per 15 minutes)
  const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  if (attempts.size > 5000) {
    attempts.forEach((entry, ip) => {
      if (entry.reset <= now) attempts.delete(ip);
    });
  }
  const previous = attempts.get(key);
  const current = previous && previous.reset > now ? previous : { count: 0, reset: now + WINDOW_MS };
  if (current.count >= MAX_ATTEMPTS) {
    return error('Too many enquiries. Please try again later.', 429);
  }
  current.count++;
  attempts.set(key, current);

  // Read and parse request body safely
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return error('Invalid request', 400);
  }
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return error('Request too large', 413);
  }

  let input: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return error('Invalid request', 400);
    }
    input = parsed as Record<string, unknown>;
  } catch {
    return error('Invalid request', 400);
  }

  // Check for unexpected fields (strict schema enforcement)
  if (Object.keys(input).some((k) => !(k in limits))) {
    return error('Invalid fields', 400);
  }

  const values: Record<string, string> = {};
  for (const [k, limit] of Object.entries(limits)) {
    const val = input[k];
    if (val !== undefined && typeof val !== 'string') {
      return error('Invalid fields', 400);
    }
    values[k] = (val || '').trim();
    if (values[k].length > limit || /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(values[k])) {
      return error('Please check field lengths', 400);
    }
  }

  // Spam protection: honeypot check
  if (values.websiteCheck) {
    return error('Invalid request', 400);
  }

  // Required field checks
  if (
    !values.name ||
    !values.business ||
    !values.message ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  ) {
    return error('Please check required fields', 400);
  }

  if (!services.has(values.service)) {
    return error('Choose a valid service', 400);
  }
  if (values.package && !packages[values.service]?.has(values.package)) {
    return error('Choose a valid package', 400);
  }
  if (values.startDate && !/^\d{4}-\d{2}-\d{2}$/.test(values.startDate)) {
    return error('Choose a valid date', 400);
  }
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(values.enquiryId)) {
    return error('Invalid enquiry reference', 400);
  }
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(values.submittedAt)) {
    return error('Invalid submission timestamp', 400);
  }

  const submittedTime = Date.parse(values.submittedAt);
  if (!Number.isFinite(submittedTime) || submittedTime < now - 24 * 60 * 60 * 1000 || submittedTime > now + 5 * 60 * 1000) {
    return error('Invalid submission timestamp', 400);
  }

  try {
    const result = await dispatchEnquiryEmail(values as Enquiry, config, origin || undefined);
    if (!result.accepted) {
      return error('Your enquiry could not be submitted. Please try again, or use email or WhatsApp.', 502);
    }
    return NextResponse.json({
      accepted: true,
      provider: result.provider,
      sandbox: Boolean(result.sandbox),
      reference: values.enquiryId,
    });
  } catch (err) {
    console.error('[Enquiry Dispatch Exception]', err);
    return error('Your enquiry could not be submitted. Please try again, or use email or WhatsApp.', 502);
  }
}
