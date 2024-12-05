"use client";
import { DeliveryForm as DeliveryFormType } from "@/lib/types/user";
import { useCheckoutDelivery } from "@/hooks/useCheckoutDelivery";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import { cn } from "@/lib/utils";
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
import {
  APIProvider,
} from '@vis.gl/react-google-maps';
import PlaceAutocomplete from "@/components/shared/Map/PlaceAutocomplete";

type DeliveryFormProps = {
  className?: string;
  disabled?: boolean;
} & DeliveryFormType;
const DeliveryForm = ({
  className,
  firstname,
  lastname,
  country,
  city,
  state,
  street,
  postcode,
  phone,
  email,
  disabled = true,
}: DeliveryFormProps) => {
  const { form, onSubmit, loading, setAddressAutocomplete } = useCheckoutDelivery({
    firstname,
    lastname,
    country,
    city,
    state,
    street,
    postcode,
    phone,
    email,
  });
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
      <BoxWrapper className={cn("flex flex-col gap-10 items-center justify-center", className)}>
        <PlaceAutocomplete onPlaceSelect={setAddressAutocomplete} />
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
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base-semibold text-light-2">
                      Country
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
                name="city"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base-semibold text-light-2">
                      City
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
                name="state"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base-semibold text-light-2">
                      State
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
                name="street"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base-semibold text-light-2">
                      Address
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
                name="postcode"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-base-semibold text-light-2">
                      Postcode
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
            <Button
              type="submit"
              loading={loading}
              disabled={loading || disabled}
            >
              Submit
            </Button>
          </form>
        </Form>
      </BoxWrapper>
    </APIProvider>
  );
};

export default DeliveryForm;
