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






export function getNearCycles({exchanges, cycleTime, timeNow = Date.now(), sucktionTime}) {
  let lastCycle;
  let nextCycle;
  let currentCycle;
  exchanges.forEach((cycle) => {
    let status;
    const date = new Date(cycle+ cycleTime*3600000);
    const tempNextCycle = date.getTime();
    if (timeNow < cycle) {
      status = "Upcoming";
    }
    if ((cycle < timeNow) & (tempNextCycle > timeNow)) {
      lastCycle = cycle;
    } else if (timeNow >= cycle) {
      status = "Running";
      currentCycle = tempNextCycle;
      nextCycle = tempNextCycle+cycleTime*3600000;
    }
  });

  if (timeNow < exchanges[0]) {
    lastCycle = exchanges[0] - 2 * cycleTime;
    currentCycle = exchanges[0] - cycleTime;
    nextCycle = exchanges[0];
  }

  let diff = nextCycle - timeNow - sucktionTime * 3600000;
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



export function getTime({
  lastCalculatedCycle,
  solutionVolume,
  solutionTime,
  flowRate,
}) {
  const cycleTime = Number(solutionVolume) / Number(flowRate) + Number(solutionTime);
  console.log('cycleTime: ', cycleTime)
  // const now = new Date;
  // const now = 1735779159000;
  const now = Date.now();
  console.log('The entered lastCalculated Time: ', formatDate(new Date(lastCalculatedCycle)))
  let nextCyclesTillDayEnd = [];
  let allDayCycles = [];
  let currentCycle;
  let lastCycle;
  let temp = lastCalculatedCycle;
  console.log('"temp" before removing ', cycleTime, ' from it is: ', formatDate(new Date(temp)))

  while (temp < now) {
    // get the start of cycle
    const date = new Date(temp);

    date.setHours(date.getHours() + cycleTime);
    temp = date.getTime();
  }
  
  currentCycle = temp; // end of the cycle'
  // lastCycle = new Date(currentCycle)
  lastCycle = new Date(currentCycle).getTime()
  console.log('"temp" after removing ', cycleTime, ' from it is: ', formatDate((lastCycle)))
  // lastCycle = new Date(currentCycle).setHours(
  //   new Date(currentCycle).getHours() - cycleTime
  // );
  const nowDate = new Date(now);
  const tomorrow = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate() + 1
  );

  // Create a new Date object for today at 00:00
  const startOfToday = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate()
  ).getTime();

  while (temp < tomorrow) {
    const date = new Date(temp);
    nextCyclesTillDayEnd.push(temp);
    date.setHours(date.getHours() + cycleTime);
    temp = date.getTime();
    console.log("from while temp < tomorrow ", temp);
  }
  while (temp >= startOfToday) {
    const date = new Date(temp-cycleTime*3600000);
    temp = date.getTime();
    allDayCycles.push(temp);
    console.log("from while temp > start of the day ", temp);
  }
  allDayCycles.pop();
  allDayCycles.reverse();
  console.log(lastCycle);

  console.log("the exited Last calculated cycle:", formatDate(new Date(lastCycle)));
  console.log("current cycle ends at: ", formatDate(new Date(currentCycle)));
  console.log(nextCyclesTillDayEnd.map((cycle) => formatDate(new Date(cycle))));
  // console.log("all day cycles:", allDayCycles.reverse());
  console.log("Number of exchanges", allDayCycles.length);
  return {
    lastCalculatedCycle: lastCycle,
    nextCyclesTillDayEnd,
    currentCycle,
    allDayCycles: allDayCycles,
    allDayCyclesCount: allDayCycles.length,
  };
}