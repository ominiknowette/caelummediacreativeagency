'use client';

import React from 'react';
import { Service } from '@/types';
import { ServiceCard } from './ServiceCard';

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  const activeServices = services.filter((s) => s.active);

  if (activeServices.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-5 sm:px-6">
      {/* Section Heading */}
      <div className="mb-4">
        <h2 className="text-xs font-bold tracking-[0.16em] uppercase text-charcoal-700">
          Services
        </h2>
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {activeServices.map((service, idx) => (
          <ServiceCard key={service.id} service={service} index={idx} />
        ))}
      </div>
    </div>
  );
}
