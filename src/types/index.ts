export interface PaymentPlan {
  id: string;
  type: 'one_time' | 'installment';
  name: string;
  depositAmount: number;
  totalAmount: number;
  installmentsCount?: number;
  installmentAmount?: number;
  interval?: 'monthly' | 'bi-weekly' | 'milestone';
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  deliverables?: string[];
  timeline?: string;
  price: number;
  currency: string;
  paymentPlans: PaymentPlan[];
  heroImage: string;
  duration: string;
  active: boolean;
  displayOrder: number;
  ctaText: string;
  targetAudience?: string[];
  faqs?: ServiceFAQ[];
}

export interface CreatorProfile {
  name: string;
  handle: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  heroBannerUrl: string;
  location: string;
  email: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
  twitter: string;
}

export interface BookingOrder {
  id: string;
  serviceId: string;
  serviceTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  planType: 'one_time' | 'installment';
  planName: string;
  amountPaid: number;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  paymentReference: string;
  paymentMethod: string;
  createdAt: string;
  notes?: string;
}
