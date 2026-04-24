import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// POST create task (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { capsuleId, title, instructions, submissionType, order } = body;

    if (!capsuleId || !title || !instructions || !submissionType) {
      return errorResponse('Missing required fields', 400);
    }

    const task = await prisma.task.create({
      data: {
        capsuleId,
        title,
        instructions,
        submissionType,
        order: order || 0,
      },
    });

    return successResponse(task, 201);
  } catch (error) {
    console.error('Error creating task:', error);
    return errorResponse('Failed to create task', 500);
  }
}
