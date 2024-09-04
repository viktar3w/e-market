"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/shared/products/ProductForm";
import { CategoryProductParent } from "@/lib/types/product";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";

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
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={() => router.back()}>
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
            onSubmit={() => router.back()}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;
