import { ReadonlyURLSearchParams } from 'next/navigation';

import { Component, Prisma } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import qs from 'qs';
import { twMerge } from 'tailwind-merge';
import { boolean } from 'zod';

import { GetCategoriesQueryVariables } from '@/documents/generates/hooks/apollo';
import { DEFAULT_EMPTY_PRODUCT_IMAGE, DEFAULT_PRODUCT_NUMBER_PAGE, DEFAULT_PRODUCT_SIZE } from '@/lib/constants';
import { CategoryParent, VariantItem } from '@/lib/types/product';

import ProductWhereInput = Prisma.ProductWhereInput;
import CategoryWhereInput = Prisma.CategoryWhereInput;
import VariantWhereInput = Prisma.VariantWhereInput;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(price);
};

export const reduceProductVariants = (acc: Record<string, Record<string, any>>, item: VariantItem) => {
  Object.keys(item.data).map((key) => {
    acc[key] = acc[key] || {};
    const value = String(item.data[key]);
    !acc[key]?.[value] && (acc[key][value] = []);
    acc[key][value].push(item);
  });
  return acc;
};

export const getMinimumPrice = (variants: VariantItem[]) => {
  return variants.filter(Boolean).sort((a, b) => a?.price - b?.price)?.[0]?.price || 0;
};

export const getProductDetails = (
  variant: VariantItem | null,
  componentIds: Set<string>,
  components: Component[],
): string => {
  let description: string = '';
  if (!!variant?.data) {
    description = Object.keys(variant.data)
      .reduce((text, key) => {
        text.push(`${key}: ${variant.data[key]}`);
        return text;
      }, [] as string[])
      .join(',\n');
  }
  if (componentIds.size > 0) {
    description += description === '' ? '' : '. ';
    description +=
      'Components: \n' +
      Array.from(componentIds)
        .reduce((text, id) => {
          const component = components.find((c) => c.id === id);
          if (!component) {
            return text;
          }
          text.push(component.name);
          return text;
        }, [] as string[])
        .join(', ');
  }
  return description;
};

export const preparedCategoryProductVariantsByPrice = (
  categories: CategoryParent[],
  minPrice?: number,
  maxPrice?: number,
) => {
  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < categories[i].products.length; j++) {
      const filteredVariants = categories[i].products[j].variants.filter((variant) => {
        return (!minPrice || variant.price >= Number(minPrice)) && (!maxPrice || variant.price <= Number(maxPrice));
      });
      const minVariant =
        filteredVariants.length > 0
          ? filteredVariants.reduce((minVar, currentVar) => (currentVar.price < minVar.price ? currentVar : minVar))
          : null;
      categories[i].products[j].variants = minVariant ? [minVariant] : [];
    }
  }
  return categories;
};

export const preparePrismaCategoryFilter = (components: qs.ParsedQs) => {
  const limit = Number(components?.limit || DEFAULT_PRODUCT_SIZE);
  const numberPage = Number(components?.number_page || DEFAULT_PRODUCT_NUMBER_PAGE);
  let options = {
    skip: (numberPage - 1) * limit, // Пропустить записи для предыдущих страниц
    take: limit,
    include: {
      products: {
        include: {
          components: true,
          variants: {
            where: {} as VariantWhereInput,
            orderBy: {
              price: Prisma.SortOrder.asc,
            },
          },
        },
        where: {} as ProductWhereInput,
      },
    },
    where: {} as CategoryWhereInput,
  };
  if (!!components?.query) {
    options.where = {
      name: {
        contains: String(components?.query),
        mode: 'insensitive',
      },
    };
  }
  const minPrice = !!components?.minPrice ? Number(components?.minPrice) : undefined;
  const maxPrice = !!components?.maxPrice ? Number(components?.maxPrice) : undefined;
  if (Object.keys(components).length > 0) {
    if (!!components?.available) {
      options.include.products.where.available = String(components?.available).toLowerCase() === 'true';
    }
    if (!!components?.new) {
      options.include.products.where.new = String(components?.new).toLowerCase() === 'true';
    }
    if (!!components?.components) {
      if (typeof components?.components === 'string') {
        options.include.products.where.components = {
          some: {
            id: { in: String(components?.components).split(',') },
          },
        };
      }
    }
    if (!!minPrice || !!maxPrice) {
      options.include.products.where.variants = {
        some: {
          AND: [
            minPrice ? { price: { gte: minPrice } } : undefined,
            maxPrice ? { price: { lte: maxPrice } } : undefined,
          ].filter(Boolean) as VariantWhereInput[],
        },
      };
    }
  }
  return options;
};

export const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.sort().join(',') === arr2.sort().join(',');
};

export const findValueInAddress = (
  addressAutocomplete: google.maps.places.PlaceResult | null,
  setting: string,
): string => {
  return (
    addressAutocomplete?.address_components?.find((address) => !!address.types.find((type) => type === setting))
      ?.long_name || ''
  );
};

export const getImage = (image?: string | null): string => {
  // @ts-ignore
  return showImage(image) ? image : DEFAULT_EMPTY_PRODUCT_IMAGE;
};

export const showImage = (image?: string | null) => {
  return !!image && image.includes('http');
};

export const parseColor = (color: string) => {
  const hex = color.startsWith('#') ? color.slice(1) : color;
  return parseInt(hex, 16);
};

export const sanitize = (html: string) => {
  return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

export const prepareCategoryFilters = (components: ReadonlyURLSearchParams): GetCategoriesQueryVariables => {
  const filters: GetCategoriesQueryVariables = {
    categoryPage: Number(components.get('number_page') || DEFAULT_PRODUCT_NUMBER_PAGE),
    categoryLimit: Number(components.get('limit') || DEFAULT_PRODUCT_SIZE),
    categoryFilter: {},
    productFilter: {},
    productLimit: Number(components.get('pLimit') || DEFAULT_PRODUCT_SIZE),
    productPage: Number(components.get('pPage') || DEFAULT_PRODUCT_NUMBER_PAGE),
  };
  if (!!components.get('query')) {
    filters.categoryFilter = { query: components.get('query') as string };
  }
  if (!!components.get('available')) {
    filters.productFilter = {
      ...filters.productFilter,
      available: String(components.get('available')).toLowerCase() === 'true',
    };
  }
  if (!!components.get('new')) {
    filters.productFilter = { ...filters.productFilter, new: String(components.get('new')).toLowerCase() === 'true' };
  }
  if (!!components.get('components')) {
    if (typeof components.get('components') === 'string') {
      filters.productFilter = {
        ...filters.productFilter,
        components: String(components.get('components')).split(','),
      };
    }
  }
  const minPrice = !!components.get('minPrice') ? Number(components.get('minPrice')) : undefined;
  if (!!minPrice) {
    filters.productFilter = {
      ...filters.productFilter,
      minPrice: minPrice,
    };
  }
  const maxPrice = !!components.get('maxPrice') ? Number(components.get('maxPrice')) : undefined;
  if (!!maxPrice) {
    filters.productFilter = {
      ...filters.productFilter,
      maxPrice: maxPrice,
    };
  }
  return filters;
};
