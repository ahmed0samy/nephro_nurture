const refWeight = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
const refVolume = [0, 600, 800, 1200, 2000, 2000, 3000, 3000, 3000, 3000];

const refAge = [0, 1, 5, 10, 15, 20, 30, 40, 50, 65, 75];
const refSolTime = [0, 8, 8, 6, 6, 4, 4, 8, 8, 8, 8];

export function calcWeightDependentFactors(weight) {
  if (weight >= refWeight[refWeight.length - 1]) {
    return { solutionVolume: refVolume[refVolume.length - 1] };
  } else if (weight < 0) {
    return { solutionVolume: undefined };
  }
  for (let i = 0; i < refWeight.length; i++) {
    if (weight >= refWeight[i] && weight < refWeight[i + 1]) {
      return {
        solutionVolume:
          Math.round(
            (((weight - refWeight[i]) / (refWeight[i + 1] - refWeight[i])) *
              (refVolume[i + 1] - refVolume[i]) +
              refVolume[i]) *
              100
          ) / 100,
      };
    }
  }
}
export function calcAgeDependentFactors(age) {
  if (age >= refAge[refAge.length - 1]) {
    return { solTime: refSolTime[refSolTime.length - 1] };
  } else if (age < 0) {
    return { solTime: undefined };
  }
  for (let i = 0; i < refAge.length; i++) {
    if (age >= refAge[i] && age < refAge[i + 1]) {
      return {
        solTime:
          Math.round(
            (((age - refAge[i]) / (refAge[i + 1] - refAge[i])) *
              (refSolTime[i + 1] - refSolTime[i]) +
              refSolTime[i]) *
              100
          ) / 100,
      };
    }
  }
}

export function formatDate(inputDate) {
  const date = new Date(inputDate);

  // Extract components
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  // Format the date
  const formattedDate = `${hours}:${minutes}:${seconds} at ${day}-${month}-${year}`;
  return formattedDate;
}

export function getNearCycles({
  exchanges,
  cycleTime,
  timeNow = Date.now(),
  sucktionTime,
}) {
  let lastCycle;
  let nextCycle;
  let currentCycle;

  exchanges.forEach((cycle) => {
    let status;
    const date = new Date(cycle + cycleTime * 3600000);
    const tempNextCycle = date.getTime();
    if (timeNow < cycle) {
      status = "Upcoming";
    }
    if ((cycle < timeNow) & (tempNextCycle > timeNow)) {
      lastCycle = cycle;
    } else if (timeNow >= cycle) {
      status = "Running";
      currentCycle = tempNextCycle;
      nextCycle = tempNextCycle + cycleTime * 3600000;
    }
  });

  if (timeNow < exchanges[0]) {
    lastCycle = exchanges[0] - 2 * cycleTime;
    currentCycle = exchanges[0] - cycleTime;
    nextCycle = exchanges[0];
  }

  let diff = nextCycle - timeNow - sucktionTime * 3600000;
  console.log("diff: ", diff);
  console.log("diff: ");

  diff = diff <= 0 ? diff + cycleTime * 3600000 : diff;
  const remainingTillSucktion = {
    days: Math.floor(diff / 864e5),
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 36e5) / 6e4),
    seconds: Math.floor((diff % 6e4) / 1e3),
  };

  return {
    currentCycleStart: currentCycle,
    nextCycleStart: nextCycle,
    lastCycleStart: lastCycle,
    remainingTillnextSucktion: remainingTillSucktion,
  };
}


export function getTime({lastCalculatedCycle, solutionVolume, solutionTime, flowRate}){
  const totalSolutionTime = +(solutionVolume)/+(flowRate) + +(solutionTime); // hours
  const msTotalSolutionTime = totalSolutionTime * 60 * 60 * 1000 
  // const virtual = new Date("2025-1-26 06:30:06");
  // const now = virtual.getTime();
  const now = (Date.now());
  const startOfDay = new Date(now)
  startOfDay.setHours(0)
  startOfDay.setMinutes(0)
  startOfDay.setSeconds(0)
  const msStartOfDay = startOfDay.getTime()
  const endOfDay = new Date(msStartOfDay + 24 * 60 * 60 *1000)
  const msEndOfDay = endOfDay.getTime()
  let thisCycleStart;
  let counter = lastCalculatedCycle
  while (counter > msStartOfDay + msTotalSolutionTime){
    counter -= msTotalSolutionTime;
  }  
  let allDayCycles = [];
  while (counter < msEndOfDay){
    if (now > counter & now < counter + msTotalSolutionTime ){
      thisCycleStart = counter
    }
    allDayCycles.push(counter)
    counter += msTotalSolutionTime
  }

  let lastCycleStart = thisCycleStart - msTotalSolutionTime;
  let nextCycleStart = thisCycleStart + msTotalSolutionTime;
  return {
    allDayCycles,
    formatedAllDayCycles: allDayCycles.map(e=> formatDate(e)),
    thisCycleStart,
    currentCycle: thisCycleStart,
    formattedThisCycleStart: formatDate(thisCycleStart),
    lastCycleStart,
    formattedLastCycleStart: formatDate(lastCycleStart),
    nextCycleStart,
    formattedNextCycleStart: formatDate(nextCycleStart),
    lastCalculatedCycle: lastCycleStart,
    allDayCyclesCount: allDayCycles.length,

  }    
}


