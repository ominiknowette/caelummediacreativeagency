'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Share2, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  bannerUrl: string;
  avatarUrl: string;
  creatorName: string;
  onOpenShare?: () => void;
}

export function HeroSection({
  bannerUrl,
  avatarUrl,
  creatorName,
  onOpenShare,
}: HeroSectionProps) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Banner with Image */}
      <div className="relative h-[240px] sm:h-[280px] md:h-[320px] w-full overflow-hidden bg-charcoal">
        <Image
          src={bannerUrl}
          alt="Editorial Hero"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 880px"
          className="object-cover object-center opacity-90"
        />

        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal/50" />

        {/* Top Header Actions */}
        <div className="absolute top-4 left-0 right-0 px-5 sm:px-6 flex items-center justify-end gap-2 z-20">
          <button
            onClick={onOpenShare}
            aria-label="Share Profile"
            className="p-2.5 rounded-full bg-cream/90 hover:bg-white active:scale-95 backdrop-blur-md border border-sand-300 text-charcoal transition-all shadow-subtle"
          >
            <Share2 className="w-4 h-4 text-charcoal stroke-[1.75]" />
          </button>

          <Link
            href="/admin"
            aria-label="Admin Dashboard"
            className="p-2.5 rounded-full bg-cream/90 hover:bg-white active:scale-95 backdrop-blur-md border border-sand-300 text-charcoal transition-all shadow-subtle group"
            title="Manage Services"
          >
            <SlidersHorizontal className="w-4 h-4 text-charcoal group-hover:text-burntOrange transition-colors stroke-[1.75]" />
          </Link>
        </div>
      </div>

      {/* Signature Arch Cutout Transition & Avatar Overlay */}
      <div className="relative -mt-16 sm:-mt-20 z-20 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <div className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] rounded-full bg-cream p-1.5 shadow-subtle border border-sand-300">
            {/* The Avatar Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full rounded-full overflow-hidden border border-charcoal/10"
            >
              <Image
                src={avatarUrl}
                alt={creatorName}
                fill
                priority
                sizes="(max-width: 640px) 130px, 150px"
                className="object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
