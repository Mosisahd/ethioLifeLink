-- EthioLifeLink / AddisConnect
-- Fix: "Could not find the 'expire_at' column of 'listings' in the schema cache"
--
-- Run this once in Supabase -> SQL Editor.

alter table public.listings
add column if not exists expire_at date;

-- Refresh PostgREST's schema cache immediately.
notify pgrst, 'reload schema';

-- Optional check:
select column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'listings'
  and column_name = 'expire_at';
