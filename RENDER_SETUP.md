# Render Deployment Setup

Your GitHub repository is ready: **https://github.com/echoparkpaper/drew-porsches**

Follow these steps to deploy to Render:

## Step 1: Create PostgreSQL Database

1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"PostgreSQL"**
3. Fill in the following:
   - **Name:** `drew-porsches-db`
   - **Database:** `drew_porsches`
   - **User:** (auto-generated, keep default)
   - **Region:** `Oregon`
   - **PostgreSQL Version:** `15`
4. Click **"Create Database"**
5. Once created, copy the **Internal Database URL** (shown on the database page)
   - It will look like: `postgresql://user:password@hostname:5432/drew_porsches`

## Step 2: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account (if needed) and select the **`drew-porsches`** repo
3. Configure the service:
   - **Name:** `drew-porsches`
   - **Region:** `Oregon`
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** `Starter` (or higher if needed)

## Step 3: Set Environment Variables

In the Web Service, add the following environment variables:

| Key | Value |
|-----|-------|
| `NEXTAUTH_SECRET` | `CHWVdfIADJscHbgsxvP0ev7v/PenNOfIiEUuzu1HAZQ=` |
| `DATABASE_URL` | *Paste the Internal Database URL from Step 1* |
| `NEXTAUTH_URL` | `https://drew-porsches-xxxx.onrender.com` (Render will assign this URL) |

**Important:** 
- After Render assigns your service URL (visible in the dashboard), come back and update `NEXTAUTH_URL` with the actual URL
- The URL format will be something like `https://drew-porsches-abc123.onrender.com`

## Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will automatically build and deploy your app
3. Monitor the **Logs** tab to watch the build process
4. Once deployed, click the service URL to see your live app

## Step 5: Update NEXTAUTH_URL

Once the service is running and you have the URL:

1. Go back to your Web Service settings
2. Update the `NEXTAUTH_URL` environment variable with your actual Render URL
3. Trigger a redeploy (in Logs, click "Manual Deploy")

## Troubleshooting

**Build fails?** Check the logs for errors. Common issues:
- Missing environment variables
- Incorrect Node version (should be 18+)
- Database connection string incorrect

**App won't start?** Make sure:
- All three environment variables are set
- DATABASE_URL is correct (check it matches your Postgres Internal URL)
- The database tables exist (they auto-create on first run)

**Can't connect to database?** 
- Use the **Internal Database URL** (not external) for DATABASE_URL
- Make sure the Web Service and PostgreSQL are in the same region (Oregon)

## After Deployment

- **Initialize Database:** The database tables auto-create on first request, but you can manually run the init script if needed
- **First User:** Create your account via the signup page at `https://your-app-url/auth/signup`
- **Add Cars:** Start cataloging your car collection!

## Support

For issues:
- Check Render Logs for error messages
- Review `CLAUDE.md` for architecture details
- Verify environment variables are set correctly
