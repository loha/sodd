const { cpus, totalmem, freemem } = require('os');

function currentMEMUsege() {
  return process.memoryUsage().heapUsed / 1024 / 1024;
}

function checkCPU() {
  return {
    cpus: cpus(),
    totalmem: totalmem(),
    freemem: freemem(),
  };
}

function cpuUsageInPersentage() {
  const cpusInstance = cpus();
  const cpu = cpusInstance[0];

  // Accumulate every CPU times values
  const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
  const usage = process.cpuUsage();
  const currentCPUUsage = (usage.user + usage.system) * 1000;

  // Find out the percentage used for this specific CPU
  const perc = (currentCPUUsage / total) * 100;

  return perc;
}

module.exports = {
  checkCPU,
  cpuUsageInPersentage,
  currentMEMUsege,
};
