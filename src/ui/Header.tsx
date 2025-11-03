import React from "react";
import { Box, Text } from "ink";
import gradient from "gradient-string";
import figlet from "figlet";

export const Header = () => {
  const text = figlet.textSync("APT-X", { font: "Standard" });
  const colored = gradient.pastel.multiline(text);
  return (
    <Box flexDirection="column" marginBottom={1}>
      <Text>{colored}</Text>
    </Box>
  );
};
