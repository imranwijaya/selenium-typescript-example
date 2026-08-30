import fs from "node:fs";
import path from "node:path";

import type { TestMetadata } from "@lib/test.metadata";

let executionMetadata: TestMetadata | undefined;

export function recordTestMetadata(metadata: TestMetadata) {
  if (executionMetadata) {
    return;
  }

  executionMetadata = metadata;
  const reportsDirectory = path.resolve("reports");
  fs.mkdirSync(reportsDirectory, { recursive: true });
  fs.writeFileSync(
    path.join(reportsDirectory, "metadata.json"),
    `${JSON.stringify(metadata, null, 2)}\n`,
    "utf8",
  );
}

export function getTestMetadata(): TestMetadata | undefined {
  return executionMetadata;
}
