import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Title, Flex, Button } from '@mantine/core';
import { MantineReactTable, useMantineReactTable, MRT_Row } from 'mantine-react-table';
import { useCreateRow, useGetRows, useUpdateRow, useDeleteRow } from "../services/apiHooks";
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Tooltip, ActionIcon } from '@mantine/core';
import { modals } from '@mantine/modals';
import { TableRow } from "../types/types";
import { columns } from '../components/columns';
import { CreatePartModal } from '../components/CreatePartModal';
import { CreateAssemblyModal } from '../components/CreateAssemblyModal';
import { EditRowModal } from '../components/EditRowModal';

const DrawingTree: React.FC = () => {
  const { vehicle = '21xt' } = useParams<{ vehicle: string }>();
  const tableId = vehicle === '20xt' ? 166656 : 305618;
  
  const [isCreatePartModalOpen, setIsCreatePartModalOpen] = useState(false);
  const [isCreateAssemblyModalOpen, setIsCreateAssemblyModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<MRT_Row<TableRow> | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutateAsync: createRow, isPending: isCreatingRow } = useCreateRow(tableId, vehicle);
  const {
    data: fetchedRows = [],
    isError: isLoadingRowsError,
    isFetching: isFetchingRows,
    isLoading: isLoadingRows,
  } = useGetRows(tableId, vehicle);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutateAsync: updateRow, isPending: isUpdatingRow } = useUpdateRow(tableId, vehicle);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutateAsync: deleteRow, isPending: isDeletingRow } = useDeleteRow(tableId, vehicle);

  const openDeleteConfirmModal = (row: MRT_Row<TableRow>) =>
    modals.openConfirmModal({
      title: 'Are you sure you want to delete this row?',
      children: (
        <p>Are you sure you want to delete {row.original.Name}? This action cannot be undone.</p>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteRow(row.original.id),
    });

  const table = useMantineReactTable<TableRow>({
    columns,
    data: fetchedRows,
    enablePagination: false,
    enableBottomToolbar: false,
    enableEditing: true,
    renderRowActions: ({ row }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon onClick={() => setEditingRow(row)}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    state: {
      isLoading: isLoadingRows,
      showProgressBars: isFetchingRows,
      showAlertBanner: isLoadingRowsError,
    },
    mantineToolbarAlertBannerProps: isLoadingRowsError
      ? {
          color: 'red',
          children: 'Error loading data',
        }
      : undefined,
    mantineTableContainerProps: {
      style: {
        minHeight: '500px',
      },
    },
  });

  return (
    <Stack>
      <Title order={4}>{vehicle.toUpperCase()} Drawing Tree</Title>
      <MantineReactTable table={table} />
      <Flex justify="flex-end" style={{ position: 'sticky', bottom: 0, backgroundColor: 'white', padding: '16px' }}>
        <Button onClick={() => setIsCreatePartModalOpen(true)} variant="filled">
          Create Part
        </Button>
        <Button onClick={() => setIsCreateAssemblyModalOpen(true)} variant="filled" ml="md">
          Create Assembly
        </Button>
      </Flex>
      <CreatePartModal
        isOpen={isCreatePartModalOpen}
        onClose={() => setIsCreatePartModalOpen(false)}
        onCreatePart={createRow}
        vehicle={vehicle}
        fetchedRows={fetchedRows}
      />
      <CreateAssemblyModal
        isOpen={isCreateAssemblyModalOpen}
        onClose={() => setIsCreateAssemblyModalOpen(false)}
        onCreateAssembly={createRow}
        vehicle={vehicle}
        fetchedRows={fetchedRows}
      />
      {editingRow && (
        <EditRowModal
          isOpen={!!editingRow}
          onClose={() => setEditingRow(null)}
          onSave={updateRow}
          row={editingRow.original}
        />
      )}
    </Stack>
  );
};

export default DrawingTree;