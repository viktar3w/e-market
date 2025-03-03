"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useClerk,
} from "@clerk/nextjs";

import { Button, buttonVariants } from "@/components/ui/button";
import { useLazyGetCartQuery } from "@/lib/redux/api/cart.api";
import { SIGN_OUT_KEY } from "@/lib/constants";
import { ArrowRight, LogOut, UserRoundSearch } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

const Auth = () => {
  const { signOut } = useClerk();
  const path = usePathname();
  const [getCartQuery] = useLazyGetCartQuery();
  const $t = useTranslation();
  return (
    <div>
      <SignedOut>
        <div className="flex items-center justify-center">
          <SignInButton>
            <Button
              className={buttonVariants({
                size: "sm",
                className: "flex items-center gap-1",
              })}
            >
              {$t("Sign In")}
            </Button>
          </SignInButton>
          {path !== "/support" && (
            <Link
              href="/support"
              className={buttonVariants({
                size: "sm",
                className: "flex items-center gap-1",
                variant: "link",
              })}
            >
              {$t("Support")} <ArrowRight className="ml-1.5 size-4" />
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
              label={$t("Sign Out")}
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
            label={$t("Support Dashboard")}
            labelIcon={<UserRoundSearch className="w-4 h-4" />}
          />
        </UserButton>
      </SignedIn>
    </div>
  );
};

export default Auth;
