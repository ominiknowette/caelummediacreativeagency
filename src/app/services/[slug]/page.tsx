import { Metadata } from 'next';
import { INITIAL_SERVICES } from '@/data/mockData';
import { ServiceDetailClient } from '@/components/ServiceDetailClient';

export const dynamicParams = true;

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return INITIAL_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = INITIAL_SERVICES.find((s) => s.slug === params.slug);
  if (!service) {
    return {
      title: 'Service · Amara Vance',
    };
  }

  return {
    title: `${service.title} · Amara Vance`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} · Amara Vance`,
      description: service.shortDescription,
      images: [service.heroImage],
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = INITIAL_SERVICES.find((s) => s.slug === params.slug) || null;
  return <ServiceDetailClient initialService={service} slug={params.slug} />;
}
