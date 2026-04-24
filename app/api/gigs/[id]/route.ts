import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// GET single gig
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gig = await prisma.gig.findUnique({
      where: { id: params.id },
      include: {
        applications: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!gig) {
      return errorResponse('Gig not found', 404);
    }

    return successResponse(gig);
  } catch (error) {
    console.error('Error fetching gig:', error);
    return errorResponse('Failed to fetch gig', 500);
  }
}

// PUT update gig (admin only)
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
    const { title, description, budget, deadline, status } = body;

    const gig = await prisma.gig.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(budget && { budget: Math.floor(budget * 100) }),
        ...(deadline && { deadline: new Date(deadline) }),
        ...(status && { status }),
      },
    });

    return successResponse(gig);
  } catch (error) {
    console.error('Error updating gig:', error);
    return errorResponse('Failed to update gig', 500);
  }
}

// DELETE gig (admin only)
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

    await prisma.gig.delete({
      where: { id: params.id },
    });

    return successResponse({ message: 'Gig deleted' });
  } catch (error) {
    console.error('Error deleting gig:', error);
    return errorResponse('Failed to delete gig', 500);
  }
}
