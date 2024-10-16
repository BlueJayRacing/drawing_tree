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


const colorMap = {
  // Owner colors - softer gradient with varying intensities
  aziegle6: '#1D19AC',
  znepomu1: '#E21B4D',
  awong69: '#FCEEE0',
  shwang43: '#E6E1EF',
  tstanle9: '#E1ECF7',
  apivova1: '#D9EDE7',
  mdierki1: '#F7E4E2',
  wfortne1: '#30AA49',
  gmatth16: '#DCE8F2',
  ebutton1: '#DBF0E6',
  vherna18: '#FCF3D9',
  dbankos1: '#F9E4D9',
  rcain9: '#D6EAF8',
  jwang519: '#D1F2EB',
  cweng8: '#FADBD8',
  eouyang3: '#E8DAEF',
  ktayl126: '#FFC0CB',
  jmolony1: '#C834ED',
  cpak14: '#FCF3CF',
  hfounta2: '#FAE5D3',
  abhojwa1: '#014d4e',
  kshull3: '#D0ECE7',
  ychen428: '#F5B7B1',
  slihn1: '#875C74',
  snoured1: '#A9CCE3',
  tchen128: '#A2D9CE',
  mradwan1: '#F9E79F',
  lboieri1: '#F5CBA7',
  ali85: '#AED6F1',

  // Status colors - softer shades
  'Not Started': '#FFCCCB',
  'Incomplete': '#FFE5B4',
  'In Review': '#ADD8E6',
  'Complete': '#90EE90',
  'N/A': '#E0E0E0',

  // COTS colors - softer shades
  'CUST': '#B0E0E6',
  'COTS': '#FFDAB9',
  'MODCOTS': '#FFFACD',

  // DocType colors - softer shades
  'M': '#98FB98',
  'J': '#AFEEEE',
  'E': '#B0E0E6',
  'T': '#98FB98',
};

// const ColoredStatusCell = ({ value }) => {
//   if (!value) return null;

//   const cellValue = value.value || value;
//   const backgroundColor = colorMap[cellValue] || '#DDDDDD';
  
//   // Determine text color based on background brightness
//   const rgb = backgroundColor.match(/\w\w/g)?.map(x => parseInt(x, 16)) || [0, 0, 0];
//   const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
//   const textColor = brightness > 125 ? '#000000' : '#FFFFFF';

//   return (
//     <div style={{
//       backgroundColor,
//       color: textColor,
//       padding: '4px 8px',
//       borderRadius: '4px',
//       display: 'inline-block',
//     }}>
//       {cellValue}
//     </div>
//   );
// };
const ColoredStatusCell = ({ value }) => {
  if (!value) return null;

  const cellValue = value.value || value;
  const isAwong69 = cellValue === 'awong69';
  const backgroundColor = isAwong69 ? 'transparent' : (colorMap[cellValue] || '#F0F0F0');
  
  // Determine text color based on background brightness
  const rgb = backgroundColor.match(/\w\w/g)?.map(x => parseInt(x, 16)) || [0, 0, 0];
  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  const textColor = brightness > 186 ? '#000000' : '#FFFFFF';

  const style: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'inline-block',
    border: '1px solid #D0D0D0',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div style={style}>
      {isAwong69 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            animation: 'rainbow 10s linear 1s infinite',
            zIndex: 0,
          }}
        />
      )}
      <span style={{ position: 'relative', zIndex: 1 }}>{cellValue}</span>
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
    Cell: ({ cell }) => <ColoredStatusCell value={cell.getValue()} />,
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
    Cell: ({ cell }) => <ColoredStatusCell value={cell.getValue()} />,
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
    Cell: ({ cell }) => <ColoredStatusCell value={cell.getValue()} />,
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
    Cell: ({ cell }) => <ColoredStatusCell value={cell.getValue()} />,
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
    Cell: ({ cell }) => <ColoredStatusCell value={cell.getValue()} />,
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
    Cell: ({ cell }) => <ColoredStatusCell value={cell.getValue()} />,
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
    Cell: ({ cell }) => <ColoredStatusCell value={cell.getValue()} />,
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
    Cell: ({ cell }) => <ColoredStatusCell value={cell.getValue()} />,
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
  {
    accessorKey: 'Weight(lbs)',
    header: 'Weight (lbs)',
    Edit: ({ cell, table }) => <EditNumberInput cell={cell} table={table} handleSaveCell={handleSaveCell} precision={3} />,
  },
  {
    accessorKey: 'Assy Weight (lbs)',
    header: 'Assy Weight (lbs)',
    Edit: ({ cell, table }) => <EditNumberInput cell={cell} table={table} handleSaveCell={handleSaveCell} precision={3} />,
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