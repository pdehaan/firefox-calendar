# firefox-calendar

Fetch Firefox release dates.

## USAGE

```sh
# Fetch all non-beta releases since latest ESR release.
npx pdehaan/firefox-calendar
```

```sh
# Fetch all releases (including betas) since last ESR release.
npx pdehaan/firefox-calendar --include-betas
```

```sh
# Fetch all non-beta releases since Firefox 80.
npx pdehaan/firefox-calendar --min-version=80
```

```sh
# Fetch all non-beta releases and flatten into a single array (vs nested object).
npx pdehaan/firefox-calendar --flat
```

## OUTPUT

```js
// npx pdehaan/firefox-calendar
{
  "$meta": {
    "$href": "https://product-details.mozilla.org/1.0/firefox_versions.json",
    "FIREFOX_AURORA": "",
    "FIREFOX_DEVEDITION": "83.0b5",
    "FIREFOX_ESR": "78.4.0esr",
    "FIREFOX_ESR_NEXT": "",
    "FIREFOX_NIGHTLY": "84.0a1",
    "LAST_MERGE_DATE": "2020-10-19",
    "LAST_RELEASE_DATE": "2020-10-20",
    "LAST_SOFTFREEZE_DATE": "2020-10-15",
    "LATEST_FIREFOX_DEVEL_VERSION": "83.0b5",
    "LATEST_FIREFOX_OLDER_VERSION": "3.6.28",
    "LATEST_FIREFOX_RELEASED_DEVEL_VERSION": "83.0b5",
    "LATEST_FIREFOX_VERSION": "82.0.2",
    "NEXT_MERGE_DATE": "2020-11-16",
    "NEXT_RELEASE_DATE": "2020-11-17",
    "NEXT_SOFTFREEZE_DATE": "2020-11-12"
  },
  "releases": {
    "78": [
      {
        "version": "78.0",
        "date": "2020-06-29T19:05:00.000Z"
      },
      // ...
      {
        "version": "78.4.0 ESR",
        "date": "2020-10-19T15:25:00.000Z",
        "esr": true
      }
    ],
    "79": [
      {
        "version": "79.0",
        "date": "2020-07-27T16:22:00.000Z"
      }
    ],
    "80": [
      {
        "version": "80.0",
        "date": "2020-08-24T18:25:00.000Z"
      },
      {
        "version": "80.0.1",
        "date": "2020-09-01T04:29:00.000Z"
      }
    ],
    "81": [
      {
        "version": "81.0",
        "date": "2020-09-21T11:05:00.000Z"
      },
      // ...
    ],
    "82": [
      {
        "version": "82.0",
        "date": "2020-10-19T15:22:00.000Z"
      },
      // ...
    ]
  }
}
```

```js
// npx pdehaan/firefox-calendar --flat
{
  "$meta": {
    "$href": "https://product-details.mozilla.org/1.0/firefox_versions.json",
    "FIREFOX_AURORA": "",
    "FIREFOX_DEVEDITION": "83.0b5",
    "FIREFOX_ESR": "78.4.0esr",
    "FIREFOX_ESR_NEXT": "",
    "FIREFOX_NIGHTLY": "84.0a1",
    "LAST_MERGE_DATE": "2020-10-19",
    "LAST_RELEASE_DATE": "2020-10-20",
    "LAST_SOFTFREEZE_DATE": "2020-10-15",
    "LATEST_FIREFOX_DEVEL_VERSION": "83.0b5",
    "LATEST_FIREFOX_OLDER_VERSION": "3.6.28",
    "LATEST_FIREFOX_RELEASED_DEVEL_VERSION": "83.0b5",
    "LATEST_FIREFOX_VERSION": "82.0.2",
    "NEXT_MERGE_DATE": "2020-11-16",
    "NEXT_RELEASE_DATE": "2020-11-17",
    "NEXT_SOFTFREEZE_DATE": "2020-11-12"
  },
  "releases": [
    {
      "version": "78.0",
      "date": "2020-06-29T19:05:00.000Z"
    },
    {
      "version": "78.0 ESR",
      "date": "2020-06-29T19:18:00.000Z",
      "esr": true
    },
    {
      "version": "78.0.1",
      "date": "2020-07-01T16:55:00.000Z"
    },
    {
      "version": "78.0.1 ESR",
      "date": "2020-07-01T16:56:00.000Z",
      "esr": true
    },
    // ...
    {
      "version": "82.0.2",
      "date": "2020-10-28T17:28:00.000Z"
    }
  ]
}
```
