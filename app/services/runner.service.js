const { NEXT_REQUEST_LOG, MAX_MEM_USE } = require('../../config.settings');
const { currentMEMUsege } = require('../helpers/cpu.helper');
// const { sleep } = require('../helpers/sleep.helper');
const { RequestApi } = require('../utils/api.util');
// const axios = require('axios');

async function start(sitesData) {
  for (const siteData of sitesData) {
    run(siteData);
  }
}

/**
 * @param {string} siteData
 */
async function run(siteData) {
  let requests = 0;
  let nextLogRequestCount = NEXT_REQUEST_LOG;

  const [hostname, path, port, method] = siteData.split('|');

  while (true) {
    await new RequestApi()
      .options({
        hostname,
        // port,
        path,
        method,
        timeout: 1000,
      })
      .make()
      .catch((err) => err);

    if (requests === nextLogRequestCount) {
      await checkMEMUsage(hostname, requests);
      nextLogRequestCount += NEXT_REQUEST_LOG;
    }

    requests++;
  }
}

async function checkMEMUsage(site, requests) {
  const memUsage = currentMEMUsege();

  console.log(
    `Site | ${site} | Requests maked | ${requests} | MEM used | ${memUsage} | Time | ${new Date().getSeconds()}`
  );

  if (memUsage > MAX_MEM_USE) {
    process.exit(1);
  }
}

module.exports = {
  start,
};
