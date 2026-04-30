import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession, requireAuth } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// POST create application for track/project
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || !user.id) {
      return errorResponse('Unauthorized. Please sign in.', 401);
    }

    const body = await request.json();
    const { type, targetId, name, email, phone, experience, motivation, agreedToTerms } = body;

    // Validate required fields
    if (!type || !targetId || !name || !email || !phone || !experience || !motivation) {
      return errorResponse('Missing required fields', 400);
    }

    if (type !== 'track' && type !== 'project') {
      return errorResponse('Invalid type. Must be "track" or "project"', 400);
    }

    if (!agreedToTerms) {
      return errorResponse('You must agree to the terms', 400);
    }

    // Validate targetId is not empty
    if (typeof targetId !== 'string' || targetId.trim() === '') {
      return errorResponse('Invalid target ID', 400);
    }

    // Verify track/project exists
    if (type === 'track') {
      const track = await prisma.careerTrack.findUnique({
        where: { id: targetId },
      });
      if (!track) {
        return errorResponse('Career track not found', 404);
      }
    } else if (type === 'project') {
      const project = await prisma.gig.findUnique({
        where: { id: targetId },
      });
      if (!project) {
        return errorResponse('Project not found', 404);
      }
    }

    // Check if user already applied
    const existingApplication = await prisma.trackApplication.findUnique({
      where: {
        userId_type_targetId: {
          userId: user.id,
          type,
          targetId,
        },
      },
    });

    if (existingApplication) {
      return errorResponse('You have already applied to this ' + type, 409);
    }

    // Create application
    const application = await prisma.trackApplication.create({
      data: {
        userId: user.id,
        type,
        targetId,
        name,
        email,
        phone,
        experience,
        motivation,
        agreedToTerms: true,
        status: 'pending',
      },
    });

    return successResponse({
      message: 'Application submitted successfully',
      application,
    }, 201);
  } catch (error) {
    console.error('Error creating application:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return errorResponse('Failed to submit application', 500);
  }
}

// GET all applications for current user
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || !user.id) {
      return errorResponse('Unauthorized. Please sign in.', 401);
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');

    let where: any = { userId: user.id };

    if (type && (type === 'track' || type === 'project')) {
      where.type = type;
    }

    const applications = await prisma.trackApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return errorResponse('Failed to fetch applications', 500);
  }
}
