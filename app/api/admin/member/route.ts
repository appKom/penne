import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { isAdmin } from '@/lib/auth/apiChecks';

const POST = async function (req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const prisma = new PrismaClient();
    const { name, imageHref, role, gender, isCurrent, year } = await req.json();

    if (!name || !imageHref || !role || !gender || !isCurrent) {
      return NextResponse.json(
        { error: 'No article provided or file is not valid' },
        { status: 400 },
      );
    }

    const member = await prisma.member.create({
      data: {
        name,
        imageHref,
        role,
        gender,
        isCurrent,
        year,
      },
    });

    return NextResponse.json({ member }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};

export { POST };
