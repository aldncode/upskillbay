import { prisma } from '@/lib/prisma';
import { getZodErrorMessage, signupSchema } from '@/lib/validations/auth';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: getZodErrorMessage(result.error) },
        { status: 400 }
      );
    }

    const { email, password, name } = result.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'USER',
      },
    });

    // Create portfolio for the user
    await prisma.portfolio.create({
      data: {
        userId: user.id,
        title: `${name}'s Portfolio`,
      },
    });

    // Create profile for progressive profile system
    await prisma.profile.create({
      data: {
        userId: user.id,
        profileCompletion: 20, // Basic info complete after signup
      },
    });

    return NextResponse.json(
      { message: 'User created successfully', user: { id: user.id, email: user.email, name: user.name } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
