-- Optional starter content for Steppingstone Realty.
-- Safe to re-run: uses fixed IDs and ON CONFLICT / existence checks.
-- Demo listings are clearly labelled SAMPLE and can be deleted from the admin dashboard.

-- Principal Realtor (known facts only; biography fields left empty on purpose)
insert into public.realtor_profile (id, name, title)
values (
  '00000000-0000-0000-0000-000000000001',
  'Deji Aderemi',
  'Principal Realtor'
)
on conflict (id) do nothing;

-- Homepage / services copy. Keep this factual and editable from Admin → Site content.
insert into public.site_content (key, value)
values
  (
    'home_intro',
    'Steppingstone Realty provides estate agency services in Guyana. That includes property and facility administration and management, survey and valuation, brokerage, short- and long-term rentals, property sales, house agency, property consultation and advisory, and letting services.'
  ),
  (
    'home_services',
    'Property and facility administration and management
Survey and valuation
Brokerage
Short- and long-term rentals
Property sales
House agency
Property consultation and advisory
Letting services'
  ),
  (
    'services_intro',
    'Steppingstone Realty also assists landlords and property owners with caretaking and management. If you are away, or simply want a local partner looking after your property, we would be glad to talk.'
  ),
  (
    'services_cta',
    'Looking for someone to care for your property in Guyana?'
  )
on conflict (key) do nothing;

-- Editable property-management services
insert into public.services (id, title, description, sort_order, is_published)
values
  (
    '10000000-0000-0000-0000-000000000001',
    'Property inspections',
    'Scheduled visits to review the condition of a property and keep the owner informed.',
    10,
    true
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'Property caretaking',
    'Day-to-day looking after of a property, including when the owner is away.',
    20,
    true
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'Maintenance coordination',
    'Help arranging repairs and maintenance with local contractors when work is needed.',
    30,
    true
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    'Tenant-related coordination',
    'Support coordinating with tenants on behalf of the property owner.',
    40,
    true
  ),
  (
    '10000000-0000-0000-0000-000000000005',
    'Property condition monitoring',
    'Ongoing attention to the state of the property so issues can be noticed early.',
    50,
    true
  ),
  (
    '10000000-0000-0000-0000-000000000006',
    'General landlord support',
    'Practical assistance for owners who want a local point of contact for their property.',
    60,
    true
  ),
  (
    '10000000-0000-0000-0000-000000000007',
    'Support while the owner is away',
    'Help managing a property when the owner is overseas or otherwise away from Guyana.',
    70,
    true
  )
on conflict (id) do nothing;

-- Clearly labelled SAMPLE listings so the public pages are not empty after setup.
-- These are demonstration content only — delete them from Admin → Properties.
insert into public.properties (
  id, title, slug, description, listing_type, status, property_type,
  price, currency, price_period, location, address, bedrooms, bathrooms,
  property_size, lot_size, features, is_featured, is_published, is_demo
)
values
  (
    '20000000-0000-0000-0000-000000000001',
    'SAMPLE — Three-bedroom house (demo listing)',
    'sample-three-bedroom-house-demo',
    'This is a demonstration listing used to show how a sale property appears on the website. It is not a real Steppingstone Realty listing. Delete it from the admin dashboard when you are ready to add actual properties.',
    'sale',
    'available',
    'house',
    45000000,
    'GYD',
    null,
    'Georgetown',
    null,
    3,
    2,
    '2,000 sq ft',
    '5,000 sq ft',
    array['Covered parking', 'Indoor kitchen', 'Fenced yard'],
    true,
    true,
    true
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    'SAMPLE — Two-bedroom apartment for rent (demo listing)',
    'sample-two-bedroom-apartment-demo',
    'This is a demonstration listing used to show how a rental appears on the website. It is not a real Steppingstone Realty listing. Delete it from the admin dashboard when you are ready to add actual properties.',
    'rent',
    'available',
    'apartment',
    180000,
    'GYD',
    'month',
    'Georgetown',
    null,
    2,
    1,
    '900 sq ft',
    null,
    array['Security', 'Water tank'],
    true,
    true,
    true
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    'SAMPLE — Managed residential property (demo listing)',
    'sample-managed-property-demo',
    'This is a demonstration listing used to show how a managed property appears on the website. It is not a real Steppingstone Realty listing. Delete it from the admin dashboard when you are ready to add actual properties.',
    'managed',
    'available',
    'house',
    null,
    'GYD',
    null,
    'East Coast Demerara',
    null,
    4,
    3,
    null,
    null,
    array['Caretaking in place'],
    false,
    true,
    true
  )
on conflict (id) do nothing;

insert into public.property_images (id, property_id, url, storage_path, alt_text, sort_order, is_primary)
values
  (
    '30000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    '/demo/sample-house.svg',
    null,
    'Sample demonstration house listing',
    0,
    true
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000001',
    '/demo/sample-interior.svg',
    null,
    'Sample demonstration interior photograph',
    1,
    false
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0000-000000000002',
    '/demo/sample-apartment.svg',
    null,
    'Sample demonstration apartment listing',
    0,
    true
  ),
  (
    '30000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0000-000000000003',
    '/demo/sample-managed.svg',
    null,
    'Sample demonstration managed property',
    0,
    true
  )
on conflict (id) do nothing;
