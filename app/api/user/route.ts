import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// GET current user profile
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        enrollments: {
          include: {
            capsule: true,
          },
        },
        submissions: {
          where: { status: 'approved' },
        },
        applications: true,
        portfolio: true,
        careerTrackEnrollments: {
          include: {
            careerTrack: true,
          },
        },
      },
    });

    if (!profile) {
      return errorResponse('User not found', 404);
    }

    return successResponse(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return errorResponse('Failed to fetch profile', 500);
  }
}

// PUT update user profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { name, image } = body;

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name && { name }),
        ...(image && { image }),
      },
    });

    return successResponse(updated);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return errorResponse('Failed to update profile', 500);
  }
}
