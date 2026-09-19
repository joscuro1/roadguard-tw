create table if not exists reviews (
  id serial primary key,
  display_name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  kind text not null check (kind in ('review', 'feedback', 'recommendation')),
  body text not null,
  helpful integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists reviews_created_at_idx on reviews (created_at desc);

create table if not exists app_stats (
  key text primary key,
  value integer not null default 0
);

insert into app_stats (key, value)
values ('downloads', 18420)
on conflict (key) do nothing;

insert into reviews (display_name, rating, kind, body, helpful, created_at)
select * from (
  values
    (
      '國道夜班',
      5,
      'review',
      '國道三號南下超準，測速點提前很夠時間減速。夜間介面也不刺眼。',
      24,
      now() - interval '5 days'
    ),
    (
      'taoyuan_loop',
      4,
      'feedback',
      '希望可以加上區間測速倒數，尤其是台 66 線那段很容易忘記起點。',
      18,
      now() - interval '4 days'
    ),
    (
      'yellowplate',
      5,
      'recommendation',
      '建議之後支援機車黃牌模式，轉彎路段的測速預警可以再早一點。',
      31,
      now() - interval '3 days'
    ),
    (
      'HSR_commuter',
      5,
      'review',
      '終於不用再翻臉書社團找測速回報。國一楊梅到新竹這段很穩。',
      16,
      now() - interval '2 days'
    ),
    (
      'kao_drift',
      4,
      'review',
      'Night HUD is easy on the eyes on National 1. Camera pings feel early enough to slow down cleanly.',
      11,
      now() - interval '30 hours'
    ),
    (
      '北投早班',
      5,
      'feedback',
      '城市路段的固定桿很準。如果能標示「新設」相機會更好判斷。',
      9,
      now() - interval '18 hours'
    ),
    (
      'east_coast',
      4,
      'recommendation',
      '台 9 線跟蘇花可以再加密一點點。整體已經比大多數導航好用。',
      7,
      now() - interval '8 hours'
    )
) as seed(display_name, rating, kind, body, helpful, created_at)
where not exists (select 1 from reviews);
