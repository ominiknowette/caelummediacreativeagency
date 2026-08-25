'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Share2,
  Clock,
  Calendar,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';
import { PaymentPlan, Service } from '@/types';
import { getServiceBySlug, getServices } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';
import { PaymentPlanSelector } from '@/components/PaymentPlanSelector';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ShareBottomSheet } from '@/components/ShareBottomSheet';

interface ServiceDetailClientProps {
  initialService?: Service | null;
  slug: string;
}

export function ServiceDetailClient({ initialService, slug }: ServiceDetailClientProps) {
  const [service, setService] = useState<Service | null>(initialService || null);
  const [isLoading, setIsLoading] = useState(!initialService);
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(
    initialService?.paymentPlans?.[0] || null
  );

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sync / Fetch service by slug
  useEffect(() => {
    async function refresh() {
      try {
        const live = await getServiceBySlug(slug);
        if (live) {
          setService(live);
          if (live.paymentPlans?.length) {
            setSelectedPlan((prev) =>
              prev ? live.paymentPlans.find((p) => p.id === prev.id) || live.paymentPlans[0] : live.paymentPlans[0]
            );
          }
        } else if (!initialService) {
          // Check all services to match case or fallback
          const all = await getServices();
          const match = all.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
          if (match) {
            setService(match);
            if (match.paymentPlans?.length) {
              setSelectedPlan(match.paymentPlans[0]);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching service detail', err);
      } finally {
        setIsLoading(false);
      }
    }
    refresh();
  }, [slug, initialService]);

  if (isLoading) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-burntOrange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-16">
        <h2 className="font-display text-2xl sm:text-3xl font-medium text-charcoal mb-2">
          Service Not Found
        </h2>
        <p className="text-xs text-charcoal-500 mb-6 max-w-xs">
          The requested service offering is currently unavailable or has moved.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-editorial bg-charcoal text-cream text-xs font-semibold uppercase tracking-wider hover:bg-charcoal-800 transition-colors"
        >
          Return to All Services
        </Link>
      </div>
    );
  }

  const activePlan = selectedPlan || service.paymentPlans?.[0] || {
    id: 'default',
    type: 'one_time',
    name: 'Full Payment',
    depositAmount: service.price,
    totalAmount: service.price,
    description: 'Full investment',
  };

  const currentDue = activePlan.depositAmount;

  return (
    <div className="w-full pb-24">
      {/* Top Header Navigation */}
      <div className="sticky top-0 z-30 bg-cream/90 backdrop-blur-md border-b border-sand-300 px-5 sm:px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal-700 hover:text-burntOrange transition-colors"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
          <span>Back</span>
        </Link>

        {service.category && (
          <span className="text-[11px] font-bold uppercase tracking-widest text-charcoal-400 truncate max-w-[160px]">
            {service.category}
          </span>
        )}

        <button
          onClick={() => setIsShareOpen(true)}
          aria-label="Share service"
          className="p-2 rounded-full hover:bg-sand-200 text-charcoal transition-colors"
        >
          <Share2 className="w-4 h-4 stroke-[1.75]" />
        </button>
      </div>

      {/* Hero Banner Image */}
      <div className="relative h-[220px] sm:h-[280px] w-full overflow-hidden bg-charcoal">
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 880px"
          className="object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />

        <div className="absolute bottom-4 left-5 right-5 text-white">
          {service.category && (
            <div className="mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-cream border border-white/20">
                {service.category}
              </span>
            </div>
          )}
          <h1 className="font-display text-2xl sm:text-3xl font-medium tracking-tight leading-snug">
            {service.title}
          </h1>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="px-5 sm:px-6 pt-6 space-y-6">
        {/* Quick Metadata Pill Bar */}
        {(service.duration || service.timeline) && (
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-charcoal-600 pb-4 border-b border-sand-200">
            {service.duration && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-editorial-sm bg-sand-100/80 border border-sand-200">
                <Clock className="w-3.5 h-3.5 text-burntOrange" />
                <span className="font-medium">{service.duration}</span>
              </div>
            )}

            {service.timeline && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-editorial-sm bg-sand-100/80 border border-sand-200">
                <Calendar className="w-3.5 h-3.5 text-burntOrange" />
                <span className="font-medium">Timeline: {service.timeline}</span>
              </div>
            )}
          </div>
        )}

        {/* Short & Full Description */}
        <div className="space-y-3">
          {service.shortDescription && (
            <p className="text-sm sm:text-base text-charcoal-800 font-medium leading-relaxed">
              {service.shortDescription}
            </p>
          )}
          {service.fullDescription && (
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-normal whitespace-pre-line">
              {service.fullDescription}
            </p>
          )}
        </div>

        {/* Interactive Payment Plan Selector */}
        {service.paymentPlans && service.paymentPlans.length > 0 && (
          <div className="pt-2">
            <PaymentPlanSelector
              plans={service.paymentPlans}
              selectedPlanId={activePlan.id}
              onSelectPlan={setSelectedPlan}
              currency={service.currency}
            />
          </div>
        )}

        {/* WHAT'S INCLUDED - Pure Editorial Typography (No cards, no ticks, boutique feel) */}
        {service.benefits && service.benefits.length > 0 && (
          <div className="pt-6 pb-2 border-t border-sand-200">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-charcoal-500 mb-5 sm:mb-6">
              WHAT’S INCLUDED
            </h3>

            <div className="space-y-4 sm:space-y-5">
              {service.benefits.map((benefit, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-charcoal font-medium leading-relaxed tracking-tight"
                >
                  {benefit}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Deliverables */}
        {service.deliverables && service.deliverables.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-sand-200">
            <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-charcoal-700">
              Deliverables
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.deliverables.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-editorial-sm bg-sand-100 border border-sand-300 text-xs font-medium text-charcoal-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Target Audience */}
        {service.targetAudience && service.targetAudience.length > 0 && (
          <div className="p-4 rounded-editorial bg-sand-50 border border-sand-200 text-xs space-y-2">
            <span className="font-bold tracking-wider uppercase text-charcoal-600 block">
              Who This Is For
            </span>
            <ul className="space-y-1.5 text-charcoal-700">
              {service.targetAudience.map((target, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-charcoal-400" />
                  <span>{target}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQ Accordion */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-sand-200">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-charcoal-500" />
              <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-charcoal-700">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-2">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-editorial-sm border border-sand-300 bg-white overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-semibold text-charcoal hover:bg-sand-50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-charcoal-400 transition-transform ${
                          isOpen ? 'rotate-180 text-burntOrange' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3.5 pt-1 text-xs text-charcoal-600 leading-relaxed border-t border-sand-100 font-normal">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Purchase Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-lg border-t border-sand-300 py-3 px-5 sm:px-6 shadow-floating">
        <div className="max-w-[560px] md:max-w-[720px] lg:max-w-[880px] mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal-400 block">
              Investment:
            </span>
            <span className="font-display text-xl sm:text-2xl font-semibold text-charcoal">
              {formatCurrency(currentDue, service.currency)}
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="flex-1 max-w-xs py-3 px-5 rounded-editorial bg-burntOrange hover:bg-burntOrange-hover text-white text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-subtle"
          >
            <span>{service.ctaText || 'Buy Access'}</span>
            <span className="font-mono">→</span>
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        service={service}
        initialPlanId={activePlan.id}
      />

      {/* Share Bottom Sheet */}
      <ShareBottomSheet
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={`${service.title} · ${service.category}`}
      />
    </div>
  );
}
