'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreatorProfile } from '@/types';
import { MapPin } from 'lucide-react';

interface ProfileHeaderProps {
  profile: CreatorProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="w-full px-6 pt-3 pb-6 flex flex-col items-center text-center">
      {/* Creator Name (Display / Editorial Serif) */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-charcoal"
      >
        {profile.name}
      </motion.h1>

      {/* Role / Title (Tracked Sans Uppercase) */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-1.5 text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-charcoal-600"
      >
        {profile.title}
      </motion.div>

      {/* Location */}
      {profile.location && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-2 flex items-center justify-center gap-1.5 text-xs text-charcoal-500"
        >
          <MapPin className="w-3.5 h-3.5 text-charcoal-400" />
          <span>{profile.location}</span>
        </motion.div>
      )}

      {/* Editorial Tagline / Bio */}
      {profile.tagline && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-4 max-w-[420px] text-sm text-charcoal-700 leading-relaxed font-normal"
        >
          {profile.tagline}
        </motion.p>
      )}
    </div>
  );
}
