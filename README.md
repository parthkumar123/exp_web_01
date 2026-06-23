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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## IndexNow (instant search-engine notifications)

[IndexNow](https://www.indexnow.org/) tells participating search engines —
**Bing, Yandex, Naver, Seznam and Yep** — to recrawl a page the moment it
changes, instead of waiting for the next scheduled crawl. (Google does **not**
support IndexNow, so it has no effect on Google rankings — Google still relies on
`sitemap.xml` + Search Console.)

### How it's wired up

- **Ownership key:** `public/<key>.txt` is served at `https://<host>/<key>.txt` and
  proves we own the domain. Its filename must equal the `INDEXNOW_KEY` env var.
- **Automatic pings:** creating, updating or deleting a product in the admin
  (`POST`/`PUT`/`DELETE /api/products`) submits the affected URLs (detail page,
  its listing page, and the homepage) via [`lib/indexnow.ts`](lib/indexnow.ts).
  This piggybacks on the same hook as on-demand revalidation. It fails soft — a
  missing key, a localhost host, or a network error never breaks the save.
- **Manual bulk submit:** `POST /api/indexnow` submits every public URL (the same
  set as `sitemap.xml`). Use it once at launch or after a bulk import. It's
  guarded by `ADMIN_PASSWORD`:

  ```bash
  curl -X POST https://sensoagrotech.com/api/indexnow \
    -H "Authorization: Bearer $ADMIN_PASSWORD"
  ```

### Setup / key rotation

1. Set `INDEXNOW_KEY` in your deployment env (e.g. Vercel project settings). It
   must match the committed `public/<key>.txt` filename.
2. To rotate: `openssl rand -hex 32`, rename `public/<old>.txt` → `public/<new>.txt`
   (and update its contents), and update `INDEXNOW_KEY`. Keep the two in sync.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
