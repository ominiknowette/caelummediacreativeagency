'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Save,
  CheckCircle2,
  Sliders,
  Users,
  ShoppingBag,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';
import { BookingOrder, CreatorProfile, Service } from '@/types';
import {
  getProfile,
  getServices,
  saveService,
  deleteService,
  reorderServices,
  updateProfile,
  getOrders,
} from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';
import { AdminServiceModal } from '@/components/AdminServiceModal';
import { INITIAL_PROFILE, INITIAL_SERVICES } from '@/data/mockData';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'services' | 'profile' | 'orders'>('services');
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [profile, setProfile] = useState<CreatorProfile>(INITIAL_PROFILE);
  const [orders, setOrders] = useState<BookingOrder[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const [profData, servData, orderData] = await Promise.all([
          getProfile(),
          getServices(),
          getOrders(),
        ]);
        if (profData) setProfile(profData);
        if (servData && servData.length > 0) setServices(servData);
        if (orderData) setOrders(orderData);
      } catch (err) {
        console.error('Error loading admin data', err);
      }
    }
    load();
  }, []);

  const triggerSaveNotice = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const handleSaveService = async (saved: Service) => {
    await saveService(saved);
    const updated = await getServices();
    setServices(updated);
    triggerSaveNotice();
  };

  const handleDeleteService = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteService(id);
      const updated = await getServices();
      setServices(updated);
      triggerSaveNotice();
    }
  };

  const handleToggleActive = async (service: Service) => {
    const toggled = { ...service, active: !service.active };
    await saveService(toggled);
    const updated = await getServices();
    setServices(updated);
    triggerSaveNotice();
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= services.length) return;

    const list = [...services];
    const temp = list[index];
    list[index] = list[newIdx];
    list[newIdx] = temp;

    const orderedIds = list.map((s) => s.id);
    const reordered = await reorderServices(orderedIds);
    setServices(reordered);
    triggerSaveNotice();
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profile);
    triggerSaveNotice();
  };

  // Image Upload Handlers
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      if (base64Url) {
        setProfile((prev) => ({ ...prev, avatarUrl: base64Url }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      if (base64Url) {
        setProfile((prev) => ({ ...prev, heroBannerUrl: base64Url }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 py-5 sm:py-6 pb-24">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sand-300">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal-700 hover:text-burntOrange transition-colors py-1"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
          <span>View Site</span>
        </Link>

        <div className="flex items-center gap-2">
          {savedNotification && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Saved
            </span>
          )}
          <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-sand-200 text-charcoal-700">
            Admin Workspace
          </span>
        </div>
      </div>

      {/* Responsive Tabs Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 my-4 sm:my-5 border-b border-sand-300 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-editorial-sm text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'services'
              ? 'bg-charcoal text-white shadow-sm'
              : 'bg-sand-100 text-charcoal-600 hover:bg-sand-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Services ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-editorial-sm text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'profile'
              ? 'bg-charcoal text-white shadow-sm'
              : 'bg-sand-100 text-charcoal-600 hover:bg-sand-200'
          }`}
        >
          <Users className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Profile & Photos</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-editorial-sm text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'orders'
              ? 'bg-charcoal text-white shadow-sm'
              : 'bg-sand-100 text-charcoal-600 hover:bg-sand-200'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Bookings ({orders.length})</span>
        </button>
      </div>

      {/* TAB 1: SERVICES MANAGEMENT */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-medium text-charcoal">
                Offerings & Pricing
              </h2>
              <p className="text-xs text-charcoal-500">
                Manage your services, payment options, and display order.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingService(null);
                setIsModalOpen(true);
              }}
              className="self-start sm:self-auto px-4 py-2.5 rounded-editorial bg-burntOrange hover:bg-burntOrange-hover text-white text-xs font-semibold flex items-center gap-1.5 shadow-subtle transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>New Service</span>
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {services.map((item, idx) => (
              <div
                key={item.id}
                className={`p-3.5 sm:p-4 rounded-editorial border bg-white transition-all ${
                  item.active ? 'border-sand-300 shadow-subtle' : 'border-dashed border-sand-300 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Order up/down controls */}
                    <div className="flex flex-row sm:flex-col gap-1 pt-0.5 flex-shrink-0">
                      <button
                        onClick={() => handleMoveOrder(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 rounded bg-sand-100 hover:bg-sand-200 disabled:opacity-30 text-charcoal-600 active:scale-95"
                        title="Move Up"
                        aria-label="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveOrder(idx, 'down')}
                        disabled={idx === services.length - 1}
                        className="p-1.5 rounded bg-sand-100 hover:bg-sand-200 disabled:opacity-30 text-charcoal-600 active:scale-95"
                        title="Move Down"
                        aria-label="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-editorial-sm overflow-hidden bg-sand-200 flex-shrink-0 border border-sand-300">
                      <Image
                        src={item.heroImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500">
                          {item.category}
                        </span>
                        {!item.active && (
                          <span className="text-[9px] px-1.5 py-0.2 bg-red-100 text-red-700 font-semibold rounded">
                            Hidden
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm sm:text-base font-semibold text-charcoal truncate">
                        {item.title}
                      </h4>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-charcoal-500 mt-1">
                        <span>{item.duration}</span>
                        <span>·</span>
                        <span className="font-semibold text-charcoal">
                          {formatCurrency(item.price, item.currency)}
                        </span>
                        <span>·</span>
                        <span>{item.paymentPlans.length} Plan(s)</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-end gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-sand-200 flex-shrink-0">
                    <button
                      onClick={() => handleToggleActive(item)}
                      className="p-2 rounded-editorial-sm hover:bg-sand-100 text-charcoal-600 transition-colors"
                      title={item.active ? 'Hide Service' : 'Activate Service'}
                      aria-label="Toggle active"
                    >
                      {item.active ? (
                        <Eye className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-charcoal-400" />
                      )}
                    </button>

                    <Link
                      href={`/services/${item.slug}`}
                      className="p-2 rounded-editorial-sm hover:bg-sand-100 text-charcoal-600 transition-colors"
                      title="Preview Page"
                      target="_blank"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => {
                        setEditingService(item);
                        setIsModalOpen(true);
                      }}
                      className="p-2 rounded-editorial-sm hover:bg-sand-100 text-charcoal-600 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteService(item.id)}
                      className="p-2 rounded-editorial-sm hover:bg-red-50 text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PROFILE & IMAGE UPLOAD MANAGEMENT */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-5 max-w-2xl text-xs">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-medium text-charcoal">
              Profile & Media Assets
            </h2>
            <p className="text-xs text-charcoal-500">
              Upload your custom hero banner, profile portrait, tagline, and contact information.
            </p>
          </div>

          {/* Media Upload Sections */}
          <div className="space-y-4 pt-2">
            {/* 1. Hero Banner Upload */}
            <div className="p-4 rounded-editorial bg-white border border-sand-300 shadow-subtle space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-charcoal-800 text-[11px]">
                    Hero Banner Background
                  </label>
                  <p className="text-[11px] text-charcoal-500">
                    The background image displayed at the top behind your profile portrait.
                  </p>
                </div>
              </div>

              {/* Banner Preview Box */}
              <div className="relative h-28 sm:h-36 w-full rounded-editorial overflow-hidden bg-charcoal border border-sand-300">
                <Image
                  src={profile.heroBannerUrl}
                  alt="Hero Banner Preview"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Upload Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="file"
                  ref={bannerInputRef}
                  onChange={handleBannerFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => bannerInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-editorial-sm bg-sand-200 hover:bg-sand-300 text-charcoal font-semibold flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload New Banner</span>
                </button>

                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, heroBannerUrl: '/images/hero-banner.png' })}
                  className="px-3 py-2 rounded-editorial-sm bg-sand-100 hover:bg-sand-200 text-charcoal-600 font-medium flex items-center gap-1"
                  title="Reset to Caelum Media Banner"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Use Caelum Banner</span>
                </button>
              </div>

              {/* Direct Banner URL input */}
              <div>
                <label className="block text-[10px] uppercase font-semibold text-charcoal-600 mb-1">
                  Or enter direct image URL:
                </label>
                <input
                  type="text"
                  value={profile.heroBannerUrl}
                  onChange={(e) => setProfile({ ...profile, heroBannerUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-editorial-sm bg-sand-50 border border-sand-300 text-charcoal text-xs outline-none focus:border-burntOrange font-mono"
                  placeholder="/images/hero-banner.png or https://..."
                />
              </div>
            </div>

            {/* 2. Profile Portrait Avatar Upload */}
            <div className="p-4 rounded-editorial bg-white border border-sand-300 shadow-subtle space-y-3">
              <div>
                <label className="block font-bold uppercase tracking-wider text-charcoal-800 text-[11px]">
                  Profile Avatar / Portrait
                </label>
                <p className="text-[11px] text-charcoal-500">
                  The circular portrait nestled over the arched cutout.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                {/* Circular Avatar Preview */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-sand-200 border-2 border-sand-300 flex-shrink-0">
                  <Image
                    src={profile.avatarUrl}
                    alt="Avatar Preview"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Upload Controls & URL */}
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="file"
                      ref={avatarInputRef}
                      onChange={handleAvatarFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-editorial-sm bg-sand-200 hover:bg-sand-300 text-charcoal font-semibold flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Profile Photo</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-charcoal-600 mb-1">
                      Or enter direct image URL:
                    </label>
                    <input
                      type="text"
                      value={profile.avatarUrl}
                      onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-editorial-sm bg-sand-50 border border-sand-300 text-charcoal text-xs outline-none focus:border-burntOrange font-mono"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Text Fields */}
          <div className="p-4 rounded-editorial bg-white border border-sand-300 shadow-subtle space-y-3.5">
            <h3 className="font-bold uppercase tracking-wider text-charcoal-800 text-[11px] pb-1 border-b border-sand-200">
              Identity & Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold uppercase text-charcoal-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-charcoal outline-none focus:border-burntOrange text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-charcoal-700 mb-1">
                  Title / Role *
                </label>
                <input
                  type="text"
                  required
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-charcoal outline-none focus:border-burntOrange text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase text-charcoal-700 mb-1">
                Tagline / Bio Summary
              </label>
              <textarea
                rows={2}
                value={profile.tagline}
                onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-editorial-sm bg-white border border-sand-300 text-charcoal outline-none focus:border-burntOrange resize-none text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold uppercase text-charcoal-700 mb-1">
                  Location (e.g. Lagos · Worldwide)
                </label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-charcoal outline-none focus:border-burntOrange text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-charcoal-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-editorial-sm bg-white border border-sand-300 text-charcoal outline-none focus:border-burntOrange text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold uppercase text-charcoal-700 mb-1">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={profile.instagram}
                  onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                  className="w-full px-3 py-2 rounded-editorial-sm bg-white border border-sand-300 text-charcoal outline-none focus:border-burntOrange text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-charcoal-700 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  className="w-full px-3 py-2 rounded-editorial-sm bg-white border border-sand-300 text-charcoal outline-none focus:border-burntOrange text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-charcoal-700 mb-1">
                  Twitter / X URL
                </label>
                <input
                  type="url"
                  value={profile.twitter}
                  onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                  className="w-full px-3 py-2 rounded-editorial-sm bg-white border border-sand-300 text-charcoal outline-none focus:border-burntOrange text-xs"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-editorial bg-burntOrange hover:bg-burntOrange-hover text-white font-semibold flex items-center justify-center gap-1.5 shadow-subtle transition-all active:scale-95 text-xs sm:text-sm uppercase tracking-wider"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: BOOKINGS & ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-medium text-charcoal">
              Bookings & Client Orders
            </h2>
            <p className="text-xs text-charcoal-500">
              Verified records of client bookings and checkouts.
            </p>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-3 pt-1">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-editorial bg-white border border-sand-300 shadow-subtle text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-sand-200">
                    <span className="font-mono font-semibold text-charcoal">
                      {order.paymentReference}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Confirmed
                    </span>
                  </div>

                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-charcoal-400 block">
                        Client
                      </span>
                      <span className="font-semibold text-charcoal">{order.clientName}</span>
                      <div className="text-charcoal-500 truncate">{order.clientEmail}</div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-charcoal-400 block">
                        Service & Plan
                      </span>
                      <span className="font-medium text-charcoal">{order.serviceTitle}</span>
                      <div className="text-charcoal-500">{order.planName}</div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-charcoal-400 block">
                        Amount Paid
                      </span>
                      <span className="font-display text-base font-semibold text-burntOrange">
                        {formatCurrency(order.amountPaid, order.currency)}
                      </span>
                      <div className="text-charcoal-400 text-[10px]">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-editorial border border-dashed border-sand-300 bg-sand-50/50">
              <ShoppingBag className="w-8 h-8 text-charcoal-400 mx-auto mb-2 opacity-60" />
              <p className="text-xs text-charcoal-600 font-medium">
                No orders recorded yet.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Service Create/Edit Modal */}
      <AdminServiceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingService(null);
        }}
        service={editingService}
        onSave={handleSaveService}
      />
    </div>
  );
}
