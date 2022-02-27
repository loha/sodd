const { processLineByLine } = require('./app/utils/read-file.util');
const { start } = require('./app/services/runner.service');

(async () => {
  const sites = await processLineByLine('./sites', {
    symbolSkipFilter: '**',
  });

  start(sites);
})();
