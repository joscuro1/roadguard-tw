import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import type { ReviewKind } from "@/lib/i18n";

export type Review = {
  id: number;
  displayName: string;
  rating: number;
  kind: ReviewKind;
  body: string;
  helpful: number;
  createdAt: string;
};

export type BoardStats = {
  reviewCount: number;
  ratingSum: number;
  average: number;
  downloads: number;
};

export type Board = {
  reviews: Review[];
  stats: BoardStats;
};

type ReviewRow = {
  id: number;
  display_name: string;
  rating: number;
  kind: string;
  body: string;
  helpful: number;
  created_at: unknown;
};

const KINDS: ReviewKind[] = ["review", "feedback", "recommendation"];

function isKind(value: string): value is ReviewKind {
  return (KINDS as string[]).includes(value);
}

function toIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" && value) return value;
  return new Date().toISOString();
}

function mapReview(row: ReviewRow): Review {
  return {
    id: Number(row.id),
    displayName: row.display_name,
    rating: Number(row.rating),
    kind: isKind(row.kind) ? row.kind : "review",
    body: row.body,
    helpful: Number(row.helpful),
    createdAt: toIso(row.created_at),
  };
}

async function loadBoard(): Promise<Board> {
  const sql = await getSql();
  const rows = await sql<ReviewRow>`
    select id, display_name, rating, kind, body, helpful, created_at
    from reviews
    order by created_at desc
    limit 80
  `;
  const tally = await sql<{ review_count: number; rating_sum: number }>`
    select count(*)::int as review_count,
           coalesce(sum(rating), 0)::int as rating_sum
    from reviews
  `;
  const downloads = await sql<{ value: number }>`
    select value from app_stats where key = 'downloads'
  `;
  const reviewCount = Number(tally[0]?.review_count ?? 0);
  const ratingSum = Number(tally[0]?.rating_sum ?? 0);
  return {
    reviews: rows.map(mapReview),
    stats: {
      reviewCount,
      ratingSum,
      average: reviewCount === 0 ? 0 : ratingSum / reviewCount,
      downloads: Number(downloads[0]?.value ?? 0),
    },
  };
}

export const getBoard = createServerFn({ method: "GET" }).handler(async () => {
  return loadBoard();
});

const createSchema = z.object({
  displayName: z.string().trim().max(20),
  rating: z.number().int().min(1).max(5),
  kind: z.enum(["review", "feedback", "recommendation"]),
  body: z.string().trim().min(12).max(400),
});

export const createReview = createServerFn({ method: "POST" })
  .validator(createSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const name = data.displayName || "Driver";
    const rows = await sql<ReviewRow>`
      insert into reviews (display_name, rating, kind, body)
      values (${name}, ${data.rating}, ${data.kind}, ${data.body})
      returning id, display_name, rating, kind, body, helpful, created_at
    `;
    const row = rows[0];
    if (!row) throw new Error("Insert failed");
    return mapReview(row);
  });

export const markHelpful = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number().int().positive() }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{ helpful: number }>`
      update reviews
      set helpful = helpful + 1
      where id = ${data.id}
      returning helpful
    `;
    return { id: data.id, helpful: Number(rows[0]?.helpful ?? 0) };
  });

export const recordDownload = createServerFn({ method: "POST" }).handler(
  async () => {
    const sql = await getSql();
    const rows = await sql<{ value: number }>`
      insert into app_stats (key, value) values ('downloads', 1)
      on conflict (key) do update set value = app_stats.value + 1
      returning value
    `;
    return { downloads: Number(rows[0]?.value ?? 0) };
  },
);
