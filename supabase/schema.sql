-- Steppingstone Realty database schema
-- Run this in the Supabase SQL Editor (SQL → New query) on a new project.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  listing_type text not null check (listing_type in ('sale', 'rent', 'managed')),
  status text not null default 'available'
    check (status in ('available', 'sold', 'rented', 'under_offer', 'unavailable')),
  property_type text not null
    check (property_type in ('house', 'apartment', 'land', 'commercial', 'office', 'other')),
  price numeric,
  currency text not null default 'GYD',
  price_period text,
  location text,
  address text,
  bedrooms integer,
  bathrooms numeric,
  property_size text,
  lot_size text,
  features text[] not null default '{}',
  is_featured boolean not null default false,
  is_published boolean not null default false,
  is_demo boolean not null default false,
  contact_phone text,
  contact_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_listing_type_idx on public.properties (listing_type);
create index if not exists properties_status_idx on public.properties (status);
create index if not exists properties_published_idx on public.properties (is_published);
create index if not exists properties_featured_idx on public.properties (is_featured);
create index if not exists properties_type_idx on public.properties (property_type);
create index if not exists properties_created_at_idx on public.properties (created_at desc);

create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties (id) on delete cascade,
  url text not null,
  storage_path text,
  alt_text text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists property_images_property_id_idx on public.property_images (property_id);
create index if not exists property_images_sort_idx on public.property_images (property_id, sort_order);

create table if not exists public.realtor_profile (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Deji Aderemi',
  title text not null default 'Principal Realtor',
  photo_url text,
  photo_path text,
  biography text,
  experience text,
  years_of_experience text,
  areas_of_expertise text,
  qualifications text,
  achievements text,
  areas_served text,
  philosophy text,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_content (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists properties_set_updated_at on public.properties;
create trigger properties_set_updated_at
  before update on public.properties
  for each row execute function public.set_updated_at();

drop trigger if exists realtor_profile_set_updated_at on public.realtor_profile;
create trigger realtor_profile_set_updated_at
  before update on public.realtor_profile
  for each row execute function public.set_updated_at();

drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
  before update on public.site_content
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.realtor_profile enable row level security;
alter table public.services enable row level security;
alter table public.site_content enable row level security;

-- Properties: public can read published rows; authenticated users have full access.
drop policy if exists "Public can view published properties" on public.properties;
create policy "Public can view published properties"
  on public.properties for select
  to anon, authenticated
  using (is_published = true or auth.uid() is not null);

drop policy if exists "Authenticated can insert properties" on public.properties;
create policy "Authenticated can insert properties"
  on public.properties for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update properties" on public.properties;
create policy "Authenticated can update properties"
  on public.properties for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete properties" on public.properties;
create policy "Authenticated can delete properties"
  on public.properties for delete
  to authenticated
  using (true);

-- Images: public can read images belonging to published properties.
drop policy if exists "Public can view images of published properties" on public.property_images;
create policy "Public can view images of published properties"
  on public.property_images for select
  to anon, authenticated
  using (
    auth.uid() is not null
    or exists (
      select 1 from public.properties p
      where p.id = property_images.property_id
        and p.is_published = true
    )
  );

drop policy if exists "Authenticated can insert images" on public.property_images;
create policy "Authenticated can insert images"
  on public.property_images for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update images" on public.property_images;
create policy "Authenticated can update images"
  on public.property_images for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete images" on public.property_images;
create policy "Authenticated can delete images"
  on public.property_images for delete
  to authenticated
  using (true);

-- Realtor profile
drop policy if exists "Public can view realtor profile" on public.realtor_profile;
create policy "Public can view realtor profile"
  on public.realtor_profile for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated can insert realtor profile" on public.realtor_profile;
create policy "Authenticated can insert realtor profile"
  on public.realtor_profile for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update realtor profile" on public.realtor_profile;
create policy "Authenticated can update realtor profile"
  on public.realtor_profile for update
  to authenticated
  using (true)
  with check (true);

-- Services
drop policy if exists "Public can view published services" on public.services;
create policy "Public can view published services"
  on public.services for select
  to anon, authenticated
  using (is_published = true or auth.uid() is not null);

drop policy if exists "Authenticated can insert services" on public.services;
create policy "Authenticated can insert services"
  on public.services for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update services" on public.services;
create policy "Authenticated can update services"
  on public.services for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete services" on public.services;
create policy "Authenticated can delete services"
  on public.services for delete
  to authenticated
  using (true);

-- Site content
drop policy if exists "Public can view site content" on public.site_content;
create policy "Public can view site content"
  on public.site_content for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated can insert site content" on public.site_content;
create policy "Authenticated can insert site content"
  on public.site_content for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update site content" on public.site_content;
create policy "Authenticated can update site content"
  on public.site_content for update
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- Storage buckets
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('profile-images', 'profile-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view property images" on storage.objects;
create policy "Public can view property images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id in ('property-images', 'profile-images'));

drop policy if exists "Authenticated can upload property images" on storage.objects;
create policy "Authenticated can upload property images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id in ('property-images', 'profile-images'));

drop policy if exists "Authenticated can update property images" on storage.objects;
create policy "Authenticated can update property images"
  on storage.objects for update
  to authenticated
  using (bucket_id in ('property-images', 'profile-images'));

drop policy if exists "Authenticated can delete property images" on storage.objects;
create policy "Authenticated can delete property images"
  on storage.objects for delete
  to authenticated
  using (bucket_id in ('property-images', 'profile-images'));
