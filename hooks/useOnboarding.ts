"use client";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createUser } from "@/actions/createUser";
import { toast } from "@/components/ui/use-toast";
import { CustomerCreateForm } from "@/lib/types/user";
import { OnboardingValidation } from "@/lib/validations/onboarding";



export const useOnboarding = ({
  firstname,
  lastname,
  image,
  email,
  id,
}: CustomerCreateForm) => {
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof OnboardingValidation>>({
    resolver: zodResolver(OnboardingValidation),
    defaultValues: {
      firstname: firstname || "",
      lastname: lastname || "",
      email: email || "",
      image: image || "",
      id: id,
    },
  });
  const onSubmit = async (values: z.infer<typeof OnboardingValidation>) => {
    setLoading(true);
    const user = await createUser({
      id: values.id,
      firstname: values.firstname,
      lastname: values.lastname,
      image: values.image,
      email: values.email,
    } as User);
    if (!user) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with server request.",
      });
      return;
    }
    push("/");
  };
  return {
    loading,
    form,
    onSubmit,
  };
};
