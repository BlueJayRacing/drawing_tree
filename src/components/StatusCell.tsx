// StatusCell.tsx

import React from 'react';
import { Box, BoxProps } from '@mantine/core';

interface StatusCellProps extends BoxProps {
  value: {
    id: number;
    value: string;
    color: string;
  } | null;
  colors?: Record<number | string, string>;
}

export const StatusCell: React.FC<StatusCellProps> = ({ value, colors, ...rest }) => {
  if (!value) {
    return null;
  }

  const { id, value: cellValue, color } = value;

  return (
    <Box
      sx={{
        padding: '4px 8px',
        borderRadius: '4px',
        color: "#fff",
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: color,
      }}
      {...rest}
    >
      {cellValue}
    </Box>
  );
};