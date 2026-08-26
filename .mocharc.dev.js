"use strict";

module.exports = {
  // ─────────────────────────────────────────────
  // Test discovery
  // ─────────────────────────────────────────────
  spec: ["tests/**/*.test.ts"],
  extension: ["ts"],
  require: [
    "ts-node/register",
    "tsconfig-paths/register",
    "./config/env.ts",
  ],
  recursive: false,

  // ─────────────────────────────────────────────
  // Test execution
  // ─────────────────────────────────────────────
  timeout: 10000,
  retries: 1,
  bail: false,

  // ─────────────────────────────────────────────
  // Safety
  // ─────────────────────────────────────────────
  "check-leaks": true,
  "fail-zero": true,
  "forbid-only": true,
  "forbid-pending": false,

  // ─────────────────────────────────────────────
  // Reporter
  // ─────────────────────────────────────────────
  color: true,
  reporter: "mochawesome",

  "reporter-option": [
    "reportDir=reports",
    "reportFilename=report-[datetime]",
    "reportPageTitle=Web Automation Testing Report",
    "charts=true",
    "overwrite=false",
    "html=true",
    "json=true",
  ],

  // ─────────────────────────────────────────────
  // Development
  // ─────────────────────────────────────────────
  watch: false,
};
