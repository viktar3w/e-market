"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useClerk,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useLazyGetCartQuery } from "@/lib/redux/api/cart.api";
import { SIGN_OUT_KEY } from "@/lib/constants";
import { LogOut } from "lucide-react";

const Auth = () => {
  const { signOut } = useClerk();
  const [getCartQuery] = useLazyGetCartQuery();

  return (
    <div>
      <SignedOut>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
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
        </UserButton>
      </SignedIn>
    </div>
  );
};

export default Auth;
