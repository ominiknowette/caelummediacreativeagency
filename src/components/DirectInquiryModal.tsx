'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface DirectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorEmail: string;
}

export function DirectInquiryModal({
  isOpen,
  onClose,
  creatorEmail,
}: DirectInquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Custom Creative Direction');
  const [budget, setBudget] = useState('₦200,000 - ₦500,000');
  const [timeline, setTimeline] = useState('1-2 weeks');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate inquiry submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
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
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg rounded-t-[20px] sm:rounded-editorial bg-cream border-t sm:border border-sand-300 p-5 sm:p-7 shadow-floating max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-sand-200 text-charcoal-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-medium text-charcoal">
                  Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 max-w-xs mt-2 leading-relaxed">
                  Thank you for reaching out. Your project requirements have been recorded and sent to {creatorEmail || 'the studio'}. We will review and get in touch within 24 hours.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2.5 rounded-editorial bg-charcoal text-cream text-xs font-semibold hover:bg-charcoal-800 transition-all"
                >
                  Return to Profile
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-charcoal-500 block mb-1">
                  Custom Request
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-medium text-charcoal tracking-tight">
                  Request a Custom Service
                </h3>
                <p className="text-xs text-charcoal-500 mt-1 mb-5">
                  Looking for a custom engagement, retainer, or specific creative direction? Share your scope below.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider uppercase text-charcoal-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-xs text-charcoal focus:border-burntOrange outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider uppercase text-charcoal-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-xs text-charcoal focus:border-burntOrange outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold tracking-wider uppercase text-charcoal-700 mb-1">
                        Service / Project Type
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-xs text-charcoal focus:border-burntOrange outline-none"
                      >
                        <option value="Custom Creative Direction">Custom Creative Direction</option>
                        <option value="Monthly Content Retainer">Monthly Content Retainer</option>
                        <option value="Brand Launch Campaign">Brand Launch Campaign</option>
                        <option value="Executive Social Media Advisory">Executive Social Advisory</option>
                        <option value="Other Bespoke Scope">Other Bespoke Scope</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold tracking-wider uppercase text-charcoal-700 mb-1">
                        Estimated Budget
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-xs text-charcoal focus:border-burntOrange outline-none"
                      >
                        <option value="₦150,000 - ₦300,000">₦150,000 - ₦300,000</option>
                        <option value="₦300,000 - ₦600,000">₦300,000 - ₦600,000</option>
                        <option value="₦600,000 - ₦1.5M">₦600,000 - ₦1.5M</option>
                        <option value="₦1.5M+">₦1.5M+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider uppercase text-charcoal-700 mb-1">
                      Project Details & Timeline
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell us what you'd like to achieve, target platforms, deliverables, and any deadlines..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-xs text-charcoal focus:border-burntOrange outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3 rounded-editorial bg-burntOrange hover:bg-burntOrange-hover text-white text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-subtle disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">Submitting Request...</span>
                    ) : (
                      <>
                        <span>Submit Custom Request</span>
                        <ArrowRight className="w-4 h-4 stroke-[2]" />
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
