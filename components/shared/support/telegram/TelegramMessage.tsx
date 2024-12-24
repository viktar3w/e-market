import Image from "next/image";

import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TelegramMessageProps = {
  children?: ReactNode;
  avatarLabel: string;
  avatarSrc: string;
  username: string;
  timestamp: string;
  text?: string;
  title: string;
  color?: string;
  className?: string;
  content: {
    [key: string]: string;
  };
};
const TelegramMessage = ({
  children,
  className,
  title,
  avatarLabel,
  content,
  color = "#2dabe2",
  username,
  timestamp,
  text,
  avatarSrc,
}: TelegramMessageProps) => {
  return (
    <div className="w-full flex items-center justify-start">
      <div className="flex items-center mb-2">
        <Image
          src={avatarSrc}
          alt={avatarLabel}
          width={40}
          height={40}
          className="object-cover rounded-full mr-3 w-10 h-10"
        />
        <div className="w-full max-w-xl bg-white p-3 rounded-3xl flex">
          <div className="flex flex-col items-start">
            <p className='font-semibold text-blue-400'>
              {username}
            </p>
            <span className="font-light text-[#040404]">{text}</span>
          </div>
          <span className="relative w-[40px] pl-3">
            <span className="absolute text-sm text-gray-400 text-right w-[40px] -bottom-[10px] right-0">
              {timestamp}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TelegramMessage;
