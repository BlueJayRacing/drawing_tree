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

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditSelect = ({ cell, table, options, handleSaveCell }) => (
  <Select
    data={options}
    defaultValue={cell.getValue()?.value || cell.getValue()}
    onChange={(value) => {
      handleSaveCell(cell, value);
    }}
    styles={{ input: { border: 'none' } }}
  />
);

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

const IndentedFileName = React.memo(({ value }: { value: string }) => {
  let indentLevel = 0;
  let fileName = value;

  if (value?.startsWith('....................')) {
    indentLevel = 3;
    fileName = value.slice(20);
  } else if (value?.startsWith('..........')) {
    indentLevel = 2;
    fileName = value.slice(10);
  } else if (value?.startsWith('.')) {
    indentLevel = 1;
    fileName = value?.slice(1);
  }

  return (
    <div style={{ 
      paddingLeft: `${indentLevel * 20}px`,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }}>
      {fileName}
    </div>
  );
});

const ConditionalFormattedCell = ({cell}) => {
  const value = cell.getValue();
  const [numerator, denominator] = value.split('/').map(Number);
  
  let backgroundColor = 'transparent';
  if (denominator === 0) {
    backgroundColor = 'transparent';
  } else if (numerator === denominator) {
    backgroundColor = 'rgba(0, 255, 0, 0.2)'; // Light green
  } else if (numerator < denominator) {
    backgroundColor = 'rgba(255, 0, 0, 0.2)'; // Light red
  } 

  return (
    <div style={{ 
      backgroundColor, 
      padding: '8px', 
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }}>
      {value}
    </div>
  );
};

const ColoredStatusCell = ({ value }) => {
  if (!value) return null;

  return (
    <div style={{
      backgroundColor: value.color,
      color: '#000000',
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'inline-block',
    }}>
      {value.value}
    </div>
  );
};


//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getColumns = (handleSaveCell: (cell: MRT_Cell<TableRow>, value: any) => void): MRT_ColumnDef<TableRow>[] => [
  {
    accessorKey: 'FileName',
    header: 'File Name',
    Cell: ({ cell }) => <IndentedFileName value={cell.getValue<string>()} />,
    enableEditing: false,
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
    accessorKey: 'Vendor',
    header: 'Vendor',
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
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
    accessorKey: 'Condition',
    header: 'Condition',
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
    accessorKey: 'QTY Backups',
    header: 'QTY Backups',
    Edit: ({ cell, table }) => <EditNumberInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'Model',
    header: 'Model',
    Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    Edit: ({ cell, table }) => <EditSelect cell={cell} table={table} options={modelOptions} handleSaveCell={handleSaveCell} />,
    filterVariant: 'multi-select',
    mantineFilterMultiSelectProps: {
      data: modelOptions,
    },
    filterFn: (row, id, filterValues) => {
      if (!filterValues.length) return true;
      const cellValue = row.getValue(id)?.value ?? row.getValue(id);
      return filterValues.includes(cellValue);
    },
  },
  {
    accessorKey: 'Analysis',
    header: 'Analysis',
    Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    Edit: ({ cell, table }) => <EditSelect cell={cell} table={table} options={analysisOptions} handleSaveCell={handleSaveCell} />,
    filterVariant: 'multi-select',
    mantineFilterMultiSelectProps: {
      data: analysisOptions,
    },
    filterFn: (row, id, filterValues) => {
      if (!filterValues.length) return true;
      const cellValue = row.getValue(id)?.value ?? row.getValue(id);
      return filterValues.includes(cellValue);
    },
  },
  {
    accessorKey: 'Drawing',
    header: 'Drawing',
    Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    Edit: ({ cell, table }) => <EditSelect cell={cell} table={table} options={drawingOptions} handleSaveCell={handleSaveCell} />,
    filterVariant: 'multi-select',
    mantineFilterMultiSelectProps: {
      data: drawingOptions,
    },
    filterFn: (row, id, filterValues) => {
      if (!filterValues.length) return true;
      const cellValue = row.getValue(id)?.value ?? row.getValue(id);
      return filterValues.includes(cellValue);
    },
  },
  {
    accessorKey: 'PDF',
    header: 'PDF',
    Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    Edit: ({ cell, table }) => <EditSelect cell={cell} table={table} options={pdfOptions} handleSaveCell={handleSaveCell} />,
    filterVariant: 'multi-select',
    mantineFilterMultiSelectProps: {
      data: pdfOptions,
    },
    filterFn: (row, id, filterValues) => {
      if (!filterValues.length) return true;
      const cellValue = row.getValue(id)?.value ?? row.getValue(id);
      return filterValues.includes(cellValue);
    },
  },
  {
    accessorKey: 'DXF',
    header: 'DXF',
    Cell: ({ cell }) => <StatusCell value={cell.getValue()} />,
    Edit: ({ cell, table }) => <EditSelect cell={cell} table={table} options={dxfOptions} handleSaveCell={handleSaveCell} />,
    filterVariant: 'multi-select',
    mantineFilterMultiSelectProps: {
      data: dxfOptions,
    },
    filterFn: (row, id, filterValues) => {
      if (!filterValues.length) return true;
      const cellValue = row.getValue(id)?.value ?? row.getValue(id);
      return filterValues.includes(cellValue);
    },
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
  // Removed inSubsystem, inAssy, inIndex, and Division columns
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
    Cell: ({ cell }) => <ConditionalFormattedCell cell={cell} />,
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'QTYcomplete-A02',
    header: 'QTY Complete A02',
    Cell: ({ cell }) => <ConditionalFormattedCell cell={cell} />,
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'QTYcomplete-A03',
    header: 'QTY Complete A03',
    Cell: ({ cell }) => <ConditionalFormattedCell cell={cell} />,
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
  {
    accessorKey: 'QTYcomplete-A04',
    header: 'QTY Complete A04',
    Cell: ({ cell }) => <ConditionalFormattedCell cell={cell} />,
    Edit: ({ cell, table }) => <EditTextInput cell={cell} table={table} handleSaveCell={handleSaveCell} />,
  },
];