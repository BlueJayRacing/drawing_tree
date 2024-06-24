import React from 'react';
import { Flex } from '@mantine/core';
import { MRT_GlobalFilterTextInput, MRT_TablePagination } from 'mantine-react-table';
import type { MantineReactTable } from 'mantine-react-table';
import type { Part, Assembly } from '../types/types';

interface DrawingTreeHeaderProps {
  table: MantineReactTable<Part | Assembly>;
}

export const DrawingTreeHeader: React.FC<DrawingTreeHeaderProps> = ({ table }) => {
  return (
    <Flex justify="space-between" align="center">
      <MRT_GlobalFilterTextInput table={table} />
      <MRT_TablePagination table={table} />
    </Flex>
  );
};