// columns.tsx

import React from 'react';
import { MRT_ColumnDef, MRT_Cell } from 'mantine-react-table';
import { Select, TextInput, NumberInput } from '@mantine/core';
import { StatusCell } from './StatusCell';
import type { TableRow } from '../types/types';
import { DateInput } from '@mantine/dates';
import { 
  docTypeOptions, 
  cotsOptions, 
  modelOptions, 
  analysisOptions, 
  drawingOptions, 
  pdfOptions, 
  dxfOptions 
} from '../data/dropdownData';
import { ownerOptions } from '../data/ownerData';

// Memoized wrapper components
const EditTextInput = React.memo(({ cell, table, handleSaveCell }) => (
  <TextInput
    defaultValue={cell.getValue()}
    onChange={(e) => handleSaveCell(cell, e.target.value)}
    onBlur={() => table.setEditingCell(null)}
    styles={{ input: { border: 'none' } }}
  />
));

const EditNumberInput = React.memo(({ cell, table, handleSaveCell, precision = 0 }) => (
  <NumberInput
    defaultValue={cell.getValue()}
    onChange={(value) => handleSaveCell(cell, value)}
    onBlur={() => table.setEditingCell(null)}
    precision={precision}
    styles={{ input: { border: 'none' } }}
  />
));

const EditSelect = React.memo(({ cell, table, options, handleSaveCell }) => (
  <Select
    data={options}
    defaultValue={cell.getValue()?.value}
    onChange={(value) => {
      handleSaveCell(cell, value);
      table.setEditingCell(null);
    }}
    styles={{ input: { border: 'none' } }}
  />
));

const EditDateInput = React.memo(({ cell, table, handleSaveCell }) => (
  <DateInput
    value={cell.getValue() ? new Date(cell.getValue()) : null}
    onChange={(value) => {
      const dateString = value?.toISOString().split('T')[0];
      handleSaveCell(cell, dateString);
      table.setEditingCell(null);
    }}
    styles={{ input: { border: 'none' } }}
  />
));


//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getColumns = (handleSaveCell: (cell: MRT_Cell<TableRow>, value: any) => void): MRT_ColumnDef<TableRow>[] => [
  {
    accessorKey: 'FileName',
    header: 'File Name',
    enableEditing: false,
    size: 450,
  },
  {
    accessorKey: 'PartNum',
    header: 'Part Number',
    enableEditing: false,
  },
  {
    accessorKey: 'Name',
    header: 'Name',
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'DocType',
    header: 'Doc Type',
    Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    Edit: ({ cell, table }) => <EditSelect cell={cell} table={table} options={docTypeOptions} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'COTSnum',
    header: 'COTS Num',
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'COTS',
    header: 'COTS',
    Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    Edit: ({ cell, table }) => <EditSelect cell={cell} table={table} options={cotsOptions} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'Revision',
    header: 'Revision',
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'Material',
    header: 'Material',
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'Owner',
    header: 'Owner',
    Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    Edit: ({ cell, table }) => <EditSelect cell={cell} table={table} options={ownerOptions} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'QTY On-car',
    header: 'QTY On-car',
    Edit: ({ cell, table }) => <EditNumberInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'Model',
    header: 'Model',
    Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    Edit: ({ cell, table }) => <EditSelect cell={cell} table={table} options={modelOptions} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'Analysis',
    header: 'Analysis',
    Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    Edit: ({ cell, table }) => <EditSelect cell={cell} table={table} options={analysisOptions} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'Drawing',
    header: 'Drawing',
    Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    Edit: ({ cell, table }) => <EditSelect cell={cell} table={table} options={drawingOptions} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'PDF',
    header: 'PDF',
    Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    Edit: ({ cell, table }) => <EditSelect cell={cell} table={table} options={pdfOptions} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'DXF',
    header: 'DXF',
    Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    Edit: ({ cell, table }) => <EditSelect cell={cell} table={table} options={dxfOptions} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'Drawing Rev',
    header: 'Drawing Rev',
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'Order Date',
    header: 'Order Date',
    Edit: ({ cell, table }) => <EditDateInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'inSubsystem',
    header: 'In Subsystem',
    Edit: ({ cell, table }) => <EditNumberInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'inAssy',
    header: 'In Assy',
    Edit: ({ cell, table }) => <EditNumberInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'inIndex',
    header: 'In Index',
    Edit: ({ cell, table }) => <EditNumberInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'Division',
    header: 'Division',
    Edit: ({ cell, table }) => <EditNumberInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'Weight(lbs)',
    header: 'Weight (lbs)',
    Edit: ({ cell, table }) => <EditNumberInput cell={cell} table={table} handleSaveCell={handleSaveCell} precision={2} />,
  },
  {
    accessorKey: 'Assy Weight (lbs)',
    header: 'Assy Weight (lbs)',
    Edit: ({ cell, table }) => <EditNumberInput cell={cell} table={table} handleSaveCell={handleSaveCell} precision={2} />,
  },
  {
    accessorKey: 'QTYcomplete-A01',
    header: 'QTY Complete A01',
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'QTYcomplete-A02',
    header: 'QTY Complete A02',
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'QTYcomplete-A03',
    header: 'QTY Complete A03',
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'QTYcomplete-A04',
    header: 'QTY Complete A04',
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'Condition',
    header: 'Condition',
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'Vendor',
    header: 'Vendor',
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'QTY Backups',
    header: 'QTY Backups',
    Edit: ({ cell, table }) => <EditNumberInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
];