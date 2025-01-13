import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Title, Flex, Button } from '@mantine/core';
import { MantineReactTable, useMantineReactTable, MRT_Row, MRT_Cell } from 'mantine-react-table';
import { useCreateRow, useGetRows, useUpdateRow, useDeleteRow } from "../services/apiHooks";
import { IconTrash } from '@tabler/icons-react';
import { Tooltip, ActionIcon, Switch, Container } from '@mantine/core';
import { modals } from '@mantine/modals';
import { TableRow } from "../types/types";
import { getColumns } from '../components/columns';
import { CreatePartModal } from '../components/CreatePartModal';
import { CreateAssemblyModal } from '../components/CreateAssemblyModal';
import { calculateAssemblyWeights } from '../utils/weightCalculations';

const getTableStyles = () => ({
  // Add custom styles for pinned columns
  '.mrtTableCell[dataSticky="true"]': {
    position: 'sticky',
    zIndex: 2,
    backgroundColor: 'var(--mantine-color-body)',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'inherit',
      zIndex: -1
    }
  },
  
  // Override hover effects
  'tr:hover td[dataSticky="true"]': {
    backgroundColor: 'var(--mantine-color-body)',
    '&::after': {
      backgroundColor: 'var(--mantine-color-gray-1)'
    }
  },

  // Handle selected rows
  'tr[dataSelected="true"] td[dataSticky="true"]': {
    backgroundColor: 'var(--mantine-color-body)',
    '&::after': {
      backgroundColor: 'var(--mantine-primary-color-light)'
    }
  },

  // Ensure proper layering
  '.mrtTableBody': {
    position: 'relative',
    zIndex: 1
  }
});

const DetectRerenders = ({ children }) => {
  // console.log('Component rendered');

  React.useEffect(() => {
    // console.log('Component mounted or updated');
    // return () => console.log('Component will unmount');
  });

  return <>{children}</>;
};


const RainbowStyle = () => (
  <style>
    {`
      @keyframes rainbow {
        0%, 100% { 
          background: linear-gradient(90deg, 
            #ff0000 0%, #ff0000 90%, 
            #00aa00 90%, #00aa00 100%, 
            #ff0000 100%, #ff0000 190%);
        }
        10% { 
          background: linear-gradient(90deg, 
            #ff0000 0%, #ff0000 80%, 
            #00aa00 80%, #00aa00 90%, 
            #008800 90%, #008800 100%, 
            #ff0000 100%, #ff0000 180%);
        }
        20% { 
          background: linear-gradient(90deg, 
            #ff0000 0%, #ff0000 70%, 
            #00aa00 70%, #00aa00 80%, 
            #008800 80%, #008800 90%,
            #006600 90%, #006600 100%, 
            #ff0000 100%, #ff0000 170%);
        }
        30% { 
          background: linear-gradient(90deg, 
            #ff0000 0%, #ff0000 60%, 
            #00aa00 60%, #00aa00 70%, 
            #008800 70%, #008800 80%,
            #006600 80%, #006600 90%,
            #004400 90%, #004400 100%, 
            #ff0000 100%, #ff0000 160%);
        }
        40% { 
          background: linear-gradient(90deg, 
            #ff0000 0%, #ff0000 50%, 
            #00aa00 50%, #00aa00 60%, 
            #008800 60%, #008800 70%,
            #006600 70%, #006600 80%,
            #004400 80%, #004400 90%,
            #002200 90%, #002200 100%, 
            #ff0000 100%, #ff0000 150%);
        }
        50% { 
          background: linear-gradient(90deg, 
            #ff0000 0%, #ff0000 40%, 
            #00ff00 40%, #00ff00 50%, 
            #00dd00 50%, #00dd00 60%,
            #00bb00 60%, #00bb00 70%,
            #009900 70%, #009900 80%,
            #007700 80%, #007700 90%,
            #005500 90%, #005500 100%, 
            #ff0000 100%, #ff0000 140%);
        }
        60%, 70%, 80%, 90% { 
          background: linear-gradient(90deg, 
            #ff0000 0%, #ff0000 30%, 
            #ffff00 30%, #ffff00 40%, 
            #00ff00 40%, #00ff00 50%, 
            #00dd00 50%, #00dd00 60%,
            #00bb00 60%, #00bb00 70%,
            #009900 70%, #009900 80%,
            #007700 80%, #007700 90%,
            #005500 90%, #005500 100%, 
            #ff0000 100%, #ff0000 130%);
        }
      }
    `}
  </style>
);

const prepareRowForPatch = (row: TableRow): Partial<TableRow> => {
  const patchableFields = [
    'Car', 'DocType', 'COTSnum', 'COTS', 'Revision', 'Material', 'Owner',
    'TotalQTY', 'Model', 'Analysis', 'Drawing', 'PDF', 'DXF', 'Drawing Rev',
    'Order Date', 'QTYcomplete-A01', 'QTYcomplete-A02', 'QTYcomplete-A03',
    'QTYcomplete-A04', 'inSubsystem', 'inAssy', 'inIndex', 'Division', 'Name',
    'Weight', 'Condition', 'hideRow', 'Vendor', 'QTYonCar', 'AssyWeight', 'id', 'QTY Backups'
  ];

  const patchableRow: Partial<TableRow> = {};
  
  patchableFields.forEach(field => {
    if (field in row || ['TotalQTY', 'inSubsystem', 'inAssy', 'inIndex', 'Division', 'QTYonCar', "Weight"].includes(field)) {
      let value = row[field as keyof TableRow];
      
      
      // Convert string numbers to actual numbers
      if (['TotalQTY', 'inSubsystem', 'inAssy', 'inIndex', 'Division', 'QTYonCar'].includes(field)) {
        value = Number(value);
      }
      // Rename fields
      if (field === 'QTYonCar') {
        value = row['QTY On-car' as keyof TableRow]
        patchableRow['QTY On-car'] = Number(value);
      } else if (field === 'QTY Backups') {
          console.log(value)
          value = row['QTY Backups' as keyof TableRow]
          patchableRow['QTY Backups'] = Number(value);
      } else if (field === 'Weight') {
        value = row['Weight(lbs)' as keyof TableRow]
        patchableRow['Weight(lbs)'] = Number(Number(value).toFixed(3));
      // } else if (field === 'Assy Weight (lbs)') {
      //   patchableRow['AssyWeight'] = Number(value);
      } else {
        patchableRow[field as keyof TableRow] = value;
      }

      // Handle complex objects (Model, Analysis, Drawing, PDF, DXF)
      // if (['Model', 'Analysis', 'Drawing', 'PDF', 'DXF'].includes(field)) {
      //   if (value && typeof value === 'object' && 'id' in value) {
      //     patchableRow[field as keyof TableRow] = value.id;
      //   } else {
      //     patchableRow[field as keyof TableRow] = value;
      //   }
      // }
      // Convert Multiselect to value
      if (['Analysis', 'COTS', 'DXF', 'Drawing', 'Model', 'PDF', 'Owner', 'DocType'].includes(field)) {
        patchableRow[field as keyof TableRow] = value?.value || value;
      }
    }
  });

  return patchableRow;
};

const getRowColor = (row) => {
  // Main assembly (both inAssy and inIndex are 0)
  if (row.original.inAssy == "0" && row.original.inIndex == "0" && row.original.inSubsystem == "0") {
    return 'rgba(186, 230, 253, 0.4)'; // Light blue for main assembly
  }
  
  // System assemblies (check name for frame, drivetrain, etc)
  if (row.original.inIndex == "0" && row.original.inAssy == "0") {
    const name = row.original.Name.toLowerCase();
    if (name.includes('frame')) {
      return 'rgba(254, 202, 202, 0.4)'; // Light red for frame
    } else if (name.includes('drivetrain')) {
      return 'rgba(172, 167, 252, 0.4)'; // Light yellow for drivetrain
    } else if (name.includes('suspension')) {
      return 'rgba(247, 187, 244, 0.4)'; // Light green for suspension
    } else if (name.includes('controls')) {
      return 'rgba(255, 232, 183, 0.4)'; // Light indigo for controls
    } else if (name.includes('daq')) {
      return 'rgba(254, 240, 138, 0.4)'; // Light pink for DAQ
    }
  }
  
  // Sub-assemblies (inIndex is 0 but inAssy is not)
  if (row.original.inIndex == "0") {
    return 'rgba(221, 241, 225, 0.4)'; // Light green for sub-assemblies
  }
  
  // Default for components
  return 'rgba(248, 250, 252, 0.2)'; // Very light gray for components
};

const DrawingTree: React.FC = () => {
  const { vehicle = '21xt' } = useParams<{ vehicle: string }>();
  const tableId = vehicle === '20xt' ? 166656 : 305618;
  
  const [isCreatePartModalOpen, setIsCreatePartModalOpen] = useState(false);
  const [isCreateAssemblyModalOpen, setIsCreateAssemblyModalOpen] = useState(false);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [changedRows, setChangedRows] = useState<Set<number>>(new Set());
  const [enableVirtualization, setEnableVirtualization] = useState(() => {
    const savedPreference = localStorage.getItem('enableVirtualization');
    return savedPreference !== null ? JSON.parse(savedPreference) : true;
  });

  useEffect(() => {
    localStorage.setItem('enableVirtualization', JSON.stringify(enableVirtualization));
  }, [enableVirtualization]);

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
    if (fetchedRows.length > 0) {
      const rowsWithCalculatedWeights = calculateAssemblyWeights(fetchedRows);
      setTableData(rowsWithCalculatedWeights);
    }
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
    // setIsSaving(true);
    try {
      const updatePromises = Array.from(changedRows).map(id => {
        const row = tableData.find(r => r.id === id);
        if (row) {
          const patchableRow = prepareRowForPatch(row);
        // Remove the calculated weight for assemblies before saving
        if (row.inIndex === 0) {
          delete patchableRow['Assy Weight (lbs)'];
        }
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
    } finally {
      // setIsSaving(false);
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


  const tableStyles = getTableStyles();

  const table = useMantineReactTable<TableRow>({
    columns: columns,
    data: tableData,
    enableColumnPinning: true,
    initialState: { density: 'xs', columnPinning: { left: ['FileName'], right: [] } },
    enablePagination: false,
    enableBottomToolbar: false,
    enableRowActions: true,
    enableEditing: true,
    mantineTableProps: {
      style: tableStyles
    },
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
    mantineTableBodyRowProps: ({ row }) => ({
      style: {
        backgroundColor: getRowColor(row)
      }
    }),
    mantineTableBodyCellProps: ({ row }) => ({
      style: {
        backgroundColor: 'transparent' // Ensure cell background is transparent to show row color
      }
    }),
    enableColumnResizing: true,
    memoMode: 'cells',
    enableStickyHeader: true,
    enableRowVirtualization: enableVirtualization,
    rowVirtualizerOptions: enableVirtualization
    ? {
        overscan: 20,
        estimateSize: () => 50, // Adjust based on your row height
      }
    : undefined,
  });

  return (
    <Container fluid px="xs" style={{ height: '100vh', width:'100vw', display: 'flex', flexDirection: 'column' }}>
    <DetectRerenders>
    <Stack>
      <RainbowStyle />
      <Flex justify="space-between" align="center" mb="md">
        <Title order={4}>{vehicle.toUpperCase()} Drawing Tree</Title>
        <Switch
          label="Enable Row Virtualization"
          checked={enableVirtualization}
          onChange={(event) => setEnableVirtualization(event.currentTarget.checked)}
        />
      </Flex>
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
    </DetectRerenders>
    </Container>
  );
};

export default React.memo(DrawingTree);