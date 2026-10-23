# SendByte Enquiry Integration Documentation

This document outlines the architecture, environment configuration, template mapping, and verification requirements for Caelum Media's online enquiry notification pipeline via SendByte.

---

## 1. Architecture & Flow

```
[ Visitor Browser ]
        │
        ▼ (POST /api/enquiry with JSON payload)
[ Next.js API Route (Node.js runtime) ]
        │  - Validates all input server-side
        │  - Enforces payload size limit (< 12KB) & 5 req/15min rate limit
        │  - Checks honeypot (websiteCheck) and origin
        │  - Escapes all HTML values
        │  - Attaches Idempotency-Key
        │
        ▼ (POST https://api.sendbyte.africa/v1/emails)
[ SendByte Email API ]
        │
        ▼
[ Client Inbox: caelummediacreativeagency@gmail.com ]
```

- **Browser never contacts SendByte directly:** The API key is stored exclusively in server environment variables and is never exposed in client bundles or public endpoints.
- **Fixed Recipient:** The recipient is hardcoded server-side to `ENQUIRY_TO_EMAIL` (`caelummediacreativeagency@gmail.com`). The browser cannot request alternative recipients or arbitrary subjects.
- **Reply-To:** The visitor's validated email address is passed as `reply_to`, allowing the Caelum Media team to hit "Reply" in their email client to respond directly to the prospective client.

---

## 2. Environment Variables

Store these in `.env.local` (local development) or your hosting provider's secret environment variables (e.g., Vercel):

| Variable | Description | Example / Required Value |
| :--- | :--- | :--- |
| `SENDBYTE_API_KEY` | SendByte API Key | `sk_live_...` (or `sk_test_...` for sandbox) |
| `SENDBYTE_FROM_EMAIL` | Sender address | Must be on a domain verified in SendByte for live sending |
| `ENQUIRY_TO_EMAIL` | Fixed destination inbox | `caelummediacreativeagency@gmail.com` |

> **Security Note:** Neither `.env.local` nor API keys are committed to Git. `.gitignore` is configured to ignore `.env*` and `.env*.local`.

---

## 3. Template Variables Mapping

Template rendering is isolated in `src/lib/enquiry-template.ts`. When the final HTML email design arrives, replace `renderEnquiryHtml()` in that file while maintaining `escapeHtml()` on all user-provided values.

| Variable | Form Field | Description |
| :--- | :--- | :--- |
| `enquiry.enquiryId` | `enquiryId` | Unique UUID v4 reference (used as idempotency key) |
| `enquiry.submittedAt` | `submittedAt` | ISO 8601 submission timestamp |
| `enquiry.name` | `name` | Visitor's full name |
| `enquiry.email` | `email` | Visitor's email (also assigned to `reply_to`) |
| `enquiry.business` | `business` | Business or brand name |
| `enquiry.phone` | `phone` | Phone or WhatsApp number (or 'Not supplied') |
| `enquiry.service` | `service` | Service ID (e.g., `social-media-management`) |
| `serviceLabel` | *derived* | Human-readable service title (e.g., `Social Media Management`) |
| `enquiry.package` | `package` | Package ID (e.g., `classic`) |
| `packageLabel` | *derived* | Human-readable package title & pricing |
| `enquiry.website` | `website` | Social media handle or website (or 'Not supplied') |
| `enquiry.startDate` | `startDate` | Preferred project start date (or 'Not supplied') |
| `enquiry.message` | `message` | Project goals / detailed message |

---

## 4. Idempotency & Duplicate Prevention

1. The client form generates a unique UUID `enquiryId` and ISO `submittedAt` timestamp on the first submit attempt.
2. If network fails or a retry is triggered with unchanged form inputs, the exact same `enquiryId` is preserved.
3. The server forwards this as `Idempotency-Key` (header) and `idempotency_key: caelum-enquiry-<enquiryId>` (JSON body) to SendByte.
4. SendByte guarantees that duplicate submissions with the same idempotency key and payload are not sent twice (replaying the initial `200 OK` response).
5. If the visitor edits any input field, the client resets the submission reference, ensuring a fresh key is generated for the modified enquiry.

---

## 5. Sender-Domain Verification Requirements & Delivery Notes

SendByte enforces strict sender verification for live production keys (`sk_live_...`):

1. **Why `@gmail.com` cannot send live emails:**
   When testing with `SENDBYTE_FROM_EMAIL=caelummediacreativeagency@gmail.com`, SendByte returns:
   ```json
   {
     "error": {
       "code": "domain_not_verified",
       "message": "gmail.com is not verified for live sending. Add and verify it via POST /v1/domains..."
     }
   }
   ```
   Public mailbox domains (like `@gmail.com`, `@yahoo.com`) cannot be verified with custom DNS records (SPF, DKIM, DMARC) by any third party.
2. **How to unblock live delivery:**
   - Register or use a domain Caelum Media controls (e.g., `caelummedia.com`).
   - Log into the [SendByte Dashboard](https://app.sendbyte.africa/) -> **Domains** -> **Add Domain**.
   - Add the specified `TXT` (SPF), `CNAME` (DKIM), and `TXT` (DMARC) records to your DNS provider.
   - Once verified, update `SENDBYTE_FROM_EMAIL` to an address on that domain (e.g., `Caelum Media <hello@caelummedia.com>` or `notifications@caelummedia.com`).
   - Set `ENQUIRY_TO_EMAIL=caelummediacreativeagency@gmail.com` as the destination inbox.
