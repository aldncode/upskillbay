# UpskillBay Architecture Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (Browser)                    │
│  Next.js App Router | React Components | Tailwind CSS           │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP/HTTPS
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER LAYER                          │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │               Authentication Layer                        │  │
│  │  ├─ NextAuth.js (Session Management)                    │  │
│  │  ├─ Email/Password Provider                             │  │
│  │  ├─ Google OAuth Provider                               │  │
│  │  └─ JWT Session Strategy                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 API Routes Layer                          │  │
│  │  ├─ /api/auth/* (NextAuth)                              │  │
│  │  ├─ /api/capsules/* (Capsule CRUD)                      │  │
│  │  ├─ /api/tasks/* (Task CRUD)                            │  │
│  │  ├─ /api/submissions/* (Task Submissions)               │  │
│  │  ├─ /api/gigs/* (Gig CRUD)                              │  │
│  │  ├─ /api/applications/* (Gig Applications)              │  │
│  │  ├─ /api/user/* (User Profile)                          │  │
│  │  └─ /api/portfolio/* (Public Portfolios)                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Business Logic Layer                         │  │
│  │  ├─ Request Validation                                   │  │
│  │  ├─ Authorization Checks                                 │  │
│  │  ├─ Data Transformation                                  │  │
│  │  └─ Error Handling                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            Prisma ORM Layer                               │  │
│  │  ├─ Type-safe query builder                             │  │
│  │  ├─ Connection pooling                                   │  │
│  │  ├─ Migration management                                 │  │
│  │  └─ Data validation                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ SQL Queries
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                              │
│                                                                   │
│  PostgreSQL (Relational Database)                               │
│  ├─ Users & Accounts                                            │
│  ├─ Capsules & Tasks                                            │
│  ├─ Enrollments & Submissions                                   │
│  ├─ Portfolios                                                  │
│  └─ Gigs & Applications                                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow Examples

### User Authentication Flow

```
User Input (Email/Password)
        ↓
NextAuth Provider
        ↓
bcryptjs - Hash Validation
        ↓
Prisma - Find User
        ↓
PostgreSQL Query
        ↓
JWT Token Generation
        ↓
HTTP-Only Cookie Set
        ↓
Session Created
        ↓
Redirect to Dashboard
```

### Task Submission Flow

```
User Submits Task
        ↓
POST /api/submissions
        ↓
Check Auth (JWT)
        ↓
Validate Input
        ↓
Prisma - Create Submission
        ↓
PostgreSQL INSERT
        ↓
Return Submission Object
        ↓
Frontend Updates UI
        ↓
Toast Notification
```

### Admin Review Flow

```
Admin Accesses /admin/submissions/{id}
        ↓
Check Role (Admin Only)
        ↓
GET /api/submissions/{id}
        ↓
Prisma - Fetch Submission with Relations
        ↓
Display in UI
        ↓
Admin Reviews & Provides Feedback
        ↓
PUT /api/submissions/{id}
        ↓
Update Status & Feedback
        ↓
Prisma - Update Record
        ↓
PostgreSQL UPDATE
        ↓
Return Updated Submission
```

---

## 🔐 Security Layers

```
┌─────────────────────────────────────┐
│      1. Transport Layer             │
│  ✓ HTTPS/TLS Encryption            │
│  ✓ Secure Cookies (HTTP-only)      │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│      2. Authentication Layer        │
│  ✓ NextAuth Session Validation     │
│  ✓ JWT Token Verification          │
│  ✓ CSRF Protection                 │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│      3. Authorization Layer         │
│  ✓ Role-Based Access Control       │
│  ✓ Resource Ownership Checks       │
│  ✓ Admin-Only Endpoints            │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│      4. Data Layer                  │
│  ✓ SQL Injection Prevention         │
│  ✓ Input Validation                 │
│  ✓ Parameter Sanitization          │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│      5. Password Security           │
│  ✓ bcryptjs Hashing (10 salt rounds)│
│  ✓ Never Store Plaintext           │
│  ✓ Secure Comparison               │
└─────────────────────────────────────┘
```

---

## 📦 Component Architecture

### Pages Hierarchy

```
ROOT (/)
├── PUBLIC PAGES
│   ├── / (Home)
│   ├── /auth/login
│   └── /auth/signup
│
├── PROTECTED PAGES
│   └── (dashboard)
│       ├── /dashboard
│       ├── /capsules
│       ├── /tasks/{id}
│       ├── /gigs
│       └── /portfolio/{userId}
│
└── ADMIN PAGES
    └── /admin
        ├── /admin/capsules
        ├── /admin/tasks
        ├── /admin/gigs
        └── /admin/submissions/{id}
```

### Component Reuse

```
Navbar
├── Navigation Links (role-based)
├── User Menu
└── Auth Status

Card
├── Dashboard Stats
├── Capsule Lists
├── Gig Cards
└── Submission Items

Forms
├── Login/Signup
├── Task Submission
├── Gig Application
└── Admin Creation Forms

Badges
├── Status (approved/pending/rejected)
├── Level (beginner/intermediate/advanced)
└── Role Indicators
```

---

## 🗄️ Data Model Relationships

### User-Centric View

```
User
├── Accounts (OAuth providers)
├── Sessions (Active sessions)
├── Enrollments
│   └── Capsules
│       └── Tasks
│           ├── Submissions
│           │   └── Portfolio
│           └── Reviews
├── Applications
│   └── Gigs
└── Portfolio
    └── Submissions (Approved only)
```

### Capsule-Centric View

```
Capsule
├── Tasks (Ordered)
│   ├── Submissions
│   │   └── User (Feedback)
│   └── Reviews (Admin)
└── Enrollments
    └── Users (Status tracking)
```

---

## 📈 Scaling Architecture

### Current Setup
```
Single Server + Single Database
├── All logic: Next.js
├── All data: PostgreSQL
└── Limited to ~1000 concurrent users
```

### Phase 2 - Optimized
```
├── Frontend: Vercel Edge Network
├── Backend: Multiple serverless instances
├── Database: PostgreSQL with replicas
├── Cache: Redis layer
└── Storage: CDN for assets
```

### Phase 3 - Enterprise
```
├── Load Balancer
├── API Gateway
├── Microservices
│   ├── Auth Service
│   ├── Content Service
│   ├── User Service
│   └── Notification Service
├── Database Cluster
│   ├── Primary (Write)
│   ├── Replicas (Read)
│   └── Backup instances
├── Cache Layer (Redis Cluster)
├── Message Queue (RabbitMQ)
├── Search (Elasticsearch)
└── CDN + Cloud Storage
```

---

## 🔌 API Layer Design

### RESTful Conventions

```
GET     /api/resource          → List all
POST    /api/resource          → Create
GET     /api/resource/{id}     → Read
PUT     /api/resource/{id}     → Update
DELETE  /api/resource/{id}     → Delete
POST    /api/resource/{id}/action → Custom action
```

### Response Format

```javascript
{
  // Success (200-201)
  {
    id: "...",
    title: "...",
    ...data
  }

  // Error (4xx-5xx)
  {
    error: "Description of what went wrong"
  }
}
```

### Status Codes Used

- `200` - OK (GET, PUT, DELETE success)
- `201` - Created (POST success)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (not authorized)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error

---

## 🔄 Deployment Architecture

### Development
```
Local Machine
├── npm run dev
├── Next.js Dev Server
├── Local PostgreSQL
└── Hot Module Reloading
```

### Production
```
Vercel (or similar)
├── Edge Functions (API routes)
├── Automatic Deployments (GitHub)
├── Global CDN
├── Automatic HTTPS
└── Serverless Database (Vercel Postgres)
    or
    Managed Database (Railway, AWS RDS)
```

---

## 🎯 Key Design Patterns

### 1. **Role-Based Access Control (RBAC)**
```
Request → Check Session → Get User Role → 
  Verify Permission → Execute Action
```

### 2. **Middleware Pattern**
```
Input Validation → Authorization → 
  Business Logic → Response
```

### 3. **Repository Pattern**
```
Client Code → API Routes → Prisma Client → 
  Database → Raw Data → Transformation → Response
```

### 4. **Single Responsibility**
```
API Routes: HTTP handling
Lib functions: Business logic reuse
Prisma: Data access only
Components: UI rendering only
```

### 5. **Error Handling**
```
Try-Catch → Validate → Log → Return Standard Error Response
```

---

## 📊 Database Indexing Strategy

```
CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_user_role ON "User"(role);
CREATE INDEX idx_capsule_status ON "Capsule"(status);
CREATE INDEX idx_submission_status ON "Submission"(status);
CREATE INDEX idx_submission_userId_taskId ON "Submission"(userId, taskId);
CREATE INDEX idx_enrollment_userId_capsuleId ON "Enrollment"(userId, capsuleId);
CREATE INDEX idx_application_userId_gigId ON "Application"(userId, gigId);
```

---

## 🚀 Performance Optimization Strategy

### Frontend
- Image optimization (Next.js Image)
- Code splitting
- CSS optimization
- Minification

### Backend
- Database query optimization
- Connection pooling
- Caching layer (Redis)
- API response compression

### Database
- Proper indexing
- Query analysis
- Connection pooling
- Replication for reads

---

## 📱 Responsive Design Breakpoints

```
Mobile:  < 768px   (Tailwind's default)
Tablet:  768px-1024px
Desktop: > 1024px

Utilities used: md:, lg:, xl:
```

---

This architecture is designed to be:
✅ **Scalable** - Can grow from MVP to enterprise
✅ **Maintainable** - Clear separation of concerns
✅ **Secure** - Multiple security layers
✅ **Performant** - Optimized for speed
✅ **Flexible** - Easy to modify and extend
