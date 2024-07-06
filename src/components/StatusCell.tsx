// StatusCell.tsx

import React from 'react';
import { Box, BoxProps } from '@mantine/core';

interface StatusCellProps extends BoxProps {
  value: {
    id: number;
    value: string;
    color: string;
  } | null | undefined;
}

export const StatusCell: React.FC<StatusCellProps> = React.memo(({ value, ...rest }) => {
  if (!value) {
    return null;
  }

  const { value: cellValue, color } = value;

  return (
    <Box
      sx={{
        backgroundColor: color,
        borderRadius: '4px',
        color: "#fff",
        padding: '4px 8px',
        display: 'inline-block',
      }}
      {...rest}
    >
      {cellValue}
    </Box>
  );
});