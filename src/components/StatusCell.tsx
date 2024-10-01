// StatusCell.tsx

import React from 'react';
import { Box, BoxProps } from '@mantine/core';

interface StatusCellProps extends BoxProps {
  value: {
    id: number;
    value: string;
    color: string;
  } | string | null | undefined;
}

export const StatusCell: React.FC<StatusCellProps> = React.memo(({ value, ...rest }) => {
  if (!value) {
    return null;
  }

  let cellValue: string;
  let color: string;

  if (typeof value === 'object') {
    cellValue = value.value;
    color = value.color;
  } else {
    cellValue = value;
    color = getColorForValue(cellValue);
  }

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

function getColorForValue(value: string): string {
  // Define your color mapping here
  const colorMap: Record<string, string> = {
    'Not Started': '#ff4d4f',
    'Incomplete': '#faad14',
    'In Review': '#1890ff',
    'Complete': '#52c41a',
    'N/A': '#d9d9d9',
    // Add more mappings as needed
  };

  return colorMap[value] || '#d9d9d9'; // Default color if not found
}