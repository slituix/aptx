import { spawn } from "child_process";

export function execCommand(command: string, onData: (line: string) => void) {
  const child = spawn(command, { shell: true });

  child.stdout.on("data", (data) => {
    const lines = data.toString().split("\n");
    for (const line of lines) {
      if (line.trim()) onData(line);
    }
  });

  child.stderr.on("data", (data) => {
    onData(`⚠️  ${data.toString()}`);
  });

  child.on("close", () => {
    onData("✅ Done!");
  });
}
