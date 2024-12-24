'use client';

import { useSearchParams } from 'next/navigation';

import { EventCategory, Event, DeliveryStatus } from '@prisma/client';
import { useReactTable, flexRender } from '@tanstack/react-table';
import {
  ColumnDef,
  Row,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/table-core';
import { isAfter, isToday, startOfMonth, startOfWeek } from 'date-fns';
import { ArrowUpDown, BarChart } from 'lucide-react';
import { useMemo, useState } from 'react';

import NumericFieldSumCard from '@/components/shared/cart/NumericFieldSumCard';
import Card from '@/components/shared/common/Card';
import Heading from '@/components/shared/common/Heading';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TIME_RANGE_LABELS } from '@/lib/constants';
import { useGetEventsByCategoryNameQuery } from '@/lib/redux/api/support.api';
import { cn } from '@/lib/utils';
import { SupportEventsByCategoryNameRequest } from '@/lib/validations/support';

type CategoryPageContentProps = {
  category: EventCategory;
  className?: string;
};

const CategoryPageContent = ({ category, className }: CategoryPageContentProps) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '30', 10);
  const [activeTab, setActiveTab] = useState<SupportEventsByCategoryNameRequest['timeRange']>('today');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: page - 1,
    pageSize: limit,
  });
  const { data, isLoading } = useGetEventsByCategoryNameQuery({
    limit: pagination.pageSize,
    page: pagination.pageIndex + 1,
    name: category.name,
    timeRange: activeTab,
  });
  const numericFieldSums = useMemo(() => {
    if (!data?.events || data.events.length === 0) return {};

    const sums: Record<
      string,
      {
        total: number;
        thisWeek: number;
        thisMonth: number;
        today: number;
      }
    > = {};

    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 0 });
    const monthStart = startOfMonth(now);

    data.events.forEach((event) => {
      const eventDate = event.createdAt;

      Object.entries(event.fields as object).forEach(([field, value]) => {
        if (typeof value === 'number') {
          if (!sums[field]) {
            sums[field] = { total: 0, thisWeek: 0, thisMonth: 0, today: 0 };
          }

          sums[field].total += value;

          if (isAfter(eventDate, weekStart) || (!!eventDate.getTime && eventDate.getTime() === weekStart.getTime())) {
            sums[field].thisWeek += value;
          }

          if (isAfter(eventDate, monthStart) || eventDate.getTime() === monthStart.getTime()) {
            sums[field].thisMonth += value;
          }

          if (isToday(eventDate)) {
            sums[field].today += value;
          }
        }
      });
    });
    return sums;
  }, [data?.events]);
  const columns: ColumnDef<Event>[] = useMemo(
    () => [
      {
        accessorKey: 'category',
        header: 'Category',
        cell: () => <span>{category.name || 'Uncategorized'}</span>,
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
              Date
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return new Date(row.getValue('createdAt')).toLocaleString();
        },
      },
      ...(!!data?.events?.[0]?.fields
        ? Object.keys(data.events[0].fields as object).map((field) => ({
            accessorFn: (row: Event) => (row.fields as Record<string, any>)[field],
            header: field,
            cell: ({ row }: { row: Row<Event> }) => (row.original.fields as Record<string, any>)[field] || '-',
          }))
        : []),
      {
        accessorKey: 'status',
        header: 'Delivery Status',
        cell: ({ row }) => (
          <span
            className={cn('px-2 py-1 rounded-full text-xs font-semibold', {
              'bg-green-100 text-green-800': row.getValue('status') === DeliveryStatus.DELIVERED,
              'bg-yellow-100 text-yellow-800': row.getValue('status') === DeliveryStatus.PENDING,
              'bg-red-100 text-red-800': row.getValue('status') === DeliveryStatus.FAILD,
            })}
          >
            {row.getValue('status')}
          </span>
        ),
      },
    ],
    [category.name, data?.events],
  );
  const table = useReactTable({
    data: data?.events || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.eventsCount || 0) / pagination.pageSize),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });
  return (
    <div className={cn('space-y-6', className)}>
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as SupportEventsByCategoryNameRequest['timeRange']);
        }}
      >
        <TabsList className="mb-2">
          <TabsTrigger value="today">{TIME_RANGE_LABELS['today']}</TabsTrigger>
          <TabsTrigger value="week">{TIME_RANGE_LABELS['week']}</TabsTrigger>
          <TabsTrigger value="month">{TIME_RANGE_LABELS['month']}</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {!!data && (
              <>
                <Card className="border-2 border-brand-700">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <p className="text-sm/6 font-medium">Total Events</p>
                    <BarChart className="size-4 text-muted-foreground" />
                  </div>
                  <div className="">
                    <p className="text-2xl font-bold">{data.eventsCount}</p>
                    <p className="text-xs/5 text-muted-foreground">{TIME_RANGE_LABELS[activeTab]}</p>
                  </div>
                </Card>
                <NumericFieldSumCard numericFieldSums={numericFieldSums} activeTab={activeTab} />
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="w-full flex flex-col gap-4">
            <Heading className="text-3xl">Event overview</Heading>
          </div>
        </div>
        <Card contentClassName="px-6 py-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    {columns.map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || isLoading}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || isLoading}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CategoryPageContent;
