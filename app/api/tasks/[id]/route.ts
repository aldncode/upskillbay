import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// GET task details
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: params.id },
      include: {
        capsule: true,
        submissions: {
          select: {
            id: true,
            status: true,
            userId: true,
          },
        },
      },
    });

    if (!task) {
      return errorResponse('Task not found', 404);
    }

    return successResponse(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    return errorResponse('Failed to fetch task', 500);
  }
}

// PUT update task (admin only)
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
    const { title, instructions, submissionType, order } = body;

    const task = await prisma.task.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(instructions && { instructions }),
        ...(submissionType && { submissionType }),
        ...(order !== undefined && { order }),
      },
    });

    return successResponse(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return errorResponse('Failed to update task', 500);
  }
}

// DELETE task (admin only)
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Unauthorized', 401);
    }

    await prisma.task.delete({
      where: { id: params.id },
    });

    return successResponse({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return errorResponse('Failed to delete task', 500);
  }
}
