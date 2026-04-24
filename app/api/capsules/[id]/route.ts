import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// GET single capsule
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const capsule = await prisma.capsule.findUnique({
      where: { id: params.id },
      include: {
        tasks: {
          orderBy: { order: 'asc' },
        },
        enrollments: {
          select: { userId: true },
        },
      },
    });

    if (!capsule) {
      return errorResponse('Capsule not found', 404);
    }

    return successResponse(capsule);
  } catch (error) {
    console.error('Error fetching capsule:', error);
    return errorResponse('Failed to fetch capsule', 500);
  }
}

// PUT update capsule (admin only)
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
    const { title, description, imageUrl, level, status } = body;

    const capsule = await prisma.capsule.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(imageUrl && { imageUrl }),
        ...(level && { level }),
        ...(status && { status }),
      },
    });

    return successResponse(capsule);
  } catch (error) {
    console.error('Error updating capsule:', error);
    return errorResponse('Failed to update capsule', 500);
  }
}

// DELETE capsule (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Unauthorized', 401);
    }

    await prisma.capsule.delete({
      where: { id: params.id },
    });

    return successResponse({ message: 'Capsule deleted' });
  } catch (error) {
    console.error('Error deleting capsule:', error);
    return errorResponse('Failed to delete capsule', 500);
  }
}
