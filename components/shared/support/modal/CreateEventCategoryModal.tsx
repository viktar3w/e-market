"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/use-toast";
import { EMOJI_OPTIONS, COLOR_OPTIONS } from "@/lib/constants";
import { useCreateEventCategoryMutation } from "@/lib/redux/api/support.api";
import { cn } from "@/lib/utils";
import {
  SupportCreateEventCategoryRequest,
  SupportCreateEventCategorySchema,
} from "@/lib/validations/support";

type CreateEventCategoryModal = {
  containerClassName?: string
} & PropsWithChildren

const CreateEventCategoryModal = ({ containerClassName, children }: CreateEventCategoryModal) => {
  const [createCategoryEvent, { isSuccess, isError, isLoading }] =
    useCreateEventCategoryMutation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<SupportCreateEventCategoryRequest>({
    resolver: zodResolver(SupportCreateEventCategorySchema),
  });
  const { toast } = useToast();
  const color = form.watch("color");
  const selectedEmoji = form.watch("emoji");
  const onSubmit = (event: SupportCreateEventCategoryRequest) => {
    createCategoryEvent({ ...event });
  };
  useEffect(() => {
    if (isError) {
      toast({
        description: "We can't create new Category",
        variant: "destructive",
      });
    }
  }, [toast, isError]);
  useEffect(() => {
    if (isSuccess) {
      form.reset({
        name: "",
        emoji: undefined,
        color: "",
      });
      toast({
        description: "Category was created!",
        variant: "success",
      });
      setIsOpen(false);
    }
  }, [toast, isSuccess, form]);
  return (
    <>
      <div className={containerClassName} onClick={() => setIsOpen(true)}>
        {children}
      </div>
      <Modal showModal={isOpen} setShowModal={setIsOpen} className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="">
              <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
                New Event Category
              </h2>
              <p className="text-sm/6 text-gray-600">
                Create new Category to organize your events
              </p>
            </div>
            <div className="space-y-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  autoFocus
                  id="name"
                  {...form.register("name")}
                  placeholder="e.g. user-signup"
                  className="w-full"
                />
                {!!form.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="">
                <Label>Color</Label>
                <div className="flex flex-wrap gap-3">
                  {COLOR_OPTIONS.map((premadeColor) => (
                    <button
                      key={premadeColor}
                      type="button"
                      className={cn(
                        `bg-[${premadeColor}]`,
                        "size-10 rounded-full ring-2 ring-offset-2 transition-all",
                        color === premadeColor
                          ? "ring-brand-700 scale-110"
                          : "ring-transparent hover:scale-105",
                      )}
                      onClick={() => form.setValue("color", premadeColor)}
                    ></button>
                  ))}
                </div>
                {!!form.formState.errors.color && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.color.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Emoji</Label>
                <div className="flex flex-wrap gap-3">
                  {EMOJI_OPTIONS.map(({ emoji }) => (
                    <button
                      key={emoji}
                      type="button"
                      className={cn(
                        "size-10 flex items-center justify-center text-xl rounded-md transition-all",
                        selectedEmoji === emoji
                          ? "bg-brand-100 ring-2 ring-brand-700 scale-110"
                          : "bg-brand-100 hover:bg-brand-200",
                      )}
                      onClick={() => form.setValue("emoji", emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                {!!form.formState.errors.emoji && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.emoji.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-3 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cansel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Category"}
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default CreateEventCategoryModal;
