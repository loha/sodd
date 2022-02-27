const fs = require('fs');
const readline = require('readline');

/**
 * 
 * @param {string} filePath 
 * @param {{ symbolSkipFilter?: string }} options
 * @returns {Promise<string[]>}
 */
async function processLineByLine(filePath, { symbolSkipFilter = undefined }) {
  const lines = [];
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const isSkip = symbolSkipFilter && line.includes(symbolSkipFilter);

    if (isSkip) {
      continue;
    }

    lines.push(line);
  }

  return lines;
}

module.exports = {
  processLineByLine,
};
