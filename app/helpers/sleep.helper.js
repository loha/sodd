/**
 * @param {number} timeInMilliseconds 
 * @returns Promise<void>
 */
function sleep(timeInMilliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeInMilliseconds);
  });
}

module.exports = {
  sleep,
};
