import { useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { Button } from '~/components/ui/button';
import { RootState } from '~/store/store';
import OrdersDataByIdTable from './order-table';
import Image from 'next/image';
import Current from '~/public/assets/not-current-entrie.png';
import { useQuery } from '@apollo/client';
import { orderAccountMutation } from '~/server/lib/shopify/mutations/auth';
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
type AccountOrdersType = {
  selectedMenu: string;
  selectViewTitle: string | undefined;
  refetch: () => unknown;
};
const AccountOrders = (props: AccountOrdersType) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { user } = useSelector((state: RootState) => state.auth);
  console.log({ props }, 'props data orders');
  const [filters, setFilters] = useState({
    customerAccessToken: user?.token_id,
    first: 20,
    last: null,
    after: null,
    before: null,
    price: null,
  });
  const {
    error,
    data: customerData,
    loading,
    refetch,
  } = useQuery(orderAccountMutation, {
    variables: { customerAccessToken: user?.token_id },
  });
  const orderData = useMemo(() => {
    return Array.isArray(customerData?.customer?.orders?.edges)
      ? removeEdgesAndNodes(customerData?.customer?.orders)
      : [];
  }, [customerData?.customer?.orders]);
  console.log(orderData, 'order table ');
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
      accessorKey: 'Discount',
      header: 'Discount',
      cell: ({ row }) => (
        <div className="capitalize text-ellipsis whitespace-nowrap ">
          {' AED'}
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
  return (
    <div className="relative h-full font-poppins px-4 py-2">
      <div className="flex items-center justify-between">
        <div className=" text-text text-xl font-semibold">
          {props?.selectViewTitle}
        </div>
      </div>
      {loading ? (
        <></>
      ) : orderData && orderData?.length > 0 ? (
        <div className="rounded-md border border-border">
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
      ) : (
        <div className="flex flex-col my-auto h-full items-center justify-center rounded-lg border border-border mt-4">
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
