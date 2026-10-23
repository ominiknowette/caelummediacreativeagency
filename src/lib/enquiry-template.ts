/**
 * ==============================================================================
 * Caelum Media - Enquiry Email Template Renderer
 * ==============================================================================
 *
 * This module separates email template rendering from transport/sending logic.
 * When the final HTML email design is provided, update `renderEnquiryHtml()`
 * below while preserving the `escapeHtml` calls on all visitor-supplied fields.
 *
 * Template Variables Mapping:
 * ------------------------------------------------------------------------------
 * Variable Name       | Form Field                   | Description / Example
 * ------------------------------------------------------------------------------
 * enquiry.enquiryId   | submission.current.enquiryId | UUID reference (e.g. "a1b2c3d4-...")
 * enquiry.submittedAt | submission.current.submittedAt| ISO Timestamp (e.g. "2026-10-23T...")
 * enquiry.name        | form.name                    | Visitor full name
 * enquiry.email       | form.email                   | Visitor email (also set as Reply-To)
 * enquiry.business    | form.business                | Business or brand name
 * enquiry.phone       | form.phone                   | Phone or WhatsApp (or 'Not supplied')
 * enquiry.service     | form.service                 | Service ID (e.g. 'social-media-management')
 * serviceLabel        | derived                      | Human-readable service title
 * enquiry.package     | form.package                 | Package ID (or 'Not supplied')
 * packageLabel        | derived                      | Human-readable package title
 * enquiry.website     | form.website                 | Social handle or site (or 'Not supplied')
 * enquiry.startDate   | form.startDate               | Preferred start date (or 'Not supplied')
 * enquiry.message     | form.message                 | Project goals / detailed message
 * ==============================================================================
 */

export type Enquiry = {
  name: string;
  email: string;
  business: string;
  phone: string;
  service: string;
  package: string;
  website: string;
  message: string;
  startDate: string;
  enquiryId: string;
  submittedAt: string;
};

export const SERVICE_LABELS: Record<string, string> = {
  'social-media-management': 'Social Media Management',
  'content-bank': 'Content Bank',
  'growth-marketing': 'Growth Marketing',
  'brand-strategy': 'Brand Strategy',
  'not-sure': 'Not sure yet',
};

export const PACKAGE_LABELS: Record<string, string> = {
  // Social Media Management
  classic: 'The Classic Package (₦250,000/mo)',
  'business-development': 'The Business Development Package (₦600,000/mo)',
  // Content Bank
  growth: 'Growth Content Bank (₦300,000)',
  scale: 'Scale Content Bank (₦400,000)',
  authority: 'Authority Content Bank (₦550,000)',
  full: 'Full Content Bank (₦800,000)',
  // Brand Strategy
  'brand-discovery-session': 'Brand Discovery Session (₦30,000)',
  'brand-audit-consultation': 'Brand Audit / Consultation (₦50,000)',
  'brand-strategy-document': 'Brand Strategy Document (₦50,000)',
  'brand-positioning-strategy': 'Brand Positioning Strategy (₦70,000)',
  'brand-messaging': 'Brand Messaging (₦60,000)',
  'brand-content-pillars': 'Brand Content Pillars (₦40,000)',
  'personal-branding': 'Personal Branding (₦35,000)',
  'competitor-analysis': 'Competitor Analysis (₦35,000)',
  'brand-launch-strategy': 'Brand Launch Strategy (₦80,000)',
};

/**
 * Escapes characters that have special meaning in HTML to prevent injection.
 */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return character;
    }
  });
}

/**
 * Renders the HTML notification email.
 */
function renderEnquiryHtml(enquiry: Enquiry, serviceLabel: string, packageLabel: string): string {
  const safeRef = escapeHtml(enquiry.enquiryId);
  const safeTime = escapeHtml(enquiry.submittedAt);
  const safeName = escapeHtml(enquiry.name);
  const safeEmail = escapeHtml(enquiry.email);
  const safeBusiness = escapeHtml(enquiry.business);
  const safePhone = escapeHtml(enquiry.phone || 'Not supplied');
  const safeService = escapeHtml(serviceLabel);
  const safePackage = escapeHtml(packageLabel || 'Not supplied');
  const safeWebsite = escapeHtml(enquiry.website || 'Not supplied');
  const safeStartDate = escapeHtml(enquiry.startDate || 'Not supplied');
  const safeMessage = escapeHtml(enquiry.message);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Enquiry</title>
</head>
<body style="margin:0;padding:24px 16px;background-color:#F5EFEB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#181615;line-height:1.5;">
  <div style="max-width:580px;margin:0 auto;background-color:#FFFFFF;border:1px solid #E2D9D0;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
    <!-- Header -->
    <div style="background-color:#181615;padding:24px 28px;border-bottom:3px solid #C46231;">
      <h1 style="margin:0;font-size:20px;font-weight:700;color:#FFFFFF;letter-spacing:0.5px;text-transform:uppercase;">
        Caelum Media
      </h1>
      <p style="margin:4px 0 0;font-size:13px;color:#D8CEC4;">
        New Client Website Enquiry
      </p>
    </div>

    <!-- Body -->
    <div style="padding:28px;">
      <!-- Details Table -->
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
        <tbody>
          <tr style="border-bottom:1px solid #EFEAE4;">
            <td style="padding:10px 0;font-weight:600;color:#6A615A;width:40%;">Name</td>
            <td style="padding:10px 0;font-weight:600;color:#181615;">${safeName}</td>
          </tr>
          <tr style="border-bottom:1px solid #EFEAE4;">
            <td style="padding:10px 0;font-weight:600;color:#6A615A;">Email</td>
            <td style="padding:10px 0;color:#181615;">
              <a href="mailto:${safeEmail}" style="color:#C46231;text-decoration:none;">${safeEmail}</a>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #EFEAE4;">
            <td style="padding:10px 0;font-weight:600;color:#6A615A;">Business / Brand</td>
            <td style="padding:10px 0;color:#181615;">${safeBusiness}</td>
          </tr>
          <tr style="border-bottom:1px solid #EFEAE4;">
            <td style="padding:10px 0;font-weight:600;color:#6A615A;">Phone / WhatsApp</td>
            <td style="padding:10px 0;color:#181615;">${safePhone}</td>
          </tr>
          <tr style="border-bottom:1px solid #EFEAE4;">
            <td style="padding:10px 0;font-weight:600;color:#6A615A;">Selected Service</td>
            <td style="padding:10px 0;color:#181615;font-weight:600;">${safeService}</td>
          </tr>
          <tr style="border-bottom:1px solid #EFEAE4;">
            <td style="padding:10px 0;font-weight:600;color:#6A615A;">Selected Package</td>
            <td style="padding:10px 0;color:#181615;">${safePackage}</td>
          </tr>
          <tr style="border-bottom:1px solid #EFEAE4;">
            <td style="padding:10px 0;font-weight:600;color:#6A615A;">Social Handle / Website</td>
            <td style="padding:10px 0;color:#181615;">${safeWebsite}</td>
          </tr>
          <tr style="border-bottom:1px solid #EFEAE4;">
            <td style="padding:10px 0;font-weight:600;color:#6A615A;">Preferred Start Date</td>
            <td style="padding:10px 0;color:#181615;">${safeStartDate}</td>
          </tr>
        </tbody>
      </table>

      <!-- Project Message Block -->
      <div style="margin-top:20px;padding:18px 20px;background-color:#FBF8F5;border-left:3px solid #C46231;border-radius:4px;">
        <h2 style="margin:0 0 8px;font-size:12px;font-weight:700;color:#6A615A;letter-spacing:1px;text-transform:uppercase;">
          Project Goals & Message
        </h2>
        <div style="font-size:14px;color:#181615;white-space:pre-wrap;word-break:break-word;line-height:1.6;">${safeMessage}</div>
      </div>

      <!-- Metadata Box -->
      <div style="margin-top:28px;padding-top:16px;border-top:1px solid #EFEAE4;font-size:12px;color:#8E847C;line-height:1.6;">
        <div><strong>Enquiry Reference:</strong> ${safeRef}</div>
        <div><strong>Submitted At:</strong> ${safeTime}</div>
        <div style="margin-top:6px;font-style:italic;">Reply to this email directly to respond to ${safeName}.</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Renders the plain-text fallback notification email.
 */
function renderEnquiryText(enquiry: Enquiry, serviceLabel: string, packageLabel: string): string {
  return [
    '========================================',
    'NEW CAELUM MEDIA ENQUIRY',
    '========================================',
    '',
    `Name:                    ${enquiry.name}`,
    `Email:                   ${enquiry.email}`,
    `Business:                ${enquiry.business}`,
    `Phone / WhatsApp:        ${enquiry.phone || 'Not supplied'}`,
    `Selected Service:        ${serviceLabel}`,
    `Selected Package:        ${packageLabel || 'Not supplied'}`,
    `Social Handle / Website: ${enquiry.website || 'Not supplied'}`,
    `Preferred Start Date:    ${enquiry.startDate || 'Not supplied'}`,
    '',
    '----------------------------------------',
    'PROJECT GOALS & MESSAGE:',
    '----------------------------------------',
    enquiry.message,
    '',
    '----------------------------------------',
    `Enquiry Reference:       ${enquiry.enquiryId}`,
    `Submitted At:            ${enquiry.submittedAt}`,
    '========================================',
  ].join('\n');
}

/**
 * Main render function used by transport layer.
 */
export function renderEnquiry(enquiry: Enquiry) {
  const serviceLabel = SERVICE_LABELS[enquiry.service] || enquiry.service;
  const packageLabel = enquiry.package ? (PACKAGE_LABELS[enquiry.package] || enquiry.package) : '';

  const subject = `New enquiry from ${enquiry.name} (${enquiry.business}) - ${serviceLabel}`;
  const html = renderEnquiryHtml(enquiry, serviceLabel, packageLabel);
  const text = renderEnquiryText(enquiry, serviceLabel, packageLabel);

  return { subject, html, text };
}
