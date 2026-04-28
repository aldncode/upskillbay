import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';
import { calculateProfileCompletion } from '@/lib/profileCompletion';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: {
        user: {
          select: { name: true, email: true, image: true },
        },
      },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Recalculate completion to ensure it's current
    const completion = calculateProfileCompletion(profile);

    return NextResponse.json({
      ...profile,
      profileCompletion: completion,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      interest,
      experienceLevel,
      goal,
      skills,
      toolsKnown,
      availability,
      portfolioLinks,
      pastWorkDescription,
      resumeURL,
      linkedinURL,
      location,
      expectedSalary,
    } = body;

    // Update or create profile
    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        interest: interest || undefined,
        experienceLevel: experienceLevel || undefined,
        goal: goal || undefined,
        skills: skills || undefined,
        toolsKnown: toolsKnown || undefined,
        availability: availability || undefined,
        portfolioLinks: portfolioLinks || undefined,
        pastWorkDescription: pastWorkDescription || undefined,
        resumeURL: resumeURL || undefined,
        linkedinURL: linkedinURL || undefined,
        location: location || undefined,
        expectedSalary: expectedSalary || undefined,
      },
      create: {
        userId: session.user.id,
        interest: interest || null,
        experienceLevel: experienceLevel || null,
        goal: goal || null,
        skills: skills || [],
        toolsKnown: toolsKnown || [],
        availability: availability || null,
        portfolioLinks: portfolioLinks || [],
        pastWorkDescription: pastWorkDescription || null,
        resumeURL: resumeURL || null,
        linkedinURL: linkedinURL || null,
        location: location || null,
        expectedSalary: expectedSalary || null,
      },
    });

    // Calculate completion
    const completion = calculateProfileCompletion(profile);

    return NextResponse.json(
      {
        message: 'Profile updated successfully',
        profile: {
          ...profile,
          profileCompletion: completion,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
