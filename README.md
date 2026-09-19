# RoadGuard TW

Website for the RoadGuard TW Android app — download, ratings, feedback, and feature ideas.

- Live preview: this chat
- GitHub: after you connect Cloudflare Pages, every push to `main` goes live at `*.pages.dev`

## Cloudflare Pages

1. [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages) → **Create application** → **Pages** → **Connect to Git**
2. Authorize GitHub and select this repository
3. Use these build settings, then **Save and Deploy**

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |

The in-site **上架 / Deploy** page has the same steps.

Reviews on the published Grok app use a database. A static Pages deploy still shows the landing and download; shared ratings need D1 (or keep the published app for the live board).
