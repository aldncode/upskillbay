import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession, requireRole } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// GET all career tracks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const level = searchParams.get('level');

    let where: any = { status: 'published' };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (level) {
      where.level = level;
    }

    const careerTracks = await prisma.careerTrack.findMany({
      where,
      include: {
        enrollments: {
          select: { userId: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(careerTracks);
  } catch (error) {
    console.error('Error fetching career tracks:', error);
    return errorResponse('Failed to fetch career tracks', 500);
  }
}

// POST create career track (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Unauthorized. Admin access required.', 403);
    }

    const body = await request.json();
    const { title, description, outcome, duration, skills, level, earningPotential } = body;

    if (!title || !description || !level) {
      return errorResponse('Missing required fields: title, description, level', 400);
    }

    const careerTrack = await prisma.careerTrack.create({
      data: {
        title,
        description,
        outcome: outcome || 'Not specified',
        duration: duration || 'Not specified',
        skills: skills || [],
        level,
        earningPotential: earningPotential || 'Not specified',
        status: 'published',
      },
    });

    return successResponse(careerTrack, 201);
  } catch (error) {
    console.error('Error creating career track:', error);
    return errorResponse('Failed to create career track', 500);
  }
}
