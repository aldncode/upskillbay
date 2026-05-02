import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// POST enroll in capsule
export async function POST(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_capsuleId: {
          userId: user.id,
          capsuleId: params.id,
        },
      },
    });

    if (existing) {
      return errorResponse('Already enrolled in this capsule', 400);
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        capsuleId: params.id,
      },
    });

    return successResponse(enrollment, 201);
  } catch (error) {
    console.error('Error enrolling in capsule:', error);
    return errorResponse('Failed to enroll', 500);
  }
}
