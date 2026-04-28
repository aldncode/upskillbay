import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const careerTrackId = params.id;

    // Check if career track exists
    const careerTrack = await prisma.careerTrack.findUnique({
      where: { id: careerTrackId },
    });

    if (!careerTrack) {
      return errorResponse('Career track not found', 404);
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
      return errorResponse('Already enrolled in this career track', 400);
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
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return successResponse(
      {
        message: 'Successfully enrolled in career track',
        enrollment,
      },
      201
    );
  } catch (error) {
    console.error('Error enrolling in career track:', error);
    return errorResponse('Failed to enroll in career track', 500);
  }
}
