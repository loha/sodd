const { config } = require('dotenv');

config();

let { NEXT_REQUEST_LOG, MAX_MEM_USE, WORKERS_COUNT } = process.env;

NEXT_REQUEST_LOG = parseInt(NEXT_REQUEST_LOG);
MAX_MEM_USE = parseInt(MAX_MEM_USE);
WORKERS_COUNT = parseInt(WORKERS_COUNT);

const maxMemUse = WORKERS_COUNT === 2 ? MAX_MEM_USE : MAX_MEM_USE / WORKERS_COUNT;

module.exports = {
  NEXT_REQUEST_LOG,
  MAX_MEM_USE: maxMemUse,
  WORKERS_COUNT,
};
