export type BotStructure<T> = {
  client: T;
  sendMessage: (chatId: number, text: string) => Promise<void>
}
