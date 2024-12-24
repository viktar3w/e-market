import Image from "next/image";

import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Check, Star } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import BoxWrapper from "@/components/shared/common/BoxWrapper";
import Heading from "@/components/shared/common/Heading";
import ShinyButton from "@/components/shared/common/ShinyButton";
import { Icons } from "@/components/shared/support/Icons";
import TelegramMessage from "@/components/shared/support/telegram/TelegramMessage";
import { AnimatedList } from "@/components/ui/animated-list";
import { MockTelegramUi } from "@/components/ui/mock-telegram-ui";



const lines = [
  "Real-time Telegram alerts for critical events",
  "Buy once, use forever",
  "Track sales, new users, or other events",
];
const codeSnippet = `await fetch("http://localhost:3000/api/support/events", {
    method: "POST",
    body: JSON.stringify({
      category: "sale",
      fields: {
        plan: "PRO",
        email: "your@private.email.com",
        amount: 48.24
      }
    }),
    headers: {
      Authorisation: "Bearer <YOUR_API_KEY>"
    }
  });`;

const Page = () => {
  return (
    <>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <BoxWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            <div className="">
              <Heading>
                <span>Real-Time Saas Insights,</span>
                <br />
                <span className="relative bg-gradient-to-r from-brand-600 to-brand-800 text-transparent bg-clip-text">
                  Delivered to Your Telegram
                </span>
              </Heading>
            </div>
            <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
              Our Support is the easiest way to monitor your Saas. Get instance
              notifications for{" "}
              <span className="font-semibold text-gray-700">
                sales, new users, or any other event
              </span>{" "}
              sent directly to your Telegram
            </p>
            <ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-center sm:items-start">
              {lines.map((line, index) => (
                <li key={index} className="flex gap-1.5 items-center text-left">
                  <Check className="size-5 shrink-0 text-brand-700" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="w-full max-w-80">
              <SignedOut>
                <SignInButton>
                  <ShinyButton className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
                    Start for free today
                  </ShinyButton>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </BoxWrapper>
      </section>
      <section className="relative bg-brand-25 pb-4">
        <div className="absolute inset-x-0 inset-y-24 bg-brand-700" />
        <div className="relative mx-auto">
          <BoxWrapper className="relative">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <MockTelegramUi>
                <AnimatedList>
                  {[...Array(5)].map((_, i) => (
                    <TelegramMessage
                      key={i}
                      username="John"
                      content={{ name: "Vik", email: "vik.one@cte.com" }}
                      avatarSrc="/logo.svg"
                      avatarLabel="Test one"
                      title="something ok"
                      text={`something ok ${i}`}
                      timestamp={new Date().toLocaleTimeString("en-UK", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    />
                  ))}
                </AnimatedList>
              </MockTelegramUi>
            </div>
          </BoxWrapper>
        </div>
      </section>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <BoxWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div className="">
            <h2 className="text-center text-base/7 font-semibold text-brand-600 ">
              Intuitive monitoring
            </h2>
            <Heading className="">Stay ahead with real time insights</Heading>
          </div>
          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {/* first bento grid element */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Real time notifications
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Get notified about critical events the moment they happen,
                    no matter if you&apos;re at home or go.
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <Image
                      className="size-full object-cover object-top"
                      src="/support/phone-screen.png"
                      alt="Phone screen"
                      fill
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]" />
            </div>

            {/* second bento grid element */}
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Track any events
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    From new Users signups to successful payments, SUpoRT
                    notifies you for all critical events in your SaaS
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <Image
                    src="/support/bento-any-event.png"
                    alt="bento any event"
                    className="w-full max-lg:max-x-xs"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]" />
            </div>

            {/* third bento grid element */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex w-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <div className="px-8 pt-8 sm:pt-10 sm:px-10 ">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Track any properties
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Add your custom data you like to an event, such user email,
                    purchase amount or an exceeded quote.
                  </p>
                </div>
                <div className="flex items-center flex-1 justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <Image
                    src="/support/bento-custom-data.png"
                    alt="bento custom data"
                    className="w-full max-lg:max-x-xs"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
            </div>

            {/* fourth bento grid element */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:pt-10 sm:px-10 sm:pb-0">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Easy Integration
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Connect SUpoRT with your existing workflows in minutes and
                    call our intuitive logging API from many language
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow">
                  <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="-mb-px flex  text-sm/6 font-medium text-gray-400">
                        <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                          support.js
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <div className="max-h-[30rem]">
                        <SyntaxHighlighter
                          language="typescript"
                          style={{
                            ...oneDark,
                            'pre[class*="language-"]': {
                              ...oneDark['pre[class*="language-"]'],
                              background: "transparent",
                              overflow: "hidden",
                            },
                            'code[class*="language-"]': {
                              ...oneDark['code[class*="language-"]'],
                              background: "transparent",
                            },
                          }}
                        >
                          {codeSnippet}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            </div>
          </div>
        </BoxWrapper>
      </section>
      <section className="relative py-24 sm:py-32 bg-white">
        <BoxWrapper className="flex flex-col items-center gap-16 sm:gap-20">
          <div className="">
            <h2 className="text-center text-base/7 font-semibold text-brend-600">
              Real World experiences
            </h2>
            <Heading className="text-center">What our customers say</Heading>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            {/* first customer review */}
            <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
              </div>
              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tighter text-brand-950 text-center lg:text-left text-pretty">
                SUpoRT has been a game changer for me. I&apos;ve been using it for
                months now and seeing sales pop up in reel time is super
                satisfying
              </p>
              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/support/user-2.png"
                  alt="Review User one"
                  className="rounded-full object-cover"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Freya Larsson
                    <Icons.verificationBadge className="size-4 inline-block ml-1.5" />
                  </p>
                  <p className="text-sm text-gray-600">@itsfreya</p>
                </div>
              </div>
            </div>
            {/* second customer review */}
            <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-b-[2rem] lg:rounded-bl-none lg:rounded-r-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
              </div>
              <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tighter text-brand-950 text-center lg:text-left text-pretty">
                SUpoRT has been a game changer for me.
              </p>
              <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/support/user-2.png"
                  alt="Review User one"
                  className="rounded-full object-cover"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    NotFreya Larsson
                    <Icons.verificationBadge className="size-4 inline-block ml-1.5" />
                  </p>
                  <p className="text-sm text-gray-600">@itsnotfreya</p>
                </div>
              </div>
            </div>
          </div>
        </BoxWrapper>
      </section>
    </>
  );
};

export default Page;
