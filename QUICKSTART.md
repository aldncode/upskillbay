# Quick Start Guide - UpskillBay

## 🚀 Get Started in 5 Minutes

### Step 1: Install & Setup Database

\`\`\`bash
# Clone the repository
git clone <repo-url>
cd upskillbay-app

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local with your PostgreSQL database URL
# DATABASE_URL=postgresql://user:password@localhost:5432/upskillbay
\`\`\`

### Step 2: Create Database Tables

\`\`\`bash
# Run Prisma migrations
npx prisma migrate dev --name init
\`\`\`

### Step 3: Seed Demo Data (Optional)

\`\`\`bash
# Add demo users, capsules, tasks, and gigs
npm run seed
\`\`\`

### Step 4: Start the App

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000 🎉

---

## 📚 Using the App

### Sign Up
1. Click "Sign Up" on the home page
2. Enter your name, email, and password
3. Automatically redirected to dashboard

### Browse Capsules
1. Go to Dashboard → Capsules
2. Search and filter by level
3. Click "Enroll" to join a capsule

### Submit Tasks
1. Open an enrolled capsule
2. Click on a task
3. Submit your work (text, file, or link)
4. Wait for admin review

### View Your Portfolio
1. Click your name → Portfolio
2. See all your approved submissions
3. Share your portfolio URL with employers

### Apply for Gigs
1. Go to Dashboard → Gigs
2. Browse available opportunities
3. Click "Apply" and write a message
4. Track your applications

### Admin Panel (Login with admin account)
1. Click your name → Admin
2. **Manage Capsules**: Create and organize learning modules
3. **Create Tasks**: Add assignments to capsules
4. **Review Submissions**: Approve or reject user work
5. **Post Gigs**: Create job opportunities

---

## 🔑 Demo Accounts (After Seeding)

**Admin:**
- Email: admin@upskillbay.com
- Password: Admin@123

**Users:**
- user1@example.com / Password@123
- user2@example.com / Password@123
- user3@example.com / Password@123

---

## 💡 Key Features

| Feature | Description |
|---------|-------------|
| 📚 Skill Capsules | Structured learning modules with multiple tasks |
| ✅ Task System | Submit work in text, files, or links |
| 🎯 Portfolio | Auto-generated showcase of completed work |
| 💼 Gig Marketplace | Post and apply for freelance opportunities |
| 👨‍💼 Admin Panel | Full content management system |
| 🔐 Authentication | Secure email/password and Google OAuth |

---

## 🛠️ Common Tasks

### Create a Skill Capsule

1. Sign in as admin
2. Go to Admin → Manage Capsules
3. Fill in the "Create Capsule" form:
   - Title: e.g., "React Fundamentals"
   - Description: Learning objectives
   - Level: beginner/intermediate/advanced
4. Click "Create Capsule"

### Add Tasks to a Capsule

1. Go to Admin → Manage Capsules
2. Click "Edit" on a capsule
3. Scroll to "Add Task" section
4. Fill in:
   - Title: Task name
   - Instructions: What to do
   - Type: text/file/link
5. Click "Add Task"

### Review User Submissions

1. Go to Admin Dashboard
2. See pending submissions count
3. Click on a submission to review
4. Read the user's work
5. Approve or Reject with feedback

### Post a Gig

1. Go to Admin → Manage Gigs
2. Click "Create Gig" form
3. Enter:
   - Title: Job title
   - Description: Job details
   - Budget: Amount in dollars
   - Deadline: Due date
4. Click "Create Gig"

---

## 🔍 Troubleshooting

### Database Connection Error
- Check DATABASE_URL in .env.local
- Ensure PostgreSQL is running
- Verify username and password

### Port 3000 Already in Use
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Prisma Client Not Found
\`\`\`bash
npm run prisma:generate
\`\`\`

### Database Migration Issues
\`\`\`bash
npx prisma migrate resolve --rolled-back <migration_name>
npx prisma migrate dev --name fix
\`\`\`

---

## 📖 File Structure

- **app/** - All pages and API routes
- **components/** - Reusable React components
- **lib/** - Utility functions and services
- **prisma/** - Database schema
- **scripts/** - Utility scripts (seeding)
- **public/** - Static files

---

## 🚢 Deploy to Production

### Option 1: Vercel (Easiest)

1. Push code to GitHub
2. Go to vercel.com
3. Import repository
4. Set environment variables
5. Deploy!

### Option 2: Other Platforms

- Railway.app
- Render.com
- Heroku
- AWS
- DigitalOcean

All support Node.js + PostgreSQL

---

## 📞 Need Help?

1. Check README.md for full documentation
2. Review API endpoint docs
3. Check Prisma schema for data structure
4. Open GitHub issues

---

## ✨ Next Steps

After getting familiar with the app:

1. Customize the theme colors in tailwind.config.ts
2. Add your own logo
3. Modify the home page copy
4. Implement payment (Stripe)
5. Set up email notifications
6. Deploy to production!

Happy coding! 🚀
