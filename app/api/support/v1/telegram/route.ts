import { NextRequest, NextResponse } from "next/server";
import { handleFailedAttempt, isBlocked } from "@/actions/telegramUser";
import { db } from "@/db";
import { SocialType } from "@prisma/client";
import { bot } from "@/lib/telegram/client";
import { TELEGRAM_AUTH, TELEGRAM_COMMANDS } from "@/lib/constants";

type CommandHandler = (chatId: number, args: string[]) => Promise<void>;

const sendTelegramMessage = async (chatId: number, text: string) => {
  try {
    await bot.sendMessage(chatId, text);
  } catch (error) {
    console.error(`Failed to send message to chatId ${chatId}:`, error);
  }
};

const handleAuthCommand: CommandHandler = async (chatId, args) => {
  const apiKey = args[0];
  if (!apiKey) {
    sendTelegramMessage(chatId, TELEGRAM_COMMANDS[TELEGRAM_AUTH]);
    return;
  }
  const support = await db.support.findFirst({
    where: { apiKey },
  });
  let message: string;
  if (support) {
    await db.social.create({
      data: {
        type: SocialType.TELEGRAM,
        supportId: support.id,
        authKey: String(chatId),
      },
    });
    message = "You were authenticated!";
  } else {
    message = "Invalid support API token.";
  }
  sendTelegramMessage(chatId, message);
};

const COMMAND_HANDLERS: Record<string, CommandHandler> = {
  [TELEGRAM_AUTH]: handleAuthCommand,
};

const handler = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const message = body?.message;
    const chatId = message?.chat?.id;
    const text = message?.text;

    if (!text || !chatId) {
      return NextResponse.json({ success: false });
    }

    const social = await db.social.findUnique({
      where: {
        authKey_type: { authKey: String(chatId), type: SocialType.TELEGRAM },
      },
    });

    if (!!social) {
      return NextResponse.json({ success: true });
    }
    if (await isBlocked(chatId)) {
      await sendTelegramMessage(
        chatId,
        "You are blocked. Please try again later.",
      );
      return NextResponse.json({ success: false });
    }

    await handleFailedAttempt(chatId);

    const [command, ...args] = text.split(" ").filter(Boolean);

    if (!command) {
      await sendTelegramMessage(chatId, "Please send a command.");
      return NextResponse.json({ success: false });
    }

    const handler = COMMAND_HANDLERS[command];

    if (!handler) {
      await sendTelegramMessage(
        chatId,
        `Unknown command "${command}". Please check the available commands.`,
      );
      return NextResponse.json({ success: true });
    }
    handler(chatId, args);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error handling Telegram Webhook:", error);
    return NextResponse.json({ success: false });
  }
};

export { handler as GET, handler as POST };
