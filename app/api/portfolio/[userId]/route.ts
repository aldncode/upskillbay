import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse } from '@/lib/utils';

// GET portfolio by user ID (public)
export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: params.userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        submissions: {
          where: { status: 'approved' },
          include: {
            task: {
              include: {
                capsule: true,
              },
            },
          },
        },
      },
    });

    if (!portfolio) {
      return errorResponse('Portfolio not found', 404);
    }

    return successResponse(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return errorResponse('Failed to fetch portfolio', 500);
  }
}
