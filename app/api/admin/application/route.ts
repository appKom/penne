import { isAdmin } from '@/lib/auth/apiChecks';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { sanitizeFileName } from '../member/route';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const GET = async () => {
  try {
    const applications = await prisma.application.findMany();

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error('Error fetching members:', error);
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

    const purpose = formData.get('purpose') as string;
    const grantedAmount = Number(formData.get('grantedAmount'));
    const amountApplied = Number(formData.get('amountApplied'));
    const recipient = formData.get('recipient') as string;
    const dateApplied = new Date(formData.get('dateApplied') as string);
    const dateGranted = new Date(formData.get('dateGranted') as string);

    const attachment = formData.get('attachment') as File | null;

    let attachmentHref = '';

    if (attachment && attachment.size > 0) {
      const arrayBuffer = await attachment.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const fileName = `${Date.now()}_${sanitizeFileName(purpose)}.${attachment.type.split('/')[1]}`;

      const { data, error } = await supabase.storage
        .from('application')
        .upload(fileName, buffer, {
          contentType: attachment.type,
        });

      if (error) {
        console.error('Error uploading attachment:', error.message);
        return NextResponse.json(
          { error: 'Error uploading attachment' },
          { status: 500 },
        );
      }

      const { data: publicData } = supabase.storage
        .from('application')
        .getPublicUrl(data.path);

      if (!publicData?.publicUrl) {
        return NextResponse.json(
          { error: 'Failed to get image URL' },
          { status: 500 },
        );
      }

      attachmentHref = publicData.publicUrl;
    } else {
      attachmentHref = '';
    }

    const application = await prisma.application.create({
      data: {
        purpose,
        grantedAmount,
        amountApplied,
        recipient,
        dateApplied,
        dateGranted,
        attachment: attachmentHref,
      },
    });

    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error('Error creating application:', error);
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
        { error: 'Invalid application ID provided' },
        { status: 400 },
      );
    }

    const application = await prisma.application.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error('Error deleting member:', error);
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
    const purpose = formData.get('purpose') as string;
    const grantedAmount = Number(formData.get('grantedAmount'));
    const amountApplied = Number(formData.get('amountApplied'));
    const recipient = formData.get('recipient') as string;
    const dateApplied = new Date(formData.get('dateApplied') as string);
    const dateGranted = new Date(formData.get('dateGranted') as string);
    const attachment = formData.get('attachment') as File | null;

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required for updating' },
        { status: 400 },
      );
    }

    console.log(attachment);

    let attachmentHref = '';

    if (attachment && attachment.size > 0) {
      const arrayBuffer = await attachment.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const fileName = `${Date.now()}_${sanitizeFileName(purpose)}.${attachment.type.split('/')[1]}`;

      const { data, error } = await supabase.storage
        .from('application')
        .upload(fileName, buffer, {
          contentType: attachment.type,
        });

      if (error) {
        console.error('Error uploading file:', error.message);
        return NextResponse.json(
          { error: 'Error uploading file' },
          { status: 500 },
        );
      }

      const { data: publicData } = supabase.storage
        .from('application')
        .getPublicUrl(data.path);

      if (!publicData?.publicUrl) {
        return NextResponse.json(
          { error: 'Failed to get attachment URL' },
          { status: 500 },
        );
      }

      attachmentHref = publicData.publicUrl;
    }

    interface UpdateData {
      purpose: string;
      grantedAmount: number;
      amountApplied: number;
      recipient: string;
      dateApplied: Date;
      dateGranted: Date;
      attachment?: string;
    }

    const updateData: UpdateData = {
      purpose,
      grantedAmount,
      amountApplied,
      recipient,
      dateApplied,
      dateGranted,
    };

    if (attachment) {
      updateData.attachment = attachmentHref;
    } else {
      updateData.attachment = '';
    }

    const application = await prisma.application.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
