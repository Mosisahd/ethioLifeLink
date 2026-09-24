ETHIOLIFELINK FIX - VACANCY EXPIRE DATE

1. Open Supabase -> SQL Editor.
2. Open fix_expire_at.sql and run the whole SQL.
3. Confirm the result shows:
   expire_at | date
4. Replace your website files with this corrected project.
5. Hard refresh the browser (Ctrl+F5).
6. Add a job and choose a Vacancy Expire Date.

Important:
- The actual Supabase table is public.listings.
- The website files were corrected to use "listings" instead of "listing".
- The vacancy expiry date is stored in public.listings.expire_at.
- The code will no longer silently discard expire_at if the database column is missing.
