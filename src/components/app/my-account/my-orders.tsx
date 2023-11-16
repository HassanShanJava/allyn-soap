import { useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { Button } from '~/components/ui/button';
import { RootState } from '~/store/store';
import Image from 'next/image';
import Current from '~/public/assets/not-current-entrie.png';
import { useQuery } from '@apollo/client';
import { displayDate, removeEdgesAndNodes } from '~/utils/helper';
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { ArrowRight } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '~/components/ui/skeleton';
import { orderAccountQuery } from '~/server/lib/shopify/query/customer';
type AccountOrdersType = {
  selectedMenu: string;
  selectViewTitle: string | undefined;
  refetch: () => unknown;
};
type AccountOrdersFilterType = {
  customerAccessToken: string | null;
  first: number | null;
  last: number | null;
  after: string | null;
  before: string | null;
};
const AccountOrders = (props: AccountOrdersType) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { user } = useSelector((state: RootState) => state.auth);
  const [filters, setFilters] = useState<AccountOrdersFilterType>({
    customerAccessToken: user?.token_id,
    first: 10,
    last: null,
    after: null,
    before: null,
  });
  const { data: customerData, loading } = useQuery(orderAccountQuery, {
    variables: { ...filters },
  });
  const orderData = useMemo(() => {
    return Array.isArray(customerData?.customer?.orders?.edges)
      ? removeEdgesAndNodes(customerData?.customer?.orders)
      : [];
  }, [customerData?.customer?.orders]);
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'ID',
      header: 'Order ID',
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis whitespace-nowrap ">
          {row?.original.name}
        </div>
      ),
    },
    {
      accessorKey: 'Sub Total',
      header: 'Sub Total',
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis whitespace-nowrap ">
          {row?.original?.subtotalPrice?.currencyCode}{' '}
          {row?.original?.subtotalPrice?.amount}
        </div>
      ),
    },
    {
      accessorKey: 'Status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis whitespace-nowrap ">
          {row?.original?.fulfillmentStatus}
        </div>
      ),
    },
    {
      accessorKey: 'Total Amount',
      header: 'Total Amount',
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis whitespace-nowrap w-28">
          {row?.original?.totalPrice?.currencyCode}{' '}
          {row?.original?.totalPrice?.amount}
        </div>
      ),
    },
    {
      accessorKey: 'Created At',
      header: 'Date',
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis whitespace-nowrap overflow-hidden ">
          {displayDate(row?.original?.processedAt)}
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data: orderData as any[],
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });
  const handleNextPage = () => {
    if (customerData?.customer?.orders?.pageInfo?.hasNextPage) {
      setFilters((prev) => ({
        ...prev,
        customerAccessToken: user?.token_id,
        first: 10,
        last: null,
        after: customerData?.customer?.orders?.pageInfo?.endCursor,
        before: null,
      }));
    }
  };

  const handlePrevPage = () => {
    if (customerData?.customer?.orders?.pageInfo?.hasPreviousPage) {
      setFilters((prev) => ({
        ...prev,
        customerAccessToken: user?.token_id,
        first: null,
        last: 10,
        after: null,
        before: customerData?.customer?.orders?.pageInfo?.startCursor,
      }));
    }
  };
  return (
    <div className="relative h-full font-poppins px-4 py-2">
      <div className="flex items-center justify-between">
        <div className=" text-text text-xl font-semibold">
          {props?.selectViewTitle}
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col gap-2 w-full mt-4">
          {' '}
          <Skeleton className=" h-60 w-full object-cover object-center rounded-md " />
          <Skeleton className=" h-2 w-full object-cover mt-4 object-center rounded-md " />
          <div className="  flex items-center w-full justify-center   gap-2 xsm:gap-8 my-2 ">
            <div className=" flex gap-4 items-center ">
              <Skeleton className=" h-8 w-20 object-cover  object-center rounded-md " />
            </div>
            <div className=" flex gap-4 items-center ">
              <Skeleton className=" h-8 w-20 object-cover  object-center rounded-md " />
            </div>
          </div>
        </div>
      ) : orderData && orderData?.length > 0 ? (
        <>
          <div className="rounded-md border border-border  mt-4">
            <ScrollArea className="w-full ">
              <ScrollBar orientation="horizontal"></ScrollBar>
              <Table>
                <TableHeader className="bg-secondary/80">
                  {table?.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table?.getRowModel()?.rows?.length ? (
                    table?.getRowModel()?.rows?.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className=" text-center"
                      >
                        <div className="flex flex-col my-auto h-full items-center justify-center">
                          <Image src={Current} alt="/" />
                          <p className="text-center text-gray-300 text-md my-2 px-6">
                            No Data
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
          <hr className="mt-4" />

          <div className="  flex items-center w-full justify-center   gap-2 xsm:gap-8 my-2 ">
            <div className=" flex gap-4 items-center ">
              <Button
                variant="outline"
                className="h-9 flex  gap-2  w-max p-2 text-base rounded-lg"
                onClick={() => handlePrevPage()}
                disabled={
                  customerData?.customer?.orders?.pageInfo?.hasPreviousPage
                    ? false
                    : true
                }
              >
                <ArrowLeft className="h-4 w-4" />
                <span className=" ">Previous</span>
              </Button>
            </div>
            <div className=" flex gap-4 items-center ">
              <Button
                variant="outline"
                className="h-9 flex  gap-2 w-max p-2 text-base rounded-lg"
                onClick={() => handleNextPage()}
                disabled={
                  customerData?.customer?.orders?.pageInfo?.hasNextPage
                    ? false
                    : true
                }
              >
                <span className=" ">Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col my-auto h-3/4 items-center justify-center rounded-lg border border-border mt-4">
          <Image src={Current} alt="/" />
          <p className="text-center text-gray-300 text-md my-2 px-6">
            No Data Found!
          </p>
        </div>
      )}

      {/* <OrdersDataByIdTable filters={filters} setFilters={setFilters} /> */}
    </div>
  );
};

export default AccountOrders;
