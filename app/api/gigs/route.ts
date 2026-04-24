import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// GET all gigs
export async function GET(request: NextRequest) {
  try {
    const gigs = await prisma.gig.findMany({
      where: { status: 'open' },
      include: {
        applications: {
          select: { userId: true, status: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(gigs);
  } catch (error) {
    console.error('Error fetching gigs:', error);
    return errorResponse('Failed to fetch gigs', 500);
  }
}

// POST create gig (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { title, description, budget, deadline } = body;

    if (!title || !description || !budget || !deadline) {
      return errorResponse('Missing required fields', 400);
    }

    const gig = await prisma.gig.create({
      data: {
        title,
        description,
        budget: Math.floor(budget * 100), // Store as cents
        deadline: new Date(deadline),
      },
    });

    return successResponse(gig, 201);
  } catch (error) {
    console.error('Error creating gig:', error);
    return errorResponse('Failed to create gig', 500);
  }
}
