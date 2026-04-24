import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// GET pending submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Unauthorized', 401);
    }

    const submissions = await prisma.submission.findMany({
      where: { status: 'pending' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        task: {
          include: {
            capsule: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return successResponse(submissions);
  } catch (error) {
    console.error('Error fetching pending submissions:', error);
    return errorResponse('Failed to fetch submissions', 500);
  }
}

// PUT approve/reject submission (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { status, feedback } = body;

    if (!['approved', 'rejected'].includes(status)) {
      return errorResponse('Invalid status', 400);
    }

    const submission = await prisma.submission.update({
      where: { id: params.id },
      data: {
        status,
        feedback,
      },
    });

    return successResponse(submission);
  } catch (error) {
    console.error('Error reviewing submission:', error);
    return errorResponse('Failed to review submission', 500);
  }
}
