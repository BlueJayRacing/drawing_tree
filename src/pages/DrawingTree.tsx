import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Title, Flex, Button } from '@mantine/core';
import { MantineReactTable, useMantineReactTable, MRT_Row, MRT_Cell } from 'mantine-react-table';
import { useCreateRow, useGetRows, useUpdateRow, useDeleteRow } from "../services/apiHooks";
import { IconTrash } from '@tabler/icons-react';
import { Tooltip, ActionIcon } from '@mantine/core';
import { modals } from '@mantine/modals';
import { TableRow } from "../types/types";
import { getColumns } from '../components/columns';
import { CreatePartModal } from '../components/CreatePartModal';
import { CreateAssemblyModal } from '../components/CreateAssemblyModal';

const prepareRowForPatch = (row: TableRow): Partial<TableRow> => {
  const patchableFields = [
    'Car', 'DocType', 'COTSnum', 'COTS', 'Revision', 'Material', 'Owner',
    'TotalQTY', 'Model', 'Analysis', 'Drawing', 'PDF', 'DXF', 'Drawing Rev',
    'Order Date', 'QTYcomplete-A01', 'QTYcomplete-A02', 'QTYcomplete-A03',
    'QTYcomplete-A04', 'inSubsystem', 'inAssy', 'inIndex', 'Division', 'Name',
    'Weight', 'Condition', 'hideRow', 'Vendor', 'QTYonCar', 'AssyWeight', 'id'
  ];

  const patchableRow: Partial<TableRow> = {};

  patchableFields.forEach(field => {
    if (field in row) {
      let value = row[field as keyof TableRow];
      
      // Convert string numbers to actual numbers
      if (['TotalQTY', 'inSubsystem', 'inAssy', 'inIndex', 'Division', 'QTYonCar'].includes(field)) {
        value = Number(value);
      }
      
      // Rename fields
      if (field === 'QTY On-car') {
        patchableRow['TotalQTY'] = Number(value);
      } else if (field === 'Weight(lbs)') {
        patchableRow['Weight'] = value;
      } else if (field === 'Assy Weight (lbs)') {
        patchableRow['AssyWeight'] = value;
      } else if (field === 'QTY Backups') {
        patchableRow['QTYonCar'] = Number(value);
      } else {
        patchableRow[field as keyof TableRow] = value;
      }

      // Convert Multiselect to value
      if (['Analysis', 'COTS', 'DXF', 'Drawing', 'Model', 'PDF', 'Owner', 'DocType'].includes(field)) {
        patchableRow[field as keyof TableRow] = value?.value;
      }
    }
  });

  return patchableRow;
};

const DrawingTree: React.FC = () => {
  const { vehicle = '21xt' } = useParams<{ vehicle: string }>();
  const tableId = vehicle === '20xt' ? 166656 : 305618;
  
  const [isCreatePartModalOpen, setIsCreatePartModalOpen] = useState(false);
  const [isCreateAssemblyModalOpen, setIsCreateAssemblyModalOpen] = useState(false);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [changedRows, setChangedRows] = useState<Set<number>>(new Set());

  const { mutateAsync: createRow } = useCreateRow(tableId, vehicle);
  const {
    data: fetchedRows = [],
    isError: isLoadingRowsError,
    isFetching: isFetchingRows,
    isLoading: isLoadingRows,
  } = useGetRows(tableId, vehicle);
  const { mutateAsync: updateRow } = useUpdateRow(tableId, vehicle);
  const { mutateAsync: deleteRow } = useDeleteRow(tableId, vehicle);

  useEffect(() => {
    setTableData(fetchedRows);
  }, [fetchedRows]);

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveCell = useCallback((cell: MRT_Cell<TableRow>, value: any) => {
    setTableData((prev) => {
      const newData = [...prev];
      newData[cell.row.index][cell.column.id as keyof TableRow] = value;
      return newData;
    });
    setChangedRows((prev) => new Set(prev.add(cell.row.original.id)));
  }, []);

  const columns = useMemo(() => getColumns(handleSaveCell), [handleSaveCell]);

  const handleSaveAllChanges = useCallback(async () => {
    try {
      const updatePromises = Array.from(changedRows).map(id => {
        const row = tableData.find(r => r.id === id);
        if (row) {
          const patchableRow = prepareRowForPatch(row);
          return updateRow(patchableRow);
        }
        return Promise.resolve();
      });
      await Promise.all(updatePromises);
  
      setChangedRows(new Set());
  
      modals.openConfirmModal({
        title: 'Changes saved',
        children: <p>All changes have been successfully saved to Baserow.</p>,
        labels: { confirm: 'OK' },
        onConfirm: () => {},
      });
    } catch (error) {
      console.error('Error saving changes:', error);
      modals.openConfirmModal({
        title: 'Error',
        children: <p>An error occurred while saving changes. Please try again.</p>,
        labels: { confirm: 'OK' },
        onConfirm: () => {},
      });
    }
  }, [changedRows, tableData, updateRow]);

  const openDeleteConfirmModal = (row: MRT_Row<TableRow>) =>
    modals.openConfirmModal({
      title: 'Are you sure you want to delete this row?',
      children: (
        <p>Are you sure you want to delete {row.original.Name}? This action cannot be undone.</p>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await deleteRow(row.original.id);
        setTableData((prev) => prev.filter((item) => item.id !== row.original.id));
      },
    });

  const openCreateAssemblyConfirmModal = () =>
    modals.openConfirmModal({
      title: 'Confirm Assembly Creation',
      children: (
        <p>Are you sure you want to create a new assembly? This action should only be performed by authorized users.</p>
      ),
      labels: { confirm: 'Yes, Create Assembly', cancel: 'Cancel' },
      onConfirm: () => setIsCreateAssemblyModalOpen(true),
    });

  const table = useMantineReactTable<TableRow>({
    columns: columns,
    data: tableData,
    enablePagination: false,
    enableBottomToolbar: false,
    enableRowActions: true,
    enableEditing: true,
    editDisplayMode: 'cell',
    renderRowActions: ({ row }) => (
      <Flex gap="md">
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
        maxHeight: '75vh'
      },
    },
    enableColumnResizing: true,
    memoMode: 'cells',
    enableStickyHeader: true,
  });

  return (
    <Stack>
      <Title order={4}>{vehicle.toUpperCase()} Drawing Tree</Title>
      <MantineReactTable table={table} />
      <Flex justify="flex-end" style={{ position: 'sticky', bottom: 0, backgroundColor: 'white', padding: '16px' }}>
        <Button onClick={() => setIsCreatePartModalOpen(true)} variant="filled">
          Create Part
        </Button>
        <Button onClick={openCreateAssemblyConfirmModal} variant="filled" ml="md">
          Create Assembly
        </Button>
        <Button 
          onClick={handleSaveAllChanges} 
          variant="filled" 
          ml="md" 
          color="green"
          disabled={changedRows.size === 0}
        >
          Save Changes
        </Button>
      </Flex>
      <CreatePartModal
        isOpen={isCreatePartModalOpen}
        onClose={() => setIsCreatePartModalOpen(false)}
        onCreatePart={async (part) => {
          const newPart = await createRow(part);
          setTableData((prev) => [...prev, newPart]);
        }}
        vehicle={vehicle}
        fetchedRows={tableData}
      />
      <CreateAssemblyModal
        isOpen={isCreateAssemblyModalOpen}
        onClose={() => setIsCreateAssemblyModalOpen(false)}
        onCreateAssembly={async (assembly) => {
          const newAssembly = await createRow(assembly);
          setTableData((prev) => [...prev, newAssembly]);
        }}
        vehicle={vehicle}
        fetchedRows={tableData}
      />
    </Stack>
  );
};

export default DrawingTree;