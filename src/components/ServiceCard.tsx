'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Service } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.05 * index,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full"
    >
      <Link
        href={`/services/${service.slug}`}
        className="group relative block w-full rounded-editorial border border-sand-300 bg-sand-50/70 hover:bg-white hover:border-charcoal/30 active:scale-[0.99] transition-all duration-300 p-4 sm:p-5 shadow-subtle hover:shadow-card focus:outline-none focus:ring-1 focus:ring-burntOrange/50"
      >
        <div className="flex items-start justify-between gap-3.5">
          {/* Left Column: Number Index & Main Content */}
          <div className="flex items-start gap-3.5 sm:gap-4 flex-1 min-w-0">
            {/* Number Index */}
            <span className="font-display text-sm sm:text-base font-semibold text-charcoal-400 group-hover:text-burntOrange transition-colors pt-0.5 select-none">
              {formattedIndex}
            </span>

            {/* Service Details */}
            <div className="flex-1 min-w-0">
              {/* Category */}
              {service.category && (
                <div className="text-[11px] font-semibold tracking-wider uppercase text-charcoal-500 mb-1">
                  {service.category}
                </div>
              )}

              {/* Title */}
              <h3 className="font-display text-lg sm:text-xl font-medium tracking-tight text-charcoal group-hover:text-charcoal-900 transition-colors leading-snug">
                {service.title}
              </h3>

              {/* Short Description */}
              {service.shortDescription && (
                <p className="mt-1 text-xs sm:text-[13px] text-charcoal-600 line-clamp-2 leading-relaxed font-normal">
                  {service.shortDescription}
                </p>
              )}

              {/* Duration & Starting Price */}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-charcoal-500 pt-2 border-t border-sand-200/80">
                {service.duration && (
                  <span className="flex items-center gap-1 font-medium text-charcoal-600">
                    <Clock className="w-3.5 h-3.5 text-charcoal-400" />
                    {service.duration}
                  </span>
                )}

                {service.duration && service.price > 0 && (
                  <span className="w-1 h-1 rounded-full bg-sand-300" />
                )}

                {service.price > 0 && (
                  <span className="font-semibold text-charcoal">
                    From {formatCurrency(service.price, service.currency)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Directional Arrow with subtle hover translation */}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sand-200/50 group-hover:bg-burntOrange group-hover:text-white text-charcoal-700 transition-all duration-300 flex-shrink-0 self-center">
            <ArrowRight className="w-4 h-4 stroke-[2] transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
