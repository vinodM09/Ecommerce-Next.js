Name: Vinod Mali
Submission Date: 31 Oct 2025

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## More

See the code and live website using following resources:

You can check out [Github Repository]() - your feedback and contributions are welcome!

## Project Live Link (Vercel)


## Explaination
This e-commerce project utilizes a Next.js (App Router) architecture with React Server Components (RSC) and Client Components. Pages are designed with specific rendering strategies (SSR, SSG/ISR, or CSR) based on their functionality, interactivity, and data needs.

I used a mock database (data/products.ts) to list the products using the given product schema and the frontend interacts through Next.js API routes (/api/products) for product management.

## PAGES

/ (Home) Page  – Hybrid: SSG + Client Interactivity
because Home pages need fast load + SEO (SSG) while maintaining interactivity (CSR filtering).

/dashboard Page – Client-Side Rendering (CSR)
because CSR allows dynamic and live visual updates, which wouldn’t be possible with static rendering.
This is appropriate for admin or analytical dashboards, where SEO isn’t required but realtime UX is important.

/admin Page – Client-side rendering (CSR)
because Admin panels need maximum flexibility, instant feedback, and interactive forms. CSR provides that control.
*Admin page is password protected, use username as "user" and password as "pass" to see the page.

/products/[slug] Page – Static Site Generation (SSG) + ISR
because Users get instant loads from CDN-cached pages while backend revalidation ensures the data stays updated without full rebuilds.

/recommendations Page – React Server Components (SSR)
because Server rendering is ideal for static or read-only pages where SEO and initial performance matter.
Client interactivity is isolated to specific components using "use client".

## DATABASE SETUP
No db setup is needed, used mock data.

## REQUIREMENTS
Create a .env.local file and add
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
ADMIN_USER=user
ADMIN_PASS=pass

## API STRUCTURE
	•	/api/products → GET all, POST new
	•	/api/products/[slug] → GET single product
	•	ProductSchema includes fields: name, slug, description, price, category, inventory, image, lastUpdated.