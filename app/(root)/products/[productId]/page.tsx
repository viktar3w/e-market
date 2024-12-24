import { notFound } from "next/navigation";

import ProductForm from "@/components/shared/products/ProductForm";
import { db } from "@/db";
import { CategoryProductParent } from "@/lib/types/product";

type PageProps = {
  params: {
    productId: string;
  };
};
const Page = async ({ params }: PageProps) => {
  const { productId } = params;
  if (!productId) {
    return notFound();
  }
  let product: CategoryProductParent
  try {
    // @ts-ignore
    product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        variants: true,
        components: true,
        categories: true,
      },
    });
  } catch (e) {
    console.log("[ERROR]: ", e)
  }
  // @ts-ignore
  if (!product) {
    return notFound();
  }
  return <ProductForm product={product} className='mt-20' />;
};

export default Page;
