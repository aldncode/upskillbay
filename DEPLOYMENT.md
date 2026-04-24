# Deployment Guide

## Prerequisites

- Node.js 18+ installed locally
- PostgreSQL database (local or cloud)
- GitHub account and repository
- Hosting account (Vercel, Railway, etc.)

## Pre-Deployment Checklist

- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Seed data added
- [ ] All tests passing
- [ ] No console errors
- [ ] Images optimized
- [ ] Security review complete

## Vercel Deployment (Recommended)

### Step 1: Prepare Repository

\`\`\`bash
# Make sure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
\`\`\`

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select "Next.js" framework

### Step 3: Environment Variables

In Vercel project settings, add:

\`\`\`
DATABASE_URL=postgresql://user:password@host/dbname
NEXTAUTH_SECRET=<generate-new-one>
NEXTAUTH_URL=https://your-domain.com
GOOGLE_CLIENT_ID=<if-using-oauth>
GOOGLE_CLIENT_SECRET=<if-using-oauth>
\`\`\`

**To generate a secure NEXTAUTH_SECRET:**
\`\`\`bash
openssl rand -hex 32
\`\`\`

### Step 4: Database Setup

For production, use a managed database service:

- **Vercel Postgres** (easiest with Vercel)
- **AWS RDS**
- **Railway.app**
- **Supabase**
- **PlanetScale**

Example with Railway:

1. Create Railway project
2. Add PostgreSQL plugin
3. Copy connection string to NEXTAUTH_URL
4. Set in Vercel environment variables

### Step 5: Run Migrations

After connecting your database:

\`\`\`bash
# In Vercel, create a deployment environment variable
DATABASE_URL=your-production-database-url

# Then run migrations before deployment
npx prisma migrate deploy
\`\`\`

Or use Vercel's "Run" section in Project Settings.

### Step 6: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Visit your live site!

---

## Railway Deployment

### Step 1: Create Project

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "GitHub Repo"
4. Connect your repository

### Step 2: Add Services

1. Add "PostgreSQL" service
2. Railway automatically sets DATABASE_URL

### Step 3: Configure Node App

1. Add environment variables:
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - GOOGLE_CLIENT_ID (optional)
   - GOOGLE_CLIENT_SECRET (optional)

2. Set build command: `npm run build`
3. Set start command: `npm start`

### Step 4: Deploy

Railway auto-deploys on push to main branch.

---

## Other Platforms

### Render.com

Similar to Railway:
1. Connect GitHub repo
2. Add PostgreSQL database
3. Set environment variables
4. Deploy

### AWS Elastic Beanstalk

1. Create EB environment
2. Set Node.js 18 runtime
3. Configure RDS PostgreSQL
4. Set environment variables
5. Deploy with CLI or console

---

## Post-Deployment

### Verify Deployment

- [ ] App loads at your domain
- [ ] Auth works (login/signup)
- [ ] Database queries work
- [ ] File uploads work (if enabled)
- [ ] API endpoints respond

### Performance Optimization

1. **Enable caching headers**
   - Set in next.config.js or CDN

2. **Use a CDN**
   - Cloudflare
   - CloudFront
   - Vercel's built-in CDN

3. **Database optimization**
   - Add indexes to frequently queried fields
   - Use connection pooling
   - Monitor slow queries

4. **Image optimization**
   - Use Next.js Image component
   - Add image optimization service

### Monitoring

Set up monitoring for:

- **Uptime**: UptimeRobot, Pingdom
- **Error tracking**: Sentry, LogRocket
- **Analytics**: Google Analytics, Plausible
- **Performance**: Vercel Analytics, New Relic

### Security

- [ ] Enable HTTPS (automatic)
- [ ] Set secure cookies (NextAuth handles)
- [ ] Configure CORS if needed
- [ ] Add security headers
- [ ] Use environment variables for secrets
- [ ] Enable database backups

---

## Scaling Considerations

### As you grow:

1. **Database**
   - Add replicas
   - Use read replicas for analytics
   - Consider connection pooling (PgBouncer)

2. **Backend**
   - Use serverless edge functions
   - Implement caching layer (Redis)
   - Consider separate API server

3. **Frontend**
   - Use ISR (Incremental Static Regeneration)
   - Implement service workers
   - Use CDN for static assets

4. **Infrastructure**
   - Use load balancer
   - Multiple server instances
   - Auto-scaling groups

---

## Maintenance

### Regular Tasks

- [ ] Update dependencies: `npm update`
- [ ] Security audits: `npm audit`
- [ ] Database backups (automatic with managed services)
- [ ] Monitor error logs
- [ ] Review analytics
- [ ] Test backup restoration

### Database Backups

Most managed services auto-backup. Verify:
- Backup frequency
- Retention period
- Restore process

### Updates

\`\`\`bash
# Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm install package-name@latest
\`\`\`

---

## Troubleshooting

### Build fails on deployment

- Check Node.js version compatibility
- Verify all env vars are set
- Check for missing dependencies
- Review build logs

### Database connection fails

- Verify DATABASE_URL format
- Check network ACLs/firewall
- Ensure database is running
- Test connection locally first

### Migrations fail on production

\`\`\`bash
# View migration status
npx prisma migrate status

# Resolve migration issues
npx prisma migrate resolve --rolled-back <name>
npx prisma migrate deploy
\`\`\`

### Performance issues

- Check database queries (Prisma logs)
- Review API response times
- Monitor CPU and memory
- Check for N+1 query problems

---

## Rollback Plan

### If deployment goes wrong:

1. **Vercel**: Click "Deployments" → "Rollback to previous"
2. **Railway**: Revert to previous deployment version
3. **Manual rollback**: Deploy previous git commit

### Database rollback:

\`\`\`bash
# Revert to previous migration
npx prisma migrate resolve --rolled-back <migration-name>
npx prisma migrate deploy
\`\`\`

---

## Support

- Check deployment platform docs
- Review logs on deployment platform
- Test locally first to isolate issues
- Check Prisma and Next.js docs
- Contact support of hosting service

Happy deploying! 🚀
