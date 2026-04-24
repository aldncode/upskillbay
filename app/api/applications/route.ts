import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// POST apply for gig
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { gigId, message } = body;

    if (!gigId || !message) {
      return errorResponse('Missing required fields', 400);
    }

    // Check if already applied
    const existing = await prisma.application.findUnique({
      where: {
        userId_gigId: {
          userId: user.id,
          gigId,
        },
      },
    });

    if (existing) {
      return errorResponse('Already applied for this gig', 400);
    }

    const application = await prisma.application.create({
      data: {
        userId: user.id,
        gigId,
        message,
      },
    });

    return successResponse(application, 201);
  } catch (error) {
    console.error('Error applying for gig:', error);
    return errorResponse('Failed to apply for gig', 500);
  }
}

// GET user applications
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const applications = await prisma.application.findMany({
      where: { userId: user.id },
      include: {
        gig: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return errorResponse('Failed to fetch applications', 500);
  }
}
