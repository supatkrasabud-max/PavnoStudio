# PAVNO Analytics setup

The site records only aggregated shop activity: page opens, product-detail opens, add-to-cart actions, sample-file opens, a hashed anonymous browser identifier, and the referrer domain. It does not record IP address, name, email, form contents, or payment information.

## 1. Create the table

In Supabase, open **SQL Editor**, paste the entire contents of `supabase/analytics.sql`, and run it once.

## 2. Add Vercel variables

In Vercel → the `pavnostudio` project → Settings → Environment Variables, add these values for Production and Preview:

| Name | Value | Type |
| --- | --- | --- |
| `SUPABASE_URL` | Your Supabase project URL | Config |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase **service_role** key | Secret |
| `PAVNO_ANALYTICS_DASHBOARD_KEY` | A long password you choose for the dashboard | Secret |

Never place `SUPABASE_SERVICE_ROLE_KEY` in a browser file, `.env.example`, or GitHub.

## 3. Deploy and view statistics

Push the code to GitHub. Vercel deploys the new `/api/analytics` endpoint automatically. Then open `/demo/` → **สถิติผู้เข้าชมเว็บไซต์**, choose a period, enter `PAVNO_ANALYTICS_DASHBOARD_KEY`, and select **ดูสถิติ**.

The statistic page currently has no user-login system. Keep the `/demo/` link private until a proper login is added. The dashboard key is sent only to your own `/api/analytics` endpoint for that single request and is not stored in the browser.
