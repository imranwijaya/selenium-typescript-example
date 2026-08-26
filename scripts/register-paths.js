const tsconfigPaths = require("tsconfig-paths");

tsconfigPaths.register({
  baseUrl: "./dist",
  paths: {
    "@config/*": ["config/*"],
    "@lib/*": ["lib/*"],
    "@pages/*": ["pages/*"],
    "@repositories/*": ["repositories/*"],
  },
});
