#!/usr/bin/env node

const arg = require("arg");

const lib = require("./lib");

main();

async function main() {
  const args = arg({
    "--include-betas": Boolean,
    "--min-version": Number,
    "--flat": Boolean,
  });
  const flat = args["--flat"];
  const includeBetas = args["--include-betas"];
  const minVersion = args["--min-version"];
  const releases = await lib.fetchReleases(minVersion, includeBetas);
  if (flat) {
    releases.releases = Object.values(releases.releases).flat();
  }
  console.log(JSON.stringify(releases, null, 2));
}
