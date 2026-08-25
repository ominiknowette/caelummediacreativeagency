'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface ShareBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  url?: string;
}

export function ShareBottomSheet({
  isOpen,
  onClose,
  title = 'Amara Vance · Social Media & Content Director',
  url,
}: ShareBottomSheetProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(url || window.location.href);
    }
  }, [url, isOpen]);

  const handleCopy = async () => {
    const success = await copyToClipboard(currentUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      iconSrc: '/icons/whatsapp.png',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${title} - ${currentUrl}`
      )}`,
    },
    {
      name: 'X (Twitter)',
      iconSrc: '/icons/x.png',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: 'LinkedIn',
      iconSrc: '/icons/linkedin.png',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg rounded-t-[20px] sm:rounded-editorial bg-cream border-t sm:border border-sand-300 p-5 sm:p-6 shadow-floating"
          >
            {/* Sheet Handle */}
            <div className="w-10 h-1 rounded-full bg-sand-300 mx-auto mb-4 sm:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-sand-200">
              <div>
                <h3 className="font-display text-xl font-medium text-charcoal">
                  Share Experience
                </h3>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Share this profile or save the direct link.
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1.5 rounded-full hover:bg-sand-200 text-charcoal-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Share Buttons with custom uploaded icons */}
            <div className="grid grid-cols-3 gap-2.5 my-5">
              {shareLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3.5 rounded-editorial border border-sand-300 bg-sand-50/60 hover:bg-white hover:border-charcoal/30 active:scale-95 text-xs font-semibold text-charcoal transition-all shadow-subtle group"
                >
                  <div className="relative w-6 h-6 mb-2 flex items-center justify-center">
                    <Image
                      src={item.iconSrc}
                      alt={item.name}
                      width={24}
                      height={24}
                      className="object-contain transition-transform duration-200 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs text-charcoal-800">{item.name}</span>
                </a>
              ))}
            </div>

            {/* Copy Link Input Bar */}
            <div className="flex items-center gap-2 p-1.5 rounded-editorial bg-white border border-sand-300 shadow-subtle">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 bg-transparent px-3 text-xs text-charcoal-700 outline-none font-mono truncate select-all"
              />

              <button
                onClick={handleCopy}
                className={`px-4 py-2.5 rounded-editorial-sm text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-burntOrange text-white hover:bg-burntOrange-hover active:scale-95'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Copied ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 stroke-[2]" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
