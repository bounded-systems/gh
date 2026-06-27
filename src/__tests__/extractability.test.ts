import { test } from "bun:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { assertSeam } from "@bounded-systems/seam-check";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// @bounded-systems/gh: one gated entry point for GitHub access — subcommand
// policy + budget gating + audit logging wrap every gh call. Prod files touch
// the env / proc / policy / github-budget seams only. The harness proves that
// edge set and the no-ambient thesis.
test("@bounded-systems/gh upholds its seam claim", () => {
  assertSeam({
    root: SRC,
    prod: [
      "@bounded-systems/env",
      "@bounded-systems/proc",
      "@bounded-systems/policy",
      "@bounded-systems/github-budget",
    ],
    test: ["@bounded-systems/gh", "@bounded-systems/seam-check", "node:fs"],
  });
});
