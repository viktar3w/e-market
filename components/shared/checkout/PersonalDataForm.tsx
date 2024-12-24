"use client";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCheckoutPersonalData } from "@/hooks/useCheckoutPersonalData";
import { CustomerForm } from "@/lib/types/user";
import { cn } from "@/lib/utils";
type PersonalDataFormProps = {
  className?: string;
} & CustomerForm;
const PersonalDataForm = ({
  className,
  email,
  firstname,
  lastname,
  phone,
}: PersonalDataFormProps) => {
  const { form, onSubmit, loading } = useCheckoutPersonalData({
    email,
    firstname,
    lastname,
    phone,
  });
  return (
    <BoxWrapper className={cn("", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 items-center justify-center"
        >
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Email
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
              name="firstname"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Firstname
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
                    Lastname
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
              name="phone"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Phone
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
          </div>
          <Button type="submit" loading={loading} disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </BoxWrapper>
  );
};
export default PersonalDataForm;
