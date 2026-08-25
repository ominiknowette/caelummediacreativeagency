'use client';

import React from 'react';
import { CheckCircle2, Calendar, MessageCircle, ArrowLeft } from 'lucide-react';
import { BookingOrder } from '@/types';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

interface OrderConfirmationProps {
  order: BookingOrder;
  onReset?: () => void;
}

export function OrderConfirmation({ order }: OrderConfirmationProps) {
  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 bg-cream rounded-editorial border border-sand-300 shadow-card text-center">
      {/* Success Icon */}
      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-emerald-300">
        <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
      </div>

      <h2 className="font-display text-3xl sm:text-4xl font-medium text-charcoal tracking-tight">
        Booking Confirmed
      </h2>

      <p className="mt-2 text-xs sm:text-sm text-charcoal-600 max-w-sm mx-auto leading-relaxed">
        Thank you, <span className="font-semibold text-charcoal">{order.clientName}</span>. Your reservation for{' '}
        <span className="font-semibold text-charcoal">{order.serviceTitle}</span> is received.
      </p>

      {/* Receipt Card */}
      <div className="mt-6 p-4 rounded-editorial bg-white border border-sand-300 text-left space-y-2.5 text-xs">
        <div className="flex justify-between items-center pb-2 border-b border-sand-200">
          <span className="text-charcoal-500 font-medium">Reference Code</span>
          <span className="font-mono font-semibold text-charcoal">{order.paymentReference}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-charcoal-500 font-medium">Plan</span>
          <span className="font-semibold text-charcoal">{order.planName}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-charcoal-500 font-medium">Amount Paid</span>
          <span className="font-display text-base font-semibold text-charcoal">
            {formatCurrency(order.amountPaid, order.currency)}
          </span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-sand-200 text-[11px] text-charcoal-400">
          <span>Confirmation sent to:</span>
          <span className="font-mono text-charcoal-600 truncate max-w-[180px]">
            {order.clientEmail}
          </span>
        </div>
      </div>

      {/* Action Next Steps */}
      <div className="mt-6 space-y-2.5">
        <a
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 rounded-editorial bg-burntOrange hover:bg-burntOrange-hover text-white text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-subtle"
        >
          <Calendar className="w-4 h-4" />
          <span>Select Your Session Time</span>
        </a>

        <a
          href={`https://api.whatsapp.com/send?phone=2348000000000&text=${encodeURIComponent(
            `Hi Amara, I have booked ${order.serviceTitle} (Ref: ${order.paymentReference}).`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-editorial bg-sand-100 hover:bg-sand-200 border border-sand-300 text-charcoal text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <MessageCircle className="w-4 h-4 text-emerald-700" />
          <span>Message on WhatsApp</span>
        </a>
      </div>

      {/* Back to Profile */}
      <div className="mt-6 pt-4 border-t border-sand-200">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal-600 hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Profile</span>
        </Link>
      </div>
    </div>
  );
}
