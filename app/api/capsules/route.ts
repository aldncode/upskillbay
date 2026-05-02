import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// GET all capsules or search
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

    const capsules = await prisma.capsule.findMany({
      where,
      include: {
        tasks: true,
        enrollments: {
          select: { userId: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(capsules);
  } catch (error) {
    console.error('Error fetching capsules:', error);
    return errorResponse('Failed to fetch capsules', 500);
  }
}

// POST create capsule (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { title, description, imageUrl, level } = body;

    if (!title || !description) {
      return errorResponse('Missing required fields', 400);
    }

    const capsule = await prisma.capsule.create({
      data: {
        title,
        description,
        imageUrl,
        level: level || 'beginner',
      },
    });

    return successResponse(capsule, 201);
  } catch (error) {
    console.error('Error creating capsule:', error);
    return errorResponse('Failed to create capsule', 500);
  }
}
