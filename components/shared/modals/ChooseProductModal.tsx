"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import ProductForm from "@/components/shared/products/ProductForm";
import { CategoryProductParent } from "@/lib/types/product";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import { useEffect, useState } from "react";

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
