# RoadGuard TW

Website for the RoadGuard TW Android app — download, ratings, feedback, and feature ideas.

## Cloudflare Workers / Pages

1. [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages) → **Create application** → connect GitHub repo `joscuro1/roadguard-tw`
2. Use these settings, then **Deploy**

| Setting | Value |
|---|---|
| Project name | `roadguard-tw` |
| Build command | `NITRO_PRESET=cloudflare_module npm run build` |
| Deploy command | `npx wrangler deploy` |

Reviews on this live preview use a local database. On Cloudflare, shared ratings need a hosted Postgres (`DATABASE_URL`) or D1 later.
