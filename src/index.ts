import React from "react";
import { render, Box, Text, useApp } from "ink";
import SelectInput from "ink-select-input";
import { Header } from "./ui/Header.js";
import { ProgressBar } from "./ui/ProgressBar.js";
import { execCommand } from "./utils/exec.js";

type MenuItem = {
  label: string;
  value: string;
};

const APTX = () => {
  const { exit } = useApp();
  const [selected, setSelected] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState("Idle...");

  const menu: MenuItem[] = [
    { label: "Update Packages", value: "update" },
    { label: "Upgrade Packages", value: "upgrade" },
    { label: "Install Package", value: "install" },
    { label: "Clean Cache", value: "clean" },
    { label: "Exit", value: "exit" },
  ];

  const handleSelect = (item: MenuItem) => {
    if (item.value === "exit") {
      exit();
      return;
    }

    setSelected(item.value);
    setStatus(`Running apt ${item.value}...`);
    execCommand(`apt ${item.value}`, (line) => {
      setProgress((p) => Math.min(100, p + 1));
      setStatus(line);
    });
  };

  if (!selected) {
    return (
      <Box flexDirection="column">
        <Header />
        <Box marginTop={1}>
          <Text color="green">Select an action:</Text>
        </Box>
        <SelectInput items={menu} onSelect={handleSelect} />
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      <Header />
      <Box marginTop={1}>
        <Text color="cyan">{status}</Text>
      </Box>
      <ProgressBar value={progress} />
    </Box>
  );
};

render(<APTX />);
