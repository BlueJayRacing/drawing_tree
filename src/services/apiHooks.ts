import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TableRow } from '../types/types';
import { getRows, createRow, updateRow, deleteRow } from './apiService';

// READ hook (get table rows from api)
export function useGetRows(tableId: number, vehicle: string) {
  return useQuery<TableRow[]>({
    queryKey: ['rows', tableId, vehicle],
    queryFn: () => getRows(tableId, vehicle),
    refetchOnWindowFocus: false,
  });
}

// CREATE hook (post new table row to api)
export function useCreateRow(tableId: number, vehicle: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (row: TableRow) => createRow(tableId, row, vehicle),
    onMutate: (newRow: TableRow) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['rows', tableId, vehicle], (prevRows: any) => [
        ...prevRows,
        {
          ...newRow,
          id: Date.now(), // Generate a temporary ID for optimistic update
        },
      ]);
    },
    onSettled: () =>
      queryClient.invalidateQueries(['rows', tableId, vehicle]),
  });
}

// UPDATE hook (put table row in api)
export function useUpdateRow(tableId: number, vehicle: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (row: TableRow) => {
      // Create a new object without the 'id' field
      const { id, ...rowWithoutId } = row;
      return updateRow(tableId, id, rowWithoutId, vehicle);
    },
    onMutate: (updatedRow: TableRow) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['rows', tableId, vehicle], (prevRows: any) =>
        prevRows?.map((prevRow: TableRow) =>
          prevRow.id === updatedRow.id ? updatedRow : prevRow
        )
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries(['rows', tableId, vehicle]),
  });
}

// DELETE hook (delete table row in api)
export function useDeleteRow(tableId: number, vehicle: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rowId: number) => deleteRow(tableId, rowId, vehicle),
    onMutate: (rowId: number) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['rows', tableId, vehicle], (prevRows: any) =>
        prevRows?.filter((row: TableRow) => row.id !== rowId)
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries(['rows', tableId, vehicle]),
  });
}