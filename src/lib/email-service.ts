import { sendEnquiry as sendViaSendByte, sendbyteConfig, type SendEnquiryResult } from './sendbyte';
import { SERVICE_LABELS, PACKAGE_LABELS, type Enquiry } from './enquiry-template';

export type EmailProvider = 'emailjs' | 'sendbyte';

export interface EmailServiceConfig {
  provider: EmailProvider;
  emailjs?: {
    serviceId: string;
    templateId: string;
    publicKey: string;
    privateKey?: string;
  };
  sendbyte?: NonNullable<ReturnType<typeof sendbyteConfig>>;
}

/**
 * Reads server environment and determines active email service configuration.
 * EmailJS is favored if configured because it sends live emails to Gmail without
 * requiring a custom verified domain. SendByte is used if configured.
 */
export function getEmailConfig(): EmailServiceConfig | null {
  const emailjsServiceId = process.env.EMAILJS_SERVICE_ID?.trim() || '';
  const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID?.trim() || '';
  const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY?.trim() || '';
  const emailjsPrivateKey = process.env.EMAILJS_PRIVATE_KEY?.trim() || '';

  if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
    return {
      provider: 'emailjs',
      emailjs: {
        serviceId: emailjsServiceId,
        templateId: emailjsTemplateId,
        publicKey: emailjsPublicKey,
        privateKey: emailjsPrivateKey || undefined,
      },
    };
  }

  const sbConfig = sendbyteConfig();
  if (sbConfig) {
    return {
      provider: 'sendbyte',
      sendbyte: sbConfig,
    };
  }

  return null;
}

export type SendEmailResult =
  | { accepted: true; id: string; provider: EmailProvider; sandbox?: boolean }
  | { accepted: false; status?: number; code?: string; message: string };

/**
 * Sends enquiry notification via EmailJS REST API.
 */
async function sendViaEmailJS(
  enquiry: Enquiry,
  config: NonNullable<EmailServiceConfig['emailjs']>,
  origin?: string
): Promise<SendEmailResult> {
  const serviceLabel = SERVICE_LABELS[enquiry.service] || enquiry.service;
  const packageLabel = enquiry.package ? (PACKAGE_LABELS[enquiry.package] || enquiry.package) : 'Not supplied';

  const payload: Record<string, unknown> = {
    service_id: config.serviceId,
    template_id: config.templateId,
    user_id: config.publicKey,
    template_params: {
      name: enquiry.name,
      email: enquiry.email,
      business: enquiry.business,
      phone: enquiry.phone || 'Not supplied',
      serviceLabel,
      packageLabel,
      website: enquiry.website || 'Not supplied',
      startDate: enquiry.startDate || 'Not supplied',
      message: enquiry.message,
      enquiryId: enquiry.enquiryId,
      submittedAt: enquiry.submittedAt,
    },
  };

  if (config.privateKey) {
    payload.accessToken = config.privateKey;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (origin) {
    headers['Origin'] = origin;
  } else if (!config.privateKey) {
    headers['Origin'] = 'https://caelummedia.com';
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    });

    const responseText = await response.text().catch(() => '');

    if (response.ok) {
      return {
        accepted: true,
        id: `emailjs-${enquiry.enquiryId}`,
        provider: 'emailjs',
      };
    }

    console.error('[EmailJS Send Error]', response.status, responseText);
    return {
      accepted: false,
      status: response.status,
      message: responseText || 'Failed to dispatch email via EmailJS',
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[EmailJS Transport Exception]', errorMsg);
    return {
      accepted: false,
      message: errorMsg,
    };
  }
}

/**
 * Unified dispatch function that sends an enquiry notification using the active provider.
 */
export async function dispatchEnquiryEmail(
  enquiry: Enquiry,
  config: EmailServiceConfig,
  origin?: string
): Promise<SendEmailResult> {
  if (config.provider === 'emailjs' && config.emailjs) {
    return sendViaEmailJS(enquiry, config.emailjs, origin);
  }

  if (config.provider === 'sendbyte' && config.sendbyte) {
    const sbResult: SendEnquiryResult = await sendViaSendByte(enquiry, config.sendbyte);
    if (sbResult.accepted) {
      return {
        accepted: true,
        id: sbResult.id,
        provider: 'sendbyte',
        sandbox: sbResult.sandbox,
      };
    }
    return {
      accepted: false,
      status: sbResult.status,
      code: sbResult.code,
      message: sbResult.message,
    };
  }

  return {
    accepted: false,
    message: 'No active email provider configured',
  };
}
