// columns.tsx

import { MRT_ColumnDef } from 'mantine-react-table';
import { StatusCell } from './StatusCell';
import type { Part, Assembly } from '../types/types';

export const columns: MRT_ColumnDef<Part | Assembly>[] = [
  {
    accessorKey: 'PartNum',
    header: 'Part Number',
  },
  {
    accessorKey: 'Name',
    header: 'Name',
  },
  // {
  //   accessorKey: 'Car',
  //   header: 'Car',
  // },
  // {
  //   accessorKey: 'Subsystem',
  //   header: 'Subsystem',
  // },
  {
    accessorKey: 'DocType',
    header: 'Doc Type',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Cell: ({ cell, row }) => (
      <StatusCell value={cell.getValue()} />
    ),
  },
  // {
  //   accessorKey: 'Assy',
  //   header: 'Assy',
  // },
  // {
  //   accessorKey: 'Index',
  //   header: 'Index',
  // },
  {
    accessorKey: 'COTSnum',
    header: 'COTS Num',
  },
  {
    accessorKey: 'COTS',
    header: 'COTS',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Cell: ({ cell, row }) => (
      <StatusCell value={cell.getValue()} />
    ),
  },
  {
    accessorKey: 'Revision',
    header: 'Revision',
  },
  {
    accessorKey: 'Material',
    header: 'Material',
  },
  {
    accessorKey: 'Owner',
    header: 'Owner',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Cell: ({ cell, row }) => (
      <StatusCell value={cell.getValue()} />
    ),
  },
  {
    accessorKey: 'QTY On-car',
    header: 'QTY On-car',
  },
  {
    accessorKey: 'Model',
    header: 'Model',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Cell: ({ cell, row }) => (
      <StatusCell value={cell.getValue()} />
    ),
  },
  {
    accessorKey: 'Analysis',
    header: 'Analysis',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Cell: ({ cell, row }) => (
      <StatusCell value={cell.getValue()} />
    ),
  },
  {
    accessorKey: 'Drawing',
    header: 'Drawing',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Cell: ({ cell, row }) => (
      <StatusCell value={cell.getValue()} />
    ),
  },
  {
    accessorKey: 'PDF',
    header: 'PDF',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Cell: ({ cell, row }) => (
      <StatusCell value={cell.getValue()} />
    ),
  },
  {
    accessorKey: 'DXF',
    header: 'DXF',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Cell: ({ cell, row }) => (
      <StatusCell value={cell.getValue()} />
    ),
  },
  {
    accessorKey: 'Drawing Rev',
    header: 'Drawing Rev',
  },
  {
    accessorKey: 'Order Date',
    header: 'Order Date',
  },
  // {
  //   accessorKey: 'inSubsystem',
  //   header: 'In Subsystem',
  // },
  // {
  //   accessorKey: 'inAssy',
  //   header: 'In Assy',
  // },
  // {
  //   accessorKey: 'inIndex',
  //   header: 'In Index',
  // },
  // {
  //   accessorKey: 'Division',
  //   header: 'Division',
  // },
  {
    accessorKey: 'Weight(lbs)',
    header: 'Weight (lbs)',
  },
  {
    accessorKey: 'Assy Weight (lbs)',
    header: 'Assy Weight (lbs)',
  },
  {
    accessorKey: 'QTYcomplete-A01',
    header: 'QTY Complete A01',
  },
  {
    accessorKey: 'QTYcomplete-A02',
    header: 'QTY Complete A02',
  },
  {
    accessorKey: 'QTYcomplete-A03',
    header: 'QTY Complete A03',
  },
  {
    accessorKey: 'QTYcomplete-A04',
    header: 'QTY Complete A04',
  },
  {
    accessorKey: 'Condition',
    header: 'Condition',
  },
  // {
  //   accessorKey: 'hideRow',
  //   header: 'Hide Row',
  // },
  {
    accessorKey: 'Vendor',
    header: 'Vendor',
  },
  {
    accessorKey: 'QTY Backups',
    header: 'QTY Backups',
  },
];