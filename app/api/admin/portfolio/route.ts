import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { isAdmin } from '@/lib/auth/apiChecks';

export const GET = async () => {
  try {
    const performance = await prisma.performance.findMany();

    return NextResponse.json({ performance }, { status: 200 });
  } catch (error) {
    console.error('Error fetching performance', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const session = await getServerSession();

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const formData = await request.formData();

    const date = formData.get('date') as string;
    const value = Number(formData.get('value'));

    const performance = await prisma.performance.create({
      data: {
        date: date,
        value: value,
      },
    });

    return NextResponse.json({ performance }, { status: 200 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};

export const PUT = async (request: Request) => {
  try {
    const session = await getServerSession();

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const formData = await request.formData();

    const id = formData.get('id') as string;
    const date = formData.get('date') as string;
    const value = Number(formData.get('value'));

    const performance = await prisma.performance.update({
      where: {
        id: Number(id),
      },
      data: {
        date: date,
        value: value,
      },
    });

    return NextResponse.json({ performance }, { status: 200 });
  } catch (error) {
    console.error('Error updating performance:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const session = await getServerSession();

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const data = await request.json();
    const id = data.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Invalid performance ID provided' },
        { status: 400 },
      );
    }

    const performance = await prisma.performance.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ performance }, { status: 200 });
  } catch (error) {
    console.error('Error deleting performance:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
