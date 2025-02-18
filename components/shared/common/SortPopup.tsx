'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ArrowUpDown } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SORT_KEY } from '@/lib/constants';
import { SortItem } from '@/lib/types/types';

type SortPopupProps = {
  className?: string;
  items: SortItem[];
};
const SortPopup = ({ className, items }: SortPopupProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const [sort, setSort] = useState<string>('');
  useEffect(() => {
    if (!!searchParams.get(SORT_KEY)) {
      setSort(searchParams.get(SORT_KEY)!);
    }
  }, [searchParams]);

  const onCheckedChangeHandler = useCallback(
    (sort: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(SORT_KEY, sort);
      push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, push],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button variant="outline">
          <ArrowUpDown size={16} />
          <strong>Sort:</strong>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.value}
            checked={item.value === sort}
            onCheckedChange={() => onCheckedChangeHandler(item.value)}
          >
            {item.label}
            <item.icon size={25} className="pl-2" />
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortPopup;
