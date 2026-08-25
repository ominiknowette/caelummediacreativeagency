'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Save, Upload } from 'lucide-react';
import { Service } from '@/types';

interface AdminServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onSave: (saved: Service) => void;
}

export function AdminServiceModal({
  isOpen,
  onClose,
  service,
  onSave,
}: AdminServiceModalProps) {
  const [formData, setFormData] = useState<Service>({
    id: '',
    title: '',
    slug: '',
    category: 'Strategy',
    shortDescription: '',
    fullDescription: '',
    benefits: [],
    deliverables: [],
    timeline: '',
    price: 100000,
    currency: 'NGN',
    duration: '60 min',
    active: true,
    displayOrder: 1,
    ctaText: 'Book Service',
    heroImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop',
    paymentPlans: [],
  });

  const [benefitInput, setBenefitInput] = useState('');
  const [deliverableInput, setDeliverableInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      setFormData({
        id: `srv-${Date.now()}`,
        title: '',
        slug: '',
        category: 'Consultation',
        shortDescription: '',
        fullDescription: '',
        benefits: ['One-on-one consultation', 'Written action plan'],
        deliverables: ['Summary Document'],
        timeline: '3-5 business days',
        price: 85000,
        currency: 'NGN',
        duration: '60 min',
        active: true,
        displayOrder: 1,
        ctaText: 'Book Service',
        heroImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop',
        paymentPlans: [
          {
            id: `plan-one-time`,
            type: 'one_time',
            name: 'Full Payment',
            depositAmount: 85000,
            totalAmount: 85000,
            description: 'One-time complete investment.',
          },
        ],
      });
    }
  }, [service, isOpen]);

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({ ...prev, title, slug: prev.slug || slug }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      if (base64Url) {
        setFormData((prev) => ({ ...prev, heroImage: base64Url }));
      }
    };
    reader.readAsDataURL(file);
  };

  const addBenefit = () => {
    if (!benefitInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, benefitInput.trim()],
    }));
    setBenefitInput('');
  };

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const addDeliverable = () => {
    if (!deliverableInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      deliverables: [...(prev.deliverables || []), deliverableInput.trim()],
    }));
    setDeliverableInput('');
  };

  const removeDeliverable = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: (prev.deliverables || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl rounded-t-[20px] sm:rounded-editorial bg-cream border-t sm:border border-sand-300 p-5 sm:p-7 shadow-floating max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-sand-200">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-charcoal">
                  {service ? 'Edit Service' : 'Add New Service'}
                </h3>
                <p className="text-xs text-charcoal-500">
                  Update service details, pricing, payment plans, and deliverables.
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 rounded-full hover:bg-sand-200 text-charcoal-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 space-y-4 text-xs">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-charcoal-700 mb-1 text-[11px]">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-charcoal focus:border-burntOrange outline-none"
                    placeholder="e.g. Social Media Consultation"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-charcoal-700 mb-1 text-[11px]">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-charcoal focus:border-burntOrange outline-none font-mono"
                    placeholder="social-media-consultation"
                  />
                </div>
              </div>

              {/* Category, Duration, & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-charcoal-700 mb-1 text-[11px]">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-charcoal focus:border-burntOrange outline-none"
                    placeholder="Consultation"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-charcoal-700 mb-1 text-[11px]">
                    Duration / Scope
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, duration: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-charcoal focus:border-burntOrange outline-none"
                    placeholder="60 min"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-charcoal-700 mb-1 text-[11px]">
                    Base Price (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-charcoal focus:border-burntOrange outline-none"
                  />
                </div>
              </div>

              {/* Image Upload for Service */}
              <div className="p-3 rounded-editorial-sm bg-white border border-sand-300 space-y-2.5">
                <label className="block font-semibold uppercase text-charcoal-700 text-[11px]">
                  Service Hero Image
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-full sm:w-28 h-20 rounded-editorial-sm overflow-hidden bg-sand-200 border border-sand-300 flex-shrink-0">
                    <Image
                      src={formData.heroImage}
                      alt="Service Preview"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-editorial-sm bg-sand-200 hover:bg-sand-300 text-charcoal font-semibold flex items-center gap-1.5 transition-all active:scale-95 text-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Service Photo</span>
                    </button>

                    <input
                      type="text"
                      value={formData.heroImage}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, heroImage: e.target.value }))
                      }
                      className="w-full px-3 py-1.5 rounded-editorial-sm bg-sand-50 border border-sand-300 text-charcoal text-[11px] font-mono outline-none focus:border-burntOrange"
                      placeholder="Or paste image URL (https://...)"
                    />
                  </div>
                </div>
              </div>

              {/* Short & Full Descriptions */}
              <div>
                <label className="block font-semibold uppercase text-charcoal-700 mb-1 text-[11px]">
                  Short Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      shortDescription: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-editorial-sm bg-white border border-sand-300 text-charcoal focus:border-burntOrange outline-none resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-charcoal-700 mb-1 text-[11px]">
                  Full Overview
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullDescription: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-editorial-sm bg-white border border-sand-300 text-charcoal focus:border-burntOrange outline-none"
                />
              </div>

              {/* Benefits Editor */}
              <div>
                <label className="block font-semibold uppercase text-charcoal-700 mb-1 text-[11px]">
                  Benefits & Inclusions
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={benefitInput}
                    onChange={(e) => setBenefitInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                    placeholder="e.g. Audit of primary channels"
                    className="flex-1 px-3 py-2 rounded-editorial-sm bg-white border border-sand-300 text-charcoal outline-none"
                  />
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="px-3 py-2 rounded-editorial-sm bg-sand-200 hover:bg-sand-300 text-charcoal font-medium flex items-center gap-1 flex-shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {formData.benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3 py-1.5 rounded-editorial-sm bg-white border border-sand-200"
                    >
                      <span className="truncate">{b}</span>
                      <button
                        type="button"
                        onClick={() => removeBenefit(idx)}
                        className="text-red-500 hover:text-red-700 p-1"
                        aria-label="Delete benefit"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Toggle */}
              <div className="pt-2 border-t border-sand-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, active: e.target.checked }))
                    }
                    className="w-4 h-4 text-burntOrange rounded focus:ring-burntOrange"
                  />
                  <span className="font-semibold text-charcoal-700">Active / Visible on site</span>
                </label>
              </div>

              {/* Submit & Cancel */}
              <div className="flex justify-end gap-2 pt-4 border-t border-sand-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-editorial-sm bg-sand-200 hover:bg-sand-300 text-charcoal font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-editorial-sm bg-burntOrange hover:bg-burntOrange-hover text-white font-semibold flex items-center gap-1.5 shadow-subtle"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
