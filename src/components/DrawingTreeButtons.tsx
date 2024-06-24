import React from 'react';
import { Button, Flex } from '@mantine/core';
import { IconDeviceFloppy, IconPlus } from '@tabler/icons-react';
import type { MantineReactTable } from 'mantine-react-table';
import type { Part, Assembly } from '../types/types';

interface DrawingTreeButtonsProps {
  table: MantineReactTable<Part | Assembly>;
  setData: React.Dispatch<React.SetStateAction<(Part | Assembly)[]>>;
}

export const DrawingTreeButtons: React.FC<DrawingTreeButtonsProps> = ({ table, setData }) => {
  // ... (button click handlers and other logic)

  return (
    <div>
    <Flex justify="flex-end" align="center">
      <Button
        color="teal"
        onClick={() => {
          // Handle create part button click
        }}
        variant="filled"
      >
        Create Part
      </Button>
      <Button
        color="teal"
        onClick={() => {
          // Handle create assembly button click
        }}
        variant="filled"
        ml="md"
      >
        Create Assembly
      </Button>
      <Button
        color="teal"
        onClick={() => {
          // Handle save button click
        }}
        variant="filled"
        ml="md"
      >
        Save
      </Button>
    </Flex>
    </div>
  );
};