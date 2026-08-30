import os from "node:os";
import type { BrowserMode, BrowserName } from "@lib/browser.types";

export type TestExecutionEnvironment = "local" | "ci";

export interface TestMetadataInput {
  browser: {
    name: BrowserName;
    version: string;
    mode: BrowserMode;
  };

  platform: {
    name: string;
  };
}

export interface TestMetadata extends TestMetadataInput {
  platform: {
    name: string;
    architecture: string;
  };

  runtime: {
    node: string;
    selenium: string;
    mocha: string;
  };

  execution: {
    environment: TestExecutionEnvironment;
    startedAt: string;
  };

  sourceControl: {
    branch?: string;
    commit?: string;
  };
}

function getExecutionEnvironment(): TestExecutionEnvironment {
  return process.env.CI === "true" ? "ci" : "local";
}

function getGitBranch(): string | undefined {
  return (
    process.env.GITHUB_HEAD_REF ||
    process.env.GITHUB_REF_NAME ||
    process.env.GIT_BRANCH ||
    undefined
  );
}

function getGitCommit(): string | undefined {
  return process.env.GITHUB_SHA || process.env.GIT_COMMIT || undefined;
}

function getDependencyVersion(packageName: string): string {
  try {
    const packageJson = require(`${packageName}/package.json`) as {
      version: string;
    };

    return packageJson.version;
  } catch {
    return "unknown";
  }
}

export function createTestMetadata(input: TestMetadataInput): TestMetadata {
  return {
    browser: {
      name: input.browser.name,
      version: input.browser.version,
      mode: input.browser.mode,
    },

    platform: {
      name: input.platform.name,
      architecture: os.arch(),
    },

    runtime: {
      node: process.version,
      selenium: getDependencyVersion("selenium-webdriver"),
      mocha: getDependencyVersion("mocha"),
    },

    execution: {
      environment: getExecutionEnvironment(),
      startedAt: new Date().toISOString(),
    },

    sourceControl: {
      branch: getGitBranch(),
      commit: getGitCommit(),
    },
  };
}
