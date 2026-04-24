# Environment Variables Configuration

## Required Variables

### Database
\`\`\`
DATABASE_URL=postgresql://user:password@localhost:5432/upskillbay
\`\`\`

### Authentication
\`\`\`
NEXTAUTH_SECRET=generate-with: openssl rand -hex 32
NEXTAUTH_URL=http://localhost:3000
\`\`\`

### Google OAuth (Optional)
Get credentials from: https://console.cloud.google.com/

\`\`\`
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
\`\`\`

### File Storage (Optional)
Uploadcare: https://uploadcare.com/

\`\`\`
UPLOADCARE_PUBLIC_KEY=your-public-key
UPLOADCARE_SECRET_KEY=your-secret-key
\`\`\`

### AWS S3 (Optional)
\`\`\`
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
\`\`\`

## Development

Copy `.env.example` to `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Then update with your values.

## Production

Set environment variables in your hosting platform's dashboard (Vercel, Railway, etc.)
