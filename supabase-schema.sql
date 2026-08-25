-- ==========================================================
-- EDITORIAL SOCIAL & CREATIVE PLATFORM - SUPABASE SCHEMA
-- ==========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILE TABLE
create table if not exists public.profile (
  id text primary key default 'primary',
  name text not null,
  handle text not null,
  title text not null,
  tagline text not null,
  bio text not null,
  avatar_url text not null,
  hero_banner_url text not null,
  location text,
  email text,
  instagram text,
  tiktok text,
  youtube text,
  linkedin text,
  twitter text,
  available_for_work boolean default true,
  stats jsonb default '[]'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. SERVICES TABLE
create table if not exists public.services (
  id text primary key default ('srv-' || uuid_generate_v4()::text),
  title text not null,
  slug text unique not null,
  category text not null,
  short_description text not null,
  full_description text not null,
  benefits jsonb default '[]'::jsonb,
  deliverables jsonb default '[]'::jsonb,
  timeline text,
  price numeric not null,
  currency text default 'NGN',
  payment_plans jsonb default '[]'::jsonb,
  hero_image text not null,
  gallery_images jsonb default '[]'::jsonb,
  duration text not null,
  active boolean default true,
  featured boolean default false,
  display_order integer default 0,
  cta_text text default 'Book Access',
  target_audience jsonb default '[]'::jsonb,
  faqs jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ORDERS & BOOKINGS TABLE
create table if not exists public.orders (
  id text primary key default ('ord-' || uuid_generate_v4()::text),
  service_id text references public.services(id) on delete set null,
  service_title text not null,
  client_name text not null,
  client_email text not null,
  client_phone text,
  plan_type text not null,
  plan_name text not null,
  amount_paid numeric not null,
  total_amount numeric not null,
  currency text default 'NGN',
  status text default 'pending',
  payment_reference text,
  payment_method text default 'paystack',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES
alter table public.profile enable row level security;
alter table public.services enable row level security;
alter table public.orders enable row level security;

-- Public can read profile and active services
create policy "Allow public read access on profile" on public.profile for select using (true);
create policy "Allow public read access on services" on public.services for select using (active = true);
create policy "Allow public insert on orders" on public.orders for insert with check (true);
create policy "Allow authenticated all on profile" on public.profile for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all on services" on public.services for all using (auth.role() = 'authenticated');
create policy "Allow authenticated read on orders" on public.orders for select using (auth.role() = 'authenticated');
