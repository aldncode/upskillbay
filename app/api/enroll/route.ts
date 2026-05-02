import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { careerTrackId } = await req.json();

    if (!careerTrackId) {
      return NextResponse.json({ error: 'careerTrackId is required' }, { status: 400 });
    }

    // Check if career track exists
    const careerTrack = await prisma.careerTrack.findUnique({
      where: { id: careerTrackId },
    });

    if (!careerTrack) {
      return NextResponse.json({ error: 'Career track not found' }, { status: 404 });
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.careerTrackEnrollment.findUnique({
      where: {
        userId_careerTrackId: {
          userId: user.id,
          careerTrackId,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { message: 'Already enrolled in this track', enrollment: existingEnrollment },
        { status: 200 }
      );
    }

    // Create enrollment
    const enrollment = await prisma.careerTrackEnrollment.create({
      data: {
        userId: user.id,
        careerTrackId,
        status: 'active',
      },
      include: {
        careerTrack: true,
      },
    });

    console.log('Enrollment created:', enrollment);

    return NextResponse.json(
      { message: 'Successfully enrolled', enrollment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating enrollment:', error);
    return NextResponse.json({ error: 'Failed to enroll' }, { status: 500 });
  }
}
