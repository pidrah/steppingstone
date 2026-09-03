# Steppingstone Realty

Website for **Steppingstone Realty**, a real estate office in Georgetown, Guyana.

The public site lists properties for sale, rent, and management, introduces Principal Realtor Deji Aderemi, and explains property-care services for landlords.

The office dashboard lets staff add, edit, and remove listings — including photographs — without changing any code.

## What this site does

- Public pages for home, properties, property details, property care, Principal Realtor, and contact
- Filters for sale / rent / managed, property type, location, price, bedrooms, and keyword
- A protected admin area to manage properties, images, the realtor profile, services, and homepage wording
- Photographs stored in cloud storage so they survive app deploys
- Contact actions for phone, email, WhatsApp, and Facebook

## Technology

- [Next.js](https://nextjs.org/) (App Router) and TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) for the database, staff login, and image storage

Supabase has a generous free tier that is enough for a small office website.

## 1. Install the project locally

You need Node.js 20 or newer.

```bash
git clone https://github.com/pidrah/steppingstone.git
cd steppingstone
npm install
cp .env.example .env.local
```

## 2. Create a Supabase project

1. Open [https://supabase.com](https://supabase.com) and create a free account.
2. Create a new project. Choose a strong database password and save it somewhere safe.
3. Wait until the project is ready.

## 3. Configure environment variables

In Supabase go to **Project Settings → API** and copy:

- Project URL
- `anon` `public` key

Put them in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Do **not** put the `service_role` key in this app. The website uses the public anon key together with login and database security rules.

When you deploy, set `NEXT_PUBLIC_SITE_URL` to your live domain, for example `https://www.steppingstonerealty.com`.

## 4. Create the database and image storage

In Supabase open **SQL → New query**.

1. Paste and run everything in `supabase/schema.sql`.  
   This creates the tables, security rules, and two public storage buckets: `property-images` and `profile-images`.
2. Paste and run everything in `supabase/seed.sql`.  
   This adds the Principal Realtor name, the company introduction, property-care services, and a few **SAMPLE** listings so the site is not empty. The sample listings are labelled as demonstration content and can be deleted from the dashboard.

## 5. Create the first admin account

The website does not have a public “sign up” page.

1. In Supabase go to **Authentication → Users**.
2. Click **Add user → Create new user**.
3. Enter the office email and a strong password.
4. Optionally turn **off** “Allow new users to sign up” under **Authentication → Providers → Email**, so only people you add can log in.

Then sign in at `/admin/login`.

## 6. Run the website

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

## How to add a property

1. Sign in to `/admin`.
2. Click **Add property**.
3. Enter the title, sale/rent/managed, price, location, bedrooms, bathrooms, description, and features.
4. Choose photographs from your computer (JPEG, PNG, WebP, or GIF, up to 8 MB each).
5. Leave **Published on the website** checked if it should appear immediately.
6. Save. The listing will show on the public site.

You can come back later to edit details, add or delete photographs, choose the main photograph, reorder photographs, mark the property sold/rented/under offer, unpublish it, or delete it.

## How property photographs work

- Images are uploaded to Supabase Storage, not into the website code.
- The database stores the image URL and which property it belongs to.
- If you deploy the website again, the photographs remain.
- Invalid file types and files larger than 8 MB are rejected, with a message on screen.

## How to update the Principal Realtor profile

Go to **Admin → Realtor Profile**.

You can add or change:

- Name and title
- Profile photograph
- Biography
- Experience and years of experience
- Areas of expertise
- Qualifications
- Professional achievements
- Areas served
- Philosophy

Empty fields are hidden on the public page. Until you add a biography, the public page shows “Professional profile coming soon.”

## How to update property-care services

Go to **Admin → Services**.

Add, edit, hide, or delete the items shown on the Property Care page. You do not need to change any code.

## How to update the homepage wording

Go to **Admin → Site Content**.

You can edit the company introduction, the list of estate agency services, and the Property Care page wording.

## Useful commands

```bash
npm run dev        # development
npm run lint       # lint
npm run typecheck  # TypeScript
npm run build      # production build
npm start          # run the production build
```

## Deploy

A typical setup:

1. Host the website on [Vercel](https://vercel.com) (free tier is enough to start).
2. Keep the database and images on Supabase.
3. In Vercel, add the same environment variables as `.env.local`, with `NEXT_PUBLIC_SITE_URL` set to your live domain.

After the first deploy:

- Run `schema.sql` and `seed.sql` if you have not already.
- Create the admin user in Supabase.
- Delete the SAMPLE listings from the dashboard.
- Add real properties and a profile photograph.

## Contact details used on the site

- **Steppingstone Realty**
- Principal Realtor: Deji Aderemi
- 56 Brickdam & Austin Place, Georgetown, Guyana, South America
- Phone: +592 653-5888
- Email: steppingstonerealtygy@gmail.com
- Facebook: [@steppingstonerealty](https://www.facebook.com/steppingstonerealty)
- WhatsApp: [wa.me/5926535888](https://wa.me/5926535888)

## Security notes

- Admin pages require a signed-in user.
- Database rules allow the public to read only published content.
- Only signed-in staff can create, edit, or delete records and upload images.
- Do not commit `.env.local` or any real API keys.
