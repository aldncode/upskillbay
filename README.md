# UpskillBay - Production-Ready MVP

A work-integrated career platform where users complete tasks, build proof (portfolio), earn from gigs, and get hired.

## 🚀 Features

### Core Features Implemented

1. **Authentication**
   - Email/password signup and login
   - Google OAuth integration (requires credentials)
   - NextAuth.js for session management
   - Role-based access control (USER, ADMIN, COMPANY)

2. **User Dashboard**
   - Personal dashboard with progress overview
   - View enrolled capsules
   - Track completed and pending tasks
   - Quick actions and navigation

3. **Skill Capsules**
   - Browse and search capsules by level (beginner, intermediate, advanced)
   - Enroll in capsules
   - View capsule details and tasks

4. **Task System**
   - Submit tasks with different types (text, file, link)
   - Automatic status tracking (pending, approved, rejected)
   - Task resubmission capability

5. **Proof Engine (Portfolio)**
   - Auto-generated portfolio from approved submissions
   - Public portfolio pages for each user
   - Showcase completed work and case studies

6. **Gig Marketplace**
   - Browse available gigs
   - Submit applications with custom messages
   - Track application status

7. **Admin Panel**
   - Create and manage skill capsules
   - Create and manage tasks
   - Review and approve/reject submissions
   - Create and manage gigs
   - View all pending submissions

8. **UI/UX**
   - Clean, modern design with Tailwind CSS
   - Fully responsive (mobile, tablet, desktop)
   - Dashboard-style layout
   - Toast notifications for user feedback

## 📋 Tech Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Backend**: Next.js API Routes (Node.js)
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with custom components
- **Notifications**: React Hot Toast
- **Validation**: Zod (prepared for future use)

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Git

### 1. Clone & Install Dependencies

\`\`\`bash
cd upskillbay-app
npm install
\`\`\`

### 2. Database Setup

Create a PostgreSQL database and update `.env.local`:

\`\`\`bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your database URL
DATABASE_URL="postgresql://user:password@localhost:5432/upskillbay"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### 3. Prisma Setup

Initialize Prisma and create database tables:

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

### 4. Seed Database (Optional)

Populate with demo data:

\`\`\`bash
npm run seed
\`\`\`

### 5. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000

## 🔑 Demo Accounts

After seeding:

**Admin Account:**
- Email: `admin@upskillbay.com`
- Password: `Admin@123`

**User Accounts:**
- Email: `user1@example.com` / Password: `Password@123`
- Email: `user2@example.com` / Password: `Password@123`
- Email: `user3@example.com` / Password: `Password@123`

## 📁 Project Structure

\`\`\`
upskillbay-app/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication
│   │   ├── capsules/          # Capsule CRUD
│   │   ├── tasks/             # Task CRUD
│   │   ├── submissions/        # Task submissions
│   │   ├── gigs/              # Gig CRUD
│   │   ├── applications/      # Gig applications
│   │   ├── user/              # User profile
│   │   └── portfolio/         # Public portfolios
│   ├── (dashboard)/           # Protected dashboard routes
│   │   ├── dashboard/         # Main dashboard
│   │   ├── capsules/          # Capsules list & detail
│   │   ├── tasks/             # Task submission
│   │   ├── gigs/              # Gig marketplace
│   │   └── portfolio/         # Public portfolios
│   ├── admin/                 # Admin panel
│   │   ├── capsules/          # Manage capsules
│   │   ├── tasks/             # Manage tasks
│   │   ├── gigs/              # Manage gigs
│   │   └── submissions/       # Review submissions
│   ├── auth/                  # Auth pages
│   │   ├── login/
│   │   └── signup/
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   └── Navbar.tsx             # Navigation bar
├── lib/
│   ├── prisma.ts              # Prisma client
│   ├── auth.ts                # Auth utilities
│   └── utils.ts               # Common utilities
├── prisma/
│   └── schema.prisma          # Database schema
├── scripts/
│   └── seed.js                # Database seeding
├── public/                    # Static assets
├── .env.example               # Environment template
├── next.config.js             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── postcss.config.js          # PostCSS config
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
\`\`\`

## 📊 Database Schema

### Models

- **User**: User account and profile
- **Account**: OAuth provider accounts
- **Session**: NextAuth sessions
- **Capsule**: Skill learning modules
- **Task**: Individual tasks within capsules
- **Enrollment**: User-capsule relationships
- **Submission**: Task submissions with approval workflow
- **Portfolio**: User portfolio showcase
- **Gig**: Job opportunities
- **Application**: Gig applications from users

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth handlers (login, logout, etc.)

### Capsules
- `GET /api/capsules` - List all capsules
- `POST /api/capsules` - Create capsule (admin)
- `GET /api/capsules/{id}` - Get capsule details
- `PUT /api/capsules/{id}` - Update capsule (admin)
- `DELETE /api/capsules/{id}` - Delete capsule (admin)
- `POST /api/capsules/{id}/enroll` - Enroll in capsule

### Tasks
- `POST /api/tasks` - Create task (admin)
- `GET /api/tasks/{id}` - Get task details
- `PUT /api/tasks/{id}` - Update task (admin)
- `DELETE /api/tasks/{id}` - Delete task (admin)

### Submissions
- `POST /api/submissions` - Submit task
- `GET /api/submissions` - Get user submissions
- `GET /api/submissions/pending` - Get pending submissions (admin)
- `PUT /api/submissions/{id}` - Review submission (admin)

### Gigs
- `GET /api/gigs` - List all gigs
- `POST /api/gigs` - Create gig (admin)
- `GET /api/gigs/{id}` - Get gig details
- `PUT /api/gigs/{id}` - Update gig (admin)
- `DELETE /api/gigs/{id}` - Delete gig (admin)

### Applications
- `POST /api/applications` - Apply for gig
- `GET /api/applications` - Get user applications
- `PUT /api/applications/{id}` - Update application status (admin)

### User & Portfolio
- `GET /api/user` - Get user profile
- `PUT /api/user` - Update user profile
- `GET /api/portfolio/{userId}` - Get public portfolio

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

\`\`\`bash
# Environment variables needed in Vercel:
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL=https://your-domain.com
GOOGLE_CLIENT_ID (optional)
GOOGLE_CLIENT_SECRET (optional)
\`\`\`

### Other Platforms

Supports any Node.js hosting (Railway, Render, Heroku, AWS, etc.)

## 📝 Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
npm run seed        # Seed database with demo data
\`\`\`

## 🔐 Security Considerations

- Passwords hashed with bcryptjs
- NextAuth.js handles session security
- API routes protected with auth middleware
- Role-based access control (RBAC)
- Environment variables for sensitive data
- CSRF protection via NextAuth
- SQL injection protection via Prisma ORM

## 🎯 Future Enhancements

- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] User messaging system
- [ ] Progress tracking dashboard
- [ ] Badge/achievement system
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Video content support
- [ ] Code evaluation system
- [ ] Live mentoring/office hours
- [ ] Community forum

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 📞 Support

For issues and questions, please open a GitHub issue.

---

Built with ❤️ by UpskillBay Team
