import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

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
