#!/usr/bin/env node

const arg = require("arg-proxy");
const lib = require("./lib");

main();

async function main() {
  const args = arg({
    "--include-betas": Boolean,
    "--min-version": Number,
    "--flat": Boolean,
  });
  const res = await lib.fetchReleases(args.minVersion, args.includeBetas);
  if (args.flat) {
    res.releases = Object.values(res.releases).flat();
  }
  console.log(JSON.stringify(res, null, 2));
}
