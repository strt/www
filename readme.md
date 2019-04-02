# [Strateg.se](https://strateg.se)

[![Netlify Status](https://api.netlify.com/api/v1/badges/35441f05-a098-44a2-9f68-eec71d4a0d89/deploy-status)](https://app.netlify.com/sites/strateg/deploys)

## Setup

### Requirements

- Node 8+
- Yarn

Run `cp .env.example .env` and fill in the required variables.

You will also need to have a global `FONTAWESOME_TOKEN` env variable set to access fontawsomes npm registry.

Run `yarn` to install dependencies and `yarn dev` to start the dev server.

## Deploy

The site is hosted on [Netlify](https://netlify.com).

We are using continous deployment so the `master` branch will be deployed on every commit. All pull requests are deployed as draft previews with a unique URL.

## Browser support

We only intend to support "evergreen" browsers (Chrome, Firefox, Safari and Edge). Full list is in our [.browserslistrc](.browserslistrc) file.
