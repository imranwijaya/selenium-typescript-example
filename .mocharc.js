"use strict";

module.exports = {
  // ─────────────────────────────────────────────
  // Test discovery
  // ─────────────────────────────────────────────
  spec: ["dist/tests/**/*.test.js"],
  extension: ["js", "cjs", "mjs"],
  require: ["./scripts/register-paths.js", "./dist/config/env.js"],
  recursive: false,

  // ─────────────────────────────────────────────
  // Test execution
  // ─────────────────────────────────────────────
  timeout: 60_000,
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
    "reportFilename=index",
    "reportPageTitle=Web Automation Testing Report",
    "charts=true",
    "overwrite=true",
    "html=true",
    "json=true",
  ],

  // ─────────────────────────────────────────────
  // Development
  // ─────────────────────────────────────────────
  watch: false,
};
