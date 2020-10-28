const _ = require("lodash");
const axios = require("axios");
const cheerio = require("cheerio");
const sortJson = require("sort-json");

const client = axios.create({
  baseURL: "https://ftp.mozilla.org/",
  // 5 seconds
  timeout: 5000,
});

module.exports = {
  fetchReleases,
  fetchReleaseVersion,
  fetchTrains,
};

/**
 *
 * @param {string|number} minVersion
 * @param {boolean} includeBetas
 * @returns {object} An object with a `$meta` object (via `fetchTrains()` API), and a `releases` object (grouped by major version).
 */
async function fetchReleases(minVersion, includeBetas = false) {
  const $meta = await fetchTrains();
  const esrVersion = parseInt($meta.FIREFOX_ESR, 10);
  const releaseVersion = parseInt($meta.LATEST_FIREFOX_VERSION, 10);
  let $minVersion = releaseVersion;

  if (Number.isNaN(minVersion) || minVersion === undefined) {
    // If `minVersion` is non-numeric or undefined, use current ESR version.
    $minVersion = esrVersion;
  } else if (minVersion > 0) {
    // If `minVersion` is a positive number, assume its an exact number.
    $minVersion = minVersion;
  } else if (minVersion < 0) {
    // If `minVersion` is a negative number, assume its a relative number.
    $minVersion = releaseVersion - Math.abs(minVersion);
  }

  const href = "/pub/firefox/releases/";
  const $ = await fetchHtml(href);
  const $releases = [];

  $("table tbody tr td a[href*='/releases/']").each(function (i, elem) {
    // strip trailing "/".
    const ver = $(this).text().replace(/\/$/, "");
    if (parseFloat(ver, 10) >= $minVersion) {
      $releases.push(ver);
    }
  });

  const $data = [];
  for (const release of $releases) {
    // Filter out any unwanted betas.
    if (!includeBetas && release.includes("b")) {
      continue;
    }
    const info = await fetchReleaseVersion(release);
    info.version = info.version
      .replace(/(\d)b(\d)/, "$1 beta $2")
      .replace(/esr$/, " ESR");
    if (info.version.includes(" beta ")) {
      info.beta = true;
    }
    if (info.version.endsWith(" ESR")) {
      info.esr = true;
    }
    $data.push(info);
  }

  const releases = _.chain($data)
    .sortBy(["date"])
    .groupBy((rel) => parseInt(rel.version, 10))
    .value();

  return { $meta, releases };
}

/**
 * Fetch specific version page and get release date from <td>.
 * @param {string} version
 * @returns {object} Object with `version` number and `date`.
 */
async function fetchReleaseVersion(version) {
  const href = `/pub/firefox/releases/${version}/`;
  try {
    const $ = await fetchHtml(href);
    const date = $("table tbody tr td a[href$='KEY']")
      // <td>
      .parent()
      // <tr>
      .parent()
      // All child <td>s
      .children()
      .last()
      .text();
    return { version, date: new Date(date) };
  } catch (err) {
    console.error(`Unable to fetch ${href}`);
    process.exitCode = 1;
  }
}

/**
 * Fetch firefox_versions.json file...
 * @returns {object} 
 */
async function fetchTrains() {
  const href = "https://product-details.mozilla.org/1.0/firefox_versions.json";
  const res = await client.get(href);
  res.data.$href = href;
  return sortJson(res.data);
}

/**
 * Fetch a remote HTML page and parse it w/ cheerio.
 * @param {string} href 
 * @returns {cheerio.Root}
 */
async function fetchHtml(href) {
  const res = await client.get(href);
  return cheerio.load(res.data);
}
