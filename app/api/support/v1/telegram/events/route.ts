import { NextRequest, NextResponse } from 'next/server';

import { DeliveryStatus, SocialType, SupportPlan } from '@prisma/client';

import { db } from '@/db';
import { SUPPORT_FREE_LIMIT, SUPPORT_PRO_LIMIT } from '@/lib/constants';
import { formatDataMessage } from '@/lib/services/telegram';
import { bot } from '@/lib/telegram/client';
import { SupportEventsRequestRequest, SupportEventsRequestSchema } from '@/lib/validations/support';

export const POST = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (!authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      {
        message: 'Invalid auth header format. Expected: `Authorization: Bearer [API_KEY]`',
      },
      { status: 401 },
    );
  }
  const apiKey = authHeader.split(' ')[1];
  if (!apiKey || apiKey.trim() === '') {
    return NextResponse.json({ message: 'Invalid API key' }, { status: 401 });
  }
  const support = await db.support.findUnique({
    where: {
      apiKey,
    },
    include: {
      user: true,
      socials: true,
      eventCategories: true,
    },
  });
  if (!support || !support?.socials || support.socials.length === 0) {
    return NextResponse.json({ message: 'Please enter your social ids into your account settings' }, { status: 403 });
  }
  const social = support.socials.find((s) => s.type === SocialType.TELEGRAM);
  if (!social) {
    return NextResponse.json({ message: 'Please authenticate at telegram' }, { status: 403 });
  }
  const currentData = new Date();
  const currentMonth = currentData.getMonth() + 1;
  const currentYear = currentData.getFullYear();
  const limitSupport = await db.limitSupport.findUnique({
    where: {
      supportId: support.id,
      month: currentMonth,
      year: currentYear,
    },
  });
  const limit =
    support.plan === SupportPlan.FREE ? SUPPORT_FREE_LIMIT.maxEventsPerMonth : SUPPORT_PRO_LIMIT.maxEventsPerMonth;
  if (!!limitSupport && limitSupport.count >= limit) {
    return NextResponse.json(
      {
        message: 'Please update your Plan for more events.',
      },
      { status: 429 },
    );
  }
  let requestData: unknown;
  try {
    requestData = await req.json();
  } catch (e) {
    return NextResponse.json(
      {
        message: 'Invalid JSON request body',
      },
      { status: 400 },
    );
  }
  let validationResult: SupportEventsRequestRequest;
  try {
    validationResult = SupportEventsRequestSchema.parse(requestData);
  } catch (e: any) {
    console.log('[ERROR] validation error: ', e.message);
    return NextResponse.json(
      {
        message: "We can't validate POST data. Please check it and try again",
      },
      { status: 422 },
    );
  }
  const category = (support?.eventCategories || []).find((cat) => cat.name === validationResult.category);
  if (!category) {
    return NextResponse.json(
      {
        message: `You don't have a category named "${validationResult.category}"`,
      },
      { status: 404 },
    );
  }
  const eventData = {
    title: `${category.emoji || '🔔'} ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`,
    description: validationResult.description || `A new ${category.name} event has occurred`,
    color: category.color,
    timestamp: new Date().toISOString(),
    fields: Object.entries(validationResult.fields || {}).map(([key, value]) => ({
      name: key,
      value: String(value),
      inline: true,
    })),
  };
  const event = await db.event.create({
    data: {
      supportId: support.id,
      name: category.name,
      message: `${eventData.title}\n\n${eventData.description}`,
      fields: validationResult.fields || {},
      eventCategoryId: category.id,
      data: eventData,
    },
  });
  try {
    await db.event.update({
      where: {
        id: event.id,
      },
      data: {
        status: DeliveryStatus.DELIVERED,
      },
    });
    await db.limitSupport.upsert({
      where: {
        supportId: support.id,
        month: currentMonth,
        year: currentYear,
      },
      update: {
        count: { increment: 1 },
      },
      create: {
        supportId: support.id,
        month: currentMonth,
        year: currentYear,
        count: 1,
      },
    });
  } catch (e: any) {
    console.log("[ERROR]: we can't save event: ", e.message);
    await db.event.update({
      where: {
        id: event.id,
      },
      data: {
        status: DeliveryStatus.FAILD,
      },
    });
    return NextResponse.json(
      {
        message: 'Error processing event',
        eventId: event.id,
      },
      { status: 500 },
    );
  }
  try {
    const message = formatDataMessage({
      ...eventData,
      fields: validationResult.fields || {},
    });
    await bot.sendMessage(social.authKey, message);
  } catch (e: any) {
    console.log("[ERROR]: we can't send events message: ", e.message);
  }
  return NextResponse.json({
    message: 'Event process successfully',
    eventId: event.id,
  });
};
