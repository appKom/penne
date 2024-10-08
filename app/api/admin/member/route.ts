import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { isAdmin } from '@/lib/auth/apiChecks';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const POST = async function (req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user || !isAdmin(session)) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const prisma = new PrismaClient();
    const { name, image, role, gender, isCurrent, year } = await req.json();

    if (!name || !role || !gender || !year) {
      return NextResponse.json(
        { error: 'Invalid member data provided' },
        { status: 400 },
      );
    }

    let imageHref = '';

    if (image) {
      const buffer = Buffer.from(image, 'base64');
      const fileName = `${Date.now()}_${name}.jpg`;

      const { data, error } = await supabase.storage
        .from('members')
        .upload(fileName, buffer, {
          contentType: 'image/jpeg',
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

      if (publicData?.publicUrl) {
        imageHref = publicData.publicUrl;
      } else {
        return NextResponse.json(
          { error: 'Failed to get image URL' },
          { status: 500 },
        );
      }
    }

    const member = await prisma.member.create({
      data: {
        name,
        imageHref:
          imageHref ||
          `/members/${gender === 'Kvinne' ? 'female.jpg' : 'male.jpg'}`,
        role,
        gender,
        isCurrent,
        year,
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

export { POST };
