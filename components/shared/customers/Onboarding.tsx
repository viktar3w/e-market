"use client";

import BoxWrapper from "@/components/shared/common/BoxWrapper";
import { CustomerCreateForm } from "@/lib/types/user";
import { useOnboarding } from "@/hooks/useOnboarding";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const Onboarding = ({
  id,
  firstname,
  lastname,
  image,
  email,
}: CustomerCreateForm) => {
  const $t = useTranslation();
  const { form, onSubmit, loading } = useOnboarding({
    id,
    firstname,
    lastname,
    image,
    email,
  });
  return (
    <BoxWrapper className="pt-10 text-center max-w-[500px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-start gap-10"
        >
          {!email && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    {$t("Email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="account-form_input no-focuse"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  {$t("Firstname")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input no-focuse"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  {$t("Lastname")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input no-focuse"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {$t("Submit")}
          </Button>
        </form>
      </Form>
    </BoxWrapper>
  );
};

export default Onboarding;
