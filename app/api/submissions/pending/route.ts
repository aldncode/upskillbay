export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/utils';

// GET pending submissions (admin only)
export async function GET(_: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user as any;

    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Unauthorized', 401);
    }

    const submissions = await prisma.submission.findMany({
      where: { status: 'pending' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        task: {
          include: {
            capsule: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return successResponse(submissions);
  } catch (error) {
    console.error('Error fetching pending submissions:', error);
    return errorResponse('Failed to fetch submissions', 500);
  }
}

