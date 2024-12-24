"use client";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import ProductForm from "@/components/shared/products/ProductForm";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CategoryProductParent } from "@/lib/types/product";
import { cn } from "@/lib/utils";



type ChooseProductModalProps = {
  className?: string;
  product: CategoryProductParent;
  open?: boolean;
};
const ChooseProductModal = ({
  className,
  product,
  open,
}: ChooseProductModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(!!open);
  const [currentPath] = useState<string>('/')
  const router = useRouter();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
        router.push(currentPath);
      }}
      modal
    >
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-auto",
          className,
        )}
        aria-describedby=""
      >
        <DialogTitle className="pt-4 pl-4">{product.name}</DialogTitle>
        <DialogBody>
          <ProductForm
            className="my-2 md:px-10"
            product={product}
            onSubmit={() => {}}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;
