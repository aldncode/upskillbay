import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session || !session.user) {
    return null;
  }
  return session;
}

export async function requireRole(role: string) {
  const session = await getSession();
  if (!session || !session.user || (session.user as any).role !== role) {
    return null;
  }
  return session;
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export function notFound() {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function internalError() {
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
