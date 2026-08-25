'use client';

import React, { useState, useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ProfileHeader } from '@/components/ProfileHeader';
import { ServiceList } from '@/components/ServiceList';
import { ContactSocials } from '@/components/ContactSocials';
import { ShareBottomSheet } from '@/components/ShareBottomSheet';
import { DirectInquiryModal } from '@/components/DirectInquiryModal';
import { CreatorProfile, Service } from '@/types';
import { getProfile, getServices } from '@/lib/storage';
import { INITIAL_PROFILE, INITIAL_SERVICES } from '@/data/mockData';

export default function HomePage() {
  const [profile, setProfile] = useState<CreatorProfile>(INITIAL_PROFILE);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [shareOpen, setShareOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [profData, servData] = await Promise.all([
          getProfile(),
          getServices(),
        ]);
        if (profData) setProfile(profData);
        if (servData && servData.length > 0) setServices(servData);
      } catch (err) {
        console.error('Error loading data', err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. Hero with Banner and Circular Arch Portrait */}
      <HeroSection
        bannerUrl={profile.heroBannerUrl}
        avatarUrl={profile.avatarUrl}
        creatorName={profile.name}
        onOpenShare={() => setShareOpen(true)}
      />

      {/* 2. Editorial Profile Header */}
      <ProfileHeader profile={profile} />

      {/* 3. Numbered Dynamic Services List */}
      <div className="w-full mt-1">
        <ServiceList services={services} />
      </div>

      {/* 4. Socials & Custom Inquiry CTA Section */}
      <div className="w-full mt-auto">
        <ContactSocials
          profile={profile}
          onOpenInquiry={() => setInquiryOpen(true)}
        />
      </div>

      {/* 5. Share Bottom Sheet Drawer */}
      <ShareBottomSheet
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={`${profile.name} · ${profile.title}`}
      />

      {/* 6. Custom Service Request Modal */}
      <DirectInquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        creatorEmail={profile.email}
      />
    </div>
  );
}
