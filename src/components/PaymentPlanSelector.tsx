'use client';

import React from 'react';
import { PaymentPlan } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PaymentPlanSelectorProps {
  plans: PaymentPlan[];
  selectedPlanId: string;
  onSelectPlan: (plan: PaymentPlan) => void;
  currency?: string;
}

export function PaymentPlanSelector({
  plans,
  selectedPlanId,
  onSelectPlan,
  currency = 'NGN',
}: PaymentPlanSelectorProps) {
  if (!plans || plans.length === 0) return null;

  return (
    <div className="w-full space-y-2.5">
      <label className="text-[11px] font-bold tracking-widest uppercase text-charcoal-600 block">
        Payment Options
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {plans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const isInstallment = plan.type === 'installment';

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelectPlan(plan)}
              className={`text-left p-3.5 rounded-editorial border transition-all duration-200 relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-burntOrange ring-1 ring-burntOrange shadow-subtle'
                  : 'bg-sand-50/60 border-sand-300 hover:bg-white hover:border-charcoal/30'
              }`}
            >
              <div>
                {/* Header with Type label and check indicator */}
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-burntOrange/10 text-burntOrange'
                        : 'bg-sand-200 text-charcoal-600'
                    }`}
                  >
                    {isInstallment ? 'Installments' : 'One-Time'}
                  </span>

                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${
                      isSelected
                        ? 'border-burntOrange bg-burntOrange text-white'
                        : 'border-sand-300 bg-transparent'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Plan Title */}
                <h4 className="text-xs sm:text-sm font-semibold text-charcoal leading-snug">
                  {plan.name}
                </h4>

                {/* Short Plan Description */}
                {plan.description && (
                  <p className="mt-1 text-[11px] text-charcoal-500 line-clamp-2 leading-relaxed">
                    {plan.description}
                  </p>
                )}
              </div>

              {/* Price Details */}
              <div className="mt-3 pt-2.5 border-t border-sand-200/80 flex items-baseline justify-between">
                <span className="text-[11px] text-charcoal-500">
                  {isInstallment ? 'Initial Deposit:' : 'Total Due:'}
                </span>
                <div className="text-right">
                  <span className="font-display text-base font-semibold text-charcoal">
                    {formatCurrency(plan.depositAmount, currency)}
                  </span>
                  {isInstallment && plan.totalAmount && plan.depositAmount !== plan.totalAmount && (
                    <div className="text-[10px] text-charcoal-500">
                      Total: {formatCurrency(plan.totalAmount, currency)}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
