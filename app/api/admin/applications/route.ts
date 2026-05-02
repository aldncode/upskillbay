import { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse } from '@/lib/utils';

// GET all applications (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Unauthorized. Admin access required.', 403);
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    let where: any = {};

    if (type && (type === 'track' || type === 'project')) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    const applications = await prisma.trackApplication.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return errorResponse('Failed to fetch applications', 500);
  }
}

// UPDATE application status (admin only)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Unauthorized. Admin access required.', 403);
    }

    const body = await request.json();
    const { applicationId, status } = body;

    if (!applicationId || !status) {
      return errorResponse('Missing required fields', 400);
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return errorResponse('Invalid status', 400);
    }

    const application = await prisma.trackApplication.update({
      where: { id: applicationId },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return successResponse({
      message: `Application ${status}`,
      application,
    });
  } catch (error) {
    console.error('Error updating application:', error);
    return errorResponse('Failed to update application', 500);
  }
}
