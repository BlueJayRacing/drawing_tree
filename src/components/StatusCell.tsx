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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StatusCell: React.FC<StatusCellProps> = ({ value, colors, ...rest }) => {
  if (!value) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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