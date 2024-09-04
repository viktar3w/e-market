import { notFound } from "next/navigation";
import { db } from "@/db";
import ProductForm from "@/components/shared/products/ProductForm";

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
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      variants: true,
      components: true,
      categories: true,
    },
  });
  if (!product) {
    return notFound();
  }
  return <ProductForm product={product} className='mt-20' />;
};

export default Page;
