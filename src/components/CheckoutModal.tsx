'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ChevronRight } from 'lucide-react';
import { BookingOrder, PaymentPlan, Service } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { saveOrder } from '@/lib/storage';
import { OrderConfirmation } from './OrderConfirmation';
import { PaymentPlanSelector } from './PaymentPlanSelector';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  initialPlanId?: string;
}

export function CheckoutModal({
  isOpen,
  onClose,
  service,
  initialPlanId,
}: CheckoutModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>(
    service.paymentPlans.find((p) => p.id === initialPlanId) ||
      service.paymentPlans[0] || {
        id: 'default',
        type: 'one_time',
        name: 'Full Payment',
        depositAmount: service.price,
        totalAmount: service.price,
        description: 'Standard single investment.',
      }
  );

  const [step, setStep] = useState<'form' | 'processing' | 'confirmed'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<BookingOrder | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    const reference = `AV-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    setTimeout(async () => {
      const newOrder: BookingOrder = {
        id: `ord-${Date.now()}`,
        serviceId: service.id,
        serviceTitle: service.title,
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        planType: selectedPlan.type,
        planName: selectedPlan.name,
        amountPaid: selectedPlan.depositAmount,
        totalAmount: selectedPlan.totalAmount,
        currency: service.currency || 'NGN',
        status: 'success',
        paymentReference: reference,
        paymentMethod: 'Paystack Checkout',
        createdAt: new Date().toISOString(),
        notes,
      };

      await saveOrder(newOrder);
      setConfirmedOrder(newOrder);
      setStep('confirmed');
    }, 1000);
  };

  const handleClose = () => {
    setStep('form');
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step === 'confirmed' ? handleClose : onClose}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg rounded-t-[20px] sm:rounded-editorial bg-cream border-t sm:border border-sand-300 p-6 sm:p-7 shadow-floating max-h-[92vh] overflow-y-auto"
          >
            {/* Header Close button */}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-sand-200 text-charcoal-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {step === 'confirmed' && confirmedOrder ? (
              <OrderConfirmation order={confirmedOrder} onReset={handleClose} />
            ) : (
              <div>
                {/* Checkout Header */}
                <div className="flex items-center gap-1.5 mb-1 text-charcoal-500">
                  <Lock className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold tracking-widest uppercase">
                    Checkout
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-medium text-charcoal tracking-tight">
                  {service.title}
                </h3>

                <p className="text-xs text-charcoal-500 mt-1 mb-5">
                  Confirm your details to reserve your session.
                </p>

                {/* Plan Selector */}
                {service.paymentPlans.length > 1 && (
                  <div className="mb-5 pb-5 border-b border-sand-200">
                    <PaymentPlanSelector
                      plans={service.paymentPlans}
                      selectedPlanId={selectedPlan.id}
                      onSelectPlan={setSelectedPlan}
                      currency={service.currency}
                    />
                  </div>
                )}

                {/* Checkout Form */}
                <form onSubmit={handlePay} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider uppercase text-charcoal-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sola Adeleke"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-xs sm:text-sm text-charcoal focus:border-burntOrange focus:ring-1 focus:ring-burntOrange outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold tracking-wider uppercase text-charcoal-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sola@studio.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-xs sm:text-sm text-charcoal focus:border-burntOrange focus:ring-1 focus:ring-burntOrange outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold tracking-wider uppercase text-charcoal-700 mb-1">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 800 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-xs sm:text-sm text-charcoal focus:border-burntOrange focus:ring-1 focus:ring-burntOrange outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider uppercase text-charcoal-700 mb-1">
                      Notes / Account Link (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Brief notes or social handle..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-xs sm:text-sm text-charcoal focus:border-burntOrange focus:ring-1 focus:ring-burntOrange outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 rounded-editorial bg-sand-100/70 border border-sand-200 text-xs space-y-1.5 mt-4">
                    <div className="flex justify-between text-charcoal-600">
                      <span>Plan:</span>
                      <span className="font-semibold text-charcoal">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-1.5 border-t border-sand-200 font-semibold text-charcoal">
                      <span className="text-xs uppercase tracking-wider">Amount Due Today:</span>
                      <span className="font-display text-lg text-burntOrange">
                        {formatCurrency(selectedPlan.depositAmount, service.currency)}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={step === 'processing'}
                    className="w-full mt-3 py-3.5 rounded-editorial bg-burntOrange hover:bg-burntOrange-hover text-white text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-subtle disabled:opacity-50"
                  >
                    {step === 'processing' ? (
                      <span className="animate-pulse">Processing Payment...</span>
                    ) : (
                      <>
                        <span>Pay {formatCurrency(selectedPlan.depositAmount, service.currency)}</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
