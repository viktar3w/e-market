"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useClerk,
} from "@clerk/nextjs";
import {
  ArrowRight,
  LogOut,
  MessageCircleQuestion,
  UserRoundSearch,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { SIGN_OUT_KEY } from "@/lib/constants";
import { useLazyGetCartQuery } from "@/lib/redux/api/cart.api";

const Auth = () => {
  const { signOut } = useClerk();
  const path = usePathname()
  const [getCartQuery] = useLazyGetCartQuery();

  return (
    <div>
      <SignedOut>
        <div className="flex items-center justify-center">
          <SignInButton>
            <Button
              className={buttonVariants({
                size: "sm",
                className: "flex items-center gap-1",
              })}>Sign In</Button>
          </SignInButton>
          {path !== "/support" && (
            <Link
              href="/support"
              className={buttonVariants({
                size: "sm",
                className: "flex items-center gap-1",
                variant: "link"
              })}
            >
              Support <ArrowRight className="ml-1.5 size-4" />
            </Link>
          )}
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              userButtonPopoverActionButton__signOut: "hidden",
            },
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Action
              label="Sign Out"
              labelIcon={<LogOut className="w-4 h-4" />}
              onClick={() => {
                signOut(
                  () => {
                    getCartQuery();
                  },
                  {
                    redirectUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/clerk/redirect?${SIGN_OUT_KEY}=1`,
                  },
                );
              }}
            />
          </UserButton.MenuItems>
          <UserButton.UserProfileLink
            url="/support/dashboard"
            label="Support Dashboard"
            labelIcon={<UserRoundSearch className="w-4 h-4" />}
          />
        </UserButton>
      </SignedIn>
    </div>
  );
};

export default Auth;
