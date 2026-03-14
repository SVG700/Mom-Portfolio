# CA Kavya Patnam Portfolio

A premium, responsive portfolio website for CA Kavya Patnam built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Features

- Professional consulting-firm style UI
- Sticky shrinking navbar with smooth scrolling
- Hero, About, Services, Skills, Certifications, Experience, Testimonials, Languages, Contact, and Footer sections
- Animated timeline and testimonial carousel
- Modern contact form with validation UI
- SEO metadata setup
- Fully responsive and Vercel compatible

## Local Development

1. Install dependencies:

   npm install

2. Start development server:

   npm run dev

3. Open:

   http://localhost:3000

## Formspree Setup (Contact Form)

1. Create a form in Formspree and copy your endpoint.
2. Create a local env file from [ .env.example ] and set:

   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/maqpbpan

3. Restart the dev server after updating env values.

For Vercel:

1. Open Project Settings > Environment Variables.
2. Add NEXT_PUBLIC_FORMSPREE_ENDPOINT with your Formspree endpoint.
3. Redeploy the project.

## Production Build

1. Create production build:

   npm run build

2. Run production server locally:

   npm run start

## Deploy to Vercel

### Option 1: Via GitHub (Recommended)

1. Push this project to a GitHub repository.
2. Go to Vercel dashboard and click New Project.
3. Import the GitHub repository.
4. Keep default settings for Next.js and click Deploy.

### Option 2: Vercel CLI

1. Install Vercel CLI:

   npm i -g vercel

2. Deploy from project root:

   vercel

3. For production deployment:

   vercel --prod

## Project Structure

- app/
  - layout.tsx
  - page.tsx
  - globals.css
  - sitemap.ts
  - robots.ts
- components/
  - portfolio-page.tsx
- public/
  - profile-placeholder.svg
  - CA-Kavya-Patnam-Resume.pdf

## Notes

- Update LinkedIn URL in the contact and footer sections with the final profile link.
- Replace placeholder profile image and resume with final assets as needed.
