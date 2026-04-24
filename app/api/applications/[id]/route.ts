import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// PUT update application status (admin only)
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
    const { status } = body;

    if (!['accepted', 'rejected', 'withdrawn'].includes(status)) {
      return errorResponse('Invalid status', 400);
    }

    const application = await prisma.application.update({
      where: { id: params.id },
      data: { status },
    });

    return successResponse(application);
  } catch (error) {
    console.error('Error updating application:', error);
    return errorResponse('Failed to update application', 500);
  }
}
