'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { CreatorProfile } from '@/types';

interface ContactSocialsProps {
  profile: CreatorProfile;
  onOpenInquiry?: () => void;
}

export function ContactSocials({ profile, onOpenInquiry }: ContactSocialsProps) {
  const socials = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: profile.instagram,
      label: 'Instagram',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: profile.linkedin,
      label: 'LinkedIn',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      href: profile.twitter,
      label: 'Twitter',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:${profile.email}`,
      label: 'Direct Email',
    },
  ].filter((s) => Boolean(s.href));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="w-full px-5 sm:px-6 py-6 pb-12 flex flex-col items-center text-center"
    >
      {/* Custom Service / Bespoke Inquiry CTA Button */}
      {onOpenInquiry && (
        <div className="w-full max-w-sm mb-6">
          <button
            onClick={onOpenInquiry}
            className="w-full group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-editorial bg-charcoal text-cream font-medium text-xs sm:text-sm tracking-wider uppercase hover:bg-charcoal-800 active:scale-[0.98] transition-all shadow-subtle border border-charcoal/40"
          >
            <span>Request a Custom Service</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <p className="text-[11px] text-charcoal-500 mt-2">
            Need something tailored? Request a custom project or retainer.
          </p>
        </div>
      )}

      {/* Decorative Editorial Divider */}
      <div className="mb-6 flex items-center justify-center w-full max-w-[160px]">
        <div className="h-[1px] w-full bg-sand-300" />
      </div>

      {/* Social Line Icons */}
      <div className="flex items-center justify-center gap-3">
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-sand-300 bg-sand-50/50 hover:bg-white hover:border-burntOrange hover:text-burntOrange text-charcoal-600 transition-all active:scale-90 shadow-subtle"
            >
              <Icon className="w-4 h-4 stroke-[1.75]" />
            </a>
          );
        })}
      </div>

      {/* Direct studio email */}
      {profile.email && (
        <a
          href={`mailto:${profile.email}`}
          className="mt-4 text-xs tracking-wide text-charcoal-500 hover:text-burntOrange transition-colors font-mono"
        >
          {profile.email}
        </a>
      )}

      {/* Footer copyright */}
      <p className="mt-5 text-[11px] text-charcoal-400 font-sans">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </motion.div>
  );
}
