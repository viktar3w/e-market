import { PropsWithChildren } from "react";
import { User, Menu, MoreVertical, Send } from "lucide-react";

export const MockTelegramUi = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-[800px] w-full max-w-[1200px] bg-telegram-bg text-white rounded-lg overflow-hidden shadow-xl">
      <div className="flex w-full h-screen">
        <Sidebar />
        <ChatWindow>{children}</ChatWindow>
      </div>
    </div>
  );
};
export const Sidebar = ({ children }: PropsWithChildren) => (
  <div className="w-20 h-full bg-gray-100 border-r border-gray-200 flex flex-col items-center">
    <div className="w-full flex h-16 items-center justify-center transition-all duration-200 hover:bg-gray-200 cursor-pointer">
      <Menu className="w-8 h-8 p-1 text-gray-700" />
    </div>

    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="w-full flex items-center justify-center transition-all duration-200 hover:bg-gray-200 cursor-pointer p-1.5"
      >
        <User className="w-10 h-10  bg-telegram-bg rounded-3xl  justify-center" />
      </div>
    ))}
    <div className="w-full flex bg-blue-200 items-center justify-center transition-all duration-500 cursor-pointer p-1.5 relative">
      <User className="w-10 h-10  bg-telegram-bg rounded-3xl  justify-center" />
      <span className="p-[2px] absolute bottom-2 right-3 rounded-full bg-gray-400 text-[12px]">
        10
      </span>
    </div>
  </div>
);
export const ChatWindow = ({ children }: PropsWithChildren) => (
  <div className="w-full h-full flex flex-col">
    <div className="flex items-center justify-between bg-white p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold">John Doe</h2>
      <MoreVertical className="w-5 h-5 text-gray-500" />
    </div>

    <div className="flex-1 place-content-end p-4 bg-gray-300 space-y-2 overflow-y-auto">
      {children}
    </div>

    <div className="flex items-center p-4 border-t border-gray-200 bg-white">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
      />
      <button className="ml-2 p-2 bg-blue-500 rounded-full text-white">
        <Send className="w-5 h-5" />
      </button>
    </div>
  </div>
);
