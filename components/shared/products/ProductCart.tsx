import Image from 'next/image';
import Link from 'next/link';

import { Plus } from 'lucide-react';

import Title from '@/components/shared/common/Title';
import { Button } from '@/components/ui/button';
import { ProductItemType } from '@/lib/types/product';
import { formatPrice } from '@/lib/utils';

type ProductCartProps = {
  className?: string;
} & ProductItemType;
const ProductCart = ({ className, id, name, price, image, variants }: ProductCartProps) => {
  return (
    <div className={className}>
      <Link href={`/products/${id}`} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <Image
            src={image || '/default_product_img.png'}
            alt={name}
            width={100}
            height={100}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
            quality={80}
            loading="lazy"
            overrideSrc="/default_product_img.png"
          />
        </div>
        <Title text={name} className="mt-4 text-sm text-gray-700" size="sm" />
        {!!variants && (
          <div className="text-sm text-gray-600">
            {variants?.map((variant) => (
              <div className="" key={variant.id}>
                {Object.keys(variant?.data || {})
                  .map(
                    // @ts-ignore
                    (key) => `${key}: ${variant?.data?.[key] || ''}`,
                  )
                  .join(', ')}
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          <span className="mt-1 text-lg font-medium text-gray-900">
            {' '}
            from <strong>{formatPrice(price)}</strong>
          </span>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Add
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCart;
