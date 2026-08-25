import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'NGN'): string {
  if (currency === 'NGN') {
    return `₦${amount.toLocaleString('en-NG')}`;
  }
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US')}`;
  }
  if (currency === 'GBP') {
    return `£${amount.toLocaleString('en-GB')}`;
  }
  return `${currency} ${amount.toLocaleString()}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}
