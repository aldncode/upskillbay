import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// GET submission details (admin only)
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Unauthorized', 401);
    }

    const submission = await prisma.submission.findUnique({
      where: { id: params.id },
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
    });

    if (!submission) {
      return errorResponse('Submission not found', 404);
    }

    return successResponse(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    return errorResponse('Failed to fetch submission', 500);
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

    const existingSubmission = await prisma.submission.findUnique({
      where: { id: params.id },
      select: { userId: true },
    });

    if (!existingSubmission) {
      return errorResponse('Submission not found', 404);
    }

    const portfolio = await prisma.portfolio.upsert({
      where: { userId: existingSubmission.userId },
      update: {},
      create: {
        userId: existingSubmission.userId,
        title: 'My Portfolio',
      },
    });

    const submission = await prisma.submission.update({
      where: { id: params.id },
      data: {
        status,
        feedback,
        portfolioId: status === 'approved' ? portfolio.id : null,
      },
    });

    return successResponse(submission);
  } catch (error) {
    console.error('Error reviewing submission:', error);
    return errorResponse('Failed to review submission', 500);
  }
}
