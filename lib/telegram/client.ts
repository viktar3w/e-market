import TelegramBot from "node-telegram-bot-api";
import { BotStructure } from "@/lib/types/support/bot";

const botSingleton = (): BotStructure<TelegramBot> => {
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const apiUrl = `https://api.telegram.org/bot${token}`;
  return {
    client: new TelegramBot(token, { polling: false }),
    sendMessage: async (chatId: number, text: string) => {
      await fetch(`${apiUrl}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    },
  };
};

declare global {
  var botGlobal: ReturnType<typeof botSingleton>;
}
export const bot = globalThis.botGlobal ?? botSingleton();

if (process.env.NODE_ENV !== "production") globalThis.botGlobal = bot;
