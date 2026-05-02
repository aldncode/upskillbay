const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.application.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.careerTrackEnrollment.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.gig.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.capsule.deleteMany();
  await prisma.careerTrack.deleteMany();

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@upskillbay.com',
      name: 'Admin User',
      password: await bcrypt.hash('Admin@123', 10),
      role: 'ADMIN',
    },
  });

  // Create portfolio for admin
  await prisma.portfolio.create({
    data: {
      userId: adminUser.id,
      title: 'Admin Portfolio',
    },
  });

  // Create demo users
  const users = [];
  for (let i = 1; i <= 3; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        name: `Demo User ${i}`,
        password: await bcrypt.hash('Password@123', 10),
        role: 'USER',
      },
    });

    // Create portfolio for user
    await prisma.portfolio.create({
      data: {
        userId: user.id,
        title: `${user.name}'s Portfolio`,
        bio: `I'm a passionate learner on UpskillBay, building skills and growing my career.`,
      },
    });

    users.push(user);
  }

  // Create skill capsules
  const capsules = [];

  const capsule1 = await prisma.capsule.create({
    data: {
      title: 'React Fundamentals',
      description:
        'Learn the basics of React including components, props, state, and hooks. Build your first interactive web applications.',
      level: 'beginner',
      status: 'published',
      imageUrl: 'https://via.placeholder.com/400x300?text=React+Fundamentals',
    },
  });
  capsules.push(capsule1);

  const capsule2 = await prisma.capsule.create({
    data: {
      title: 'JavaScript Advanced Patterns',
      description:
        'Master advanced JavaScript concepts like closures, async/await, and design patterns.',
      level: 'intermediate',
      status: 'published',
      imageUrl: 'https://via.placeholder.com/400x300?text=JavaScript+Advanced',
    },
  });
  capsules.push(capsule2);

  const capsule3 = await prisma.capsule.create({
    data: {
      title: 'Full-Stack Web Development',
      description:
        'Build complete web applications with Node.js, Express, and databases. Learn deployment strategies.',
      level: 'advanced',
      status: 'published',
      imageUrl: 'https://via.placeholder.com/400x300?text=Full+Stack',
    },
  });
  capsules.push(capsule3);

  // Create tasks for each capsule
  const tasks = [];

  // Capsule 1 tasks
  const task1 = await prisma.task.create({
    data: {
      capsuleId: capsule1.id,
      title: 'Create Your First React Component',
      instructions: `Create a simple React component that displays "Hello, UpskillBay!" and accepts a name prop.

Requirements:
1. Create a functional component called Greeting
2. Accept a "name" prop
3. Display a personalized greeting message
4. Make it visually appealing with basic styling

Submit your code as a text or link to a GitHub repository.`,
      submissionType: 'link',
      order: 1,
    },
  });
  tasks.push(task1);

  const task2 = await prisma.task.create({
    data: {
      capsuleId: capsule1.id,
      title: 'Build a Todo List App',
      instructions: `Create a simple Todo List application with the following features:

Features:
1. Add new todos
2. Mark todos as complete
3. Delete todos
4. Display completed count

Use React hooks (useState) for state management. Style it nicely with CSS or Tailwind.`,
      submissionType: 'link',
      order: 2,
    },
  });
  tasks.push(task2);

  // Capsule 2 tasks
  const task3 = await prisma.task.create({
    data: {
      capsuleId: capsule2.id,
      title: 'Implement Async/Await Function',
      instructions: `Write an async function that:

1. Fetches data from a public API (e.g., JSONPlaceholder)
2. Processes the data
3. Handles errors gracefully
4. Returns formatted results

Submit your code snippet showing proper async/await usage.`,
      submissionType: 'text',
      order: 1,
    },
  });
  tasks.push(task3);

  // Capsule 3 tasks
  const task4 = await prisma.task.create({
    data: {
      capsuleId: capsule3.id,
      title: 'Deploy Your First Node.js App',
      instructions: `Deploy a simple Node.js Express server that:

1. Has at least 3 API endpoints
2. Includes basic error handling
3. Is deployed to a free platform (Vercel, Heroku, Railway, etc.)

Submit the live URL of your deployed application.`,
      submissionType: 'link',
      order: 1,
    },
  });
  tasks.push(task4);

  // Enroll user in capsules
  await prisma.enrollment.create({
    data: {
      userId: users[0].id,
      capsuleId: capsule1.id,
      status: 'active',
    },
  });

  await prisma.enrollment.create({
    data: {
      userId: users[1].id,
      capsuleId: capsule1.id,
      status: 'completed',
    },
  });

  await prisma.enrollment.create({
    data: {
      userId: users[0].id,
      capsuleId: capsule2.id,
      status: 'active',
    },
  });

  // Create submissions
  const submission1 = await prisma.submission.create({
    data: {
      userId: users[1].id,
      taskId: task1.id,
      content: `import React from 'react';

const Greeting = ({ name }) => {
  return <h1>Hello, {name || 'UpskillBay'}!</h1>;
};

export default Greeting;`,
      status: 'approved',
      feedback: 'Great work! Your component is clean and functional.',
    },
  });

  // Add submission to portfolio
  await prisma.portfolio.update({
    where: { userId: users[1].id },
    data: {
      submissions: { connect: { id: submission1.id } },
    },
  });

  const submission2 = await prisma.submission.create({
    data: {
      userId: users[0].id,
      taskId: task1.id,
      content: 'https://github.com/demo/react-greeting',
      status: 'pending',
    },
  });

  // Create gigs
  const gig1 = await prisma.gig.create({
    data: {
      title: 'Build a Simple Landing Page',
      description:
        'We need a clean, responsive landing page for our startup. Should include hero section, features, testimonials, and CTA.',
      budget: 50000, // $500 in cents
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      status: 'open',
    },
  });

  const gig2 = await prisma.gig.create({
    data: {
      title: 'Create a React Dashboard Component',
      description:
        'Build a reusable dashboard component with charts, statistics, and data tables using React.',
      budget: 75000, // $750 in cents
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: 'open',
    },
  });

  const gig3 = await prisma.gig.create({
    data: {
      title: 'API Integration Project',
      description:
        'Integrate third-party APIs (Stripe, SendGrid, etc.) into an existing Node.js application.',
      budget: 100000, // $1000 in cents
      deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      status: 'open',
    },
  });

  // Create applications
  await prisma.application.create({
    data: {
      userId: users[0].id,
      gigId: gig1.id,
      message: 'I have 2 years of experience building responsive websites. I can deliver quality work on time.',
      status: 'pending',
    },
  });

  await prisma.application.create({
    data: {
      userId: users[1].id,
      gigId: gig2.id,
      message: 'I specialize in React and have built several dashboard components. Check my portfolio for examples.',
      status: 'accepted',
    },
  });

  // Create/Update Career Tracks using upsert to avoid duplicates
  const careerTracksData = [
    {
      title: 'Website Builder',
      description: 'Build simple websites without coding',
      outcome: 'Earn your first ₹5000 in 7 days',
      duration: '7 days',
      earningPotential: '₹5K–₹20K per project',
      skills: ['Web Design', 'No-Code Tools', 'Client Communication'],
      level: 'beginner',
      status: 'published',
    },
    {
      title: 'Instagram Growth',
      description: 'Grow pages and monetize content',
      outcome: 'Reach 10K followers and earn',
      duration: '14 days',
      earningPotential: '₹3K–₹15K/month',
      skills: ['Content Creation', 'Growth Hacking', 'Monetization'],
      level: 'beginner',
      status: 'published',
    },
    {
      title: 'AI Automation',
      description: 'Automate business tasks using AI tools',
      outcome: 'Get clients for automation work',
      duration: '14 days',
      earningPotential: '₹5K–₹30K per client',
      skills: ['AI Tools', 'Automation', 'Client Management'],
      level: 'beginner',
      status: 'published',
    },
    {
      title: 'Salesforce Admin',
      description: 'Manage CRM systems',
      outcome: 'Get Salesforce job',
      duration: '30-45 days',
      earningPotential: '₹20K–₹60K/month',
      skills: ['Salesforce', 'CRM', 'Configuration'],
      level: 'intermediate',
      status: 'published',
    },
    {
      title: 'Data Analyst',
      description: 'Excel + SQL + dashboards',
      outcome: 'Get analyst job',
      duration: '30 days',
      earningPotential: '₹25K–₹80K/month',
      skills: ['Excel', 'SQL', 'Data Visualization', 'Dashboards'],
      level: 'intermediate',
      status: 'published',
    },
    {
      title: 'Digital Marketing',
      description: 'Run ads & grow brands',
      outcome: 'Get freelance clients',
      duration: '14 days',
      earningPotential: '₹10K–₹50K/month',
      skills: ['Google Ads', 'Facebook Ads', 'Social Media', 'Analytics'],
      level: 'beginner',
      status: 'published',
    },
    {
      title: 'UI/UX Designer',
      description: 'Design apps in Figma',
      outcome: 'Get design projects',
      duration: '30 days',
      earningPotential: '₹15K–₹70K/month',
      skills: ['Figma', 'Design', 'Prototyping', 'User Research'],
      level: 'beginner',
      status: 'published',
    },
    {
      title: 'Frontend Developer',
      description: 'React + Next.js',
      outcome: 'Get dev job/freelance',
      duration: '45 days',
      earningPotential: '₹30K–₹1L/month',
      skills: ['React', 'Next.js', 'JavaScript', 'TypeScript'],
      level: 'intermediate',
      status: 'published',
    },
    {
      title: 'AI Content Creator',
      description: 'Create content with AI',
      outcome: 'Monetize content',
      duration: '14 days',
      earningPotential: '₹5K–₹50K/month',
      skills: ['AI Tools', 'Content Writing', 'Social Media'],
      level: 'beginner',
      status: 'published',
    },
    {
      title: 'Automation Specialist',
      description: 'Zapier/Make workflows',
      outcome: 'Get automation clients',
      duration: '14 days',
      earningPotential: '₹10K–₹40K/client',
      skills: ['Zapier', 'Make', 'Automation', 'APIs'],
      level: 'beginner',
      status: 'published',
    },
    {
      title: 'WordPress Developer',
      description: 'Build client websites',
      outcome: 'Freelance projects',
      duration: '10 days',
      earningPotential: '₹5K–₹30K/project',
      skills: ['WordPress', 'PHP', 'Web Development', 'Plugins'],
      level: 'beginner',
      status: 'published',
    },
    {
      title: 'Sales & Closing',
      description: 'Close deals & earn',
      outcome: 'Commission income',
      duration: '7 days',
      earningPotential: '₹10K–₹1L/month',
      skills: ['Sales', 'Negotiation', 'CRM', 'Closing Techniques'],
      level: 'beginner',
      status: 'published',
    },
  ];

  const createdTracks = [];
  for (const trackData of careerTracksData) {
    const track = await prisma.careerTrack.upsert({
      where: { title: trackData.title },
      update: {}, // Don't update if it already exists
      create: trackData,
    });
    createdTracks.push(track);
  }

  // Enroll users in career tracks (only first 3 original tracks)
  const trackIds = createdTracks.slice(0, 3).map((t) => t.id);
  
  // Clear existing enrollments first
  await prisma.careerTrackEnrollment.deleteMany({
    where: {
      userId: { in: users.map((u) => u.id) },
    },
  });

  // Create enrollments
  await prisma.careerTrackEnrollment.create({
    data: {
      userId: users[0].id,
      careerTrackId: trackIds[0],
      status: 'active',
    },
  });

  await prisma.careerTrackEnrollment.create({
    data: {
      userId: users[1].id,
      careerTrackId: trackIds[1],
      status: 'active',
    },
  });

  await prisma.careerTrackEnrollment.create({
    data: {
      userId: users[2].id,
      careerTrackId: trackIds[2],
      status: 'active',
    },
  });

  console.log('✅ Seeding completed successfully!');
  console.log('\n📋 Demo Account:');
  console.log('  Email: admin@upskillbay.com');
  console.log('  Password: Admin@123');
  console.log('\n👤 User Accounts:');
  users.forEach((user, i) => {
    console.log(`  User ${i + 1}: ${user.email} / Password: Password@123`);
  });
}

main()
  .catch((e) => {
    console.error('Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
