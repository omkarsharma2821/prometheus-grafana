function getRandomValue(array) {
  const randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
}

function doSomeHeavyTask() {
    const ms = getRandomValue([100, 200, 300, 400, 500,600,700,800,900,1000]);
    const shoulthrwowError = getRandomValue([1,2,3,4,5,6,7,8,9,10]) === 8;
    if (shoulthrwowError) {
        const randomError = getRandomValue([
            "Network error",
            "Database connection failed",
            "File not found",
            "Unauthorized access",
            "Timeout error",
        ]);
        throw new Error(randomError);
    };
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    });
}

module.exports = { doSomeHeavyTask };