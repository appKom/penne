import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { isAdmin } from '@/lib/auth/apiChecks';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const POST = async (request: Request) => {
  try {
    const session = await getServerSession();

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const formData = await request.formData();

    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const gender = formData.get('gender') as string;
    const isCurrent = formData.get('isCurrent') as string;
    const year = formData.get('year') as string;

    const image = formData.get('image') as File | null;

    let imageHref = '';

    if (image && image.size > 0) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const fileName = `${Date.now()}_${name}.jpg`;

      const { data, error } = await supabase.storage
        .from('members')
        .upload(fileName, buffer, {
          contentType: image.type,
        });

      if (error) {
        console.error('Error uploading image:', error.message);
        return NextResponse.json(
          { error: 'Error uploading image' },
          { status: 500 },
        );
      }

      const { data: publicData } = supabase.storage
        .from('members')
        .getPublicUrl(data.path);

      if (!publicData?.publicUrl) {
        return NextResponse.json(
          { error: 'Failed to get image URL' },
          { status: 500 },
        );
      }

      imageHref = publicData.publicUrl;
    } else {
      if (gender === 'Mann') {
        imageHref = '/members/male.jpg';
      } else if (gender === 'Kvinne') {
        imageHref = '/members/female.jpg';
      } else {
        imageHref = '/members/male.jpg';
      }
    }

    const prisma = new PrismaClient();
    const member = await prisma.member.create({
      data: {
        name,
        imageHref,
        role,
        gender,
        isCurrent: isCurrent === 'true',
        year: Number(year),
      },
    });

    return NextResponse.json({ member }, { status: 200 });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const data = await request.json();
    const id = data.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Invalid member ID provided' },
        { status: 400 },
      );
    }

    const prisma = new PrismaClient();
    const member = await prisma.member.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ member }, { status: 200 });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const prisma = new PrismaClient();
    const members = await prisma.member.findMany();

    return NextResponse.json({ members }, { status: 200 });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
