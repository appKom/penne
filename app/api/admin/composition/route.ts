import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { isAdmin } from '@/lib/auth/apiChecks';
import { revalidatePath } from 'next/cache';

export const GET = async () => {
  try {
    const composition = await prisma.composition.findMany();

    return NextResponse.json({ composition }, { status: 200 });
  } catch (error) {
    console.error('Error fetching composition', error);
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

    const company = formData.get('company') as string;
    const category = formData.get('category') as string;
    const percentage = Number(formData.get('percentage'));

    const composition = await prisma.composition.create({
      data: {
        company: company,
        category: category,
        percentage: percentage,
      },
    });

    revalidatePath('/');

    return NextResponse.json({ composition }, { status: 200 });
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
    const company = formData.get('company') as string;
    const category = formData.get('category') as string;
    const percentage = Number(formData.get('percentage'));

    const composition = await prisma.composition.update({
      where: {
        id: Number(id),
      },
      data: {
        company: company,
        category: category,
        percentage: percentage,
      },
    });
    revalidatePath('/');

    return NextResponse.json({ composition }, { status: 200 });
  } catch (error) {
    console.error('Error updating composition:', error);
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
        { error: 'Invalid composition ID provided' },
        { status: 400 },
      );
    }

    const composition = await prisma.composition.delete({
      where: {
        id: Number(id),
      },
    });
    revalidatePath('/');

    return NextResponse.json({ composition }, { status: 200 });
  } catch (error) {
    console.error('Error deleting composition:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
