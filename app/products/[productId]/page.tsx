import { notFound } from "next/navigation";

type PageProps = {
  params: {
    productId: string;
  };
};
const Page = ({ params }: PageProps) => {
  const { productId } = params;
  if (!productId) {
    return notFound();
  }
  return <></>;
};

export default Page;
