#!/usr/bin/env node

const arg = require("arg");

const lib = require("./lib");

main();

async function main() {
  const args = arg({
    "--include-betas": Boolean,
    "--min-version": Number,
  });
  const includeBetas = args["--include-betas"] || false;
  const minVersion = args["--min-version"];
  const releases = await lib.fetchReleases(minVersion, includeBetas);
  console.log(JSON.stringify(releases, null, 2));
}
