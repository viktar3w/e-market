import ChooseProductForm from "@/components/shared/products/ChooseProductForm";
import { CategoryProductParent } from "@/lib/types/product";

type ProductFormProps = {
  className?: string;
  product: CategoryProductParent;
  onSubmit?: () => void;
};
const ProductForm = ({ className, product, onSubmit }: ProductFormProps) => {
  return (
    <ChooseProductForm
      product={product}
      className={className}
      onSubmit={onSubmit}
    />
  );
};

export default ProductForm;
