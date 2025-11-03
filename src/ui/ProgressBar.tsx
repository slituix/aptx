import React from "react";
import { Box, Text } from "ink";

export const ProgressBar = ({ value }: { value: number }) => {
  const filled = Math.round(value / 5);
  const bar = "█".repeat(filled) + "░".repeat(20 - filled);
  return (
    <Box marginTop={1}>
      <Text color="green">{`[${bar}] ${value.toFixed(0)}%`}</Text>
    </Box>
  );
};
