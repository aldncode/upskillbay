import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// POST submit task
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { taskId, content, fileUrl } = body;

    if (!taskId || !content) {
      return errorResponse('Missing required fields', 400);
    }

    // Check if already submitted
    const existing = await prisma.submission.findUnique({
      where: {
        userId_taskId: {
          userId: user.id,
          taskId,
        },
      },
    });

    if (existing) {
      // Update existing submission
      const updated = await prisma.submission.update({
        where: {
          userId_taskId: {
            userId: user.id,
            taskId,
          },
        },
        data: {
          content,
          fileUrl,
          status: 'pending', // Reset to pending on resubmission
        },
      });
      return successResponse(updated);
    }

    const submission = await prisma.submission.create({
      data: {
        userId: user.id,
        taskId,
        content,
        fileUrl,
      },
    });

    return successResponse(submission, 201);
  } catch (error) {
    console.error('Error submitting task:', error);
    return errorResponse('Failed to submit task', 500);
  }
}

// GET user submissions
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const submissions = await prisma.submission.findMany({
      where: { userId: user.id },
      include: {
        task: {
          include: {
            capsule: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return errorResponse('Failed to fetch submissions', 500);
  }
}
