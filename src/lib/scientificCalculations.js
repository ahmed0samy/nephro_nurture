const refWeight = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
const refVolume = [0, 600, 800, 1200, 2000, 2000, 3000, 3000, 3000, 3000];

const refAge = [0, 1, 5, 10, 15, 20, 30, 40, 50, 65, 75];
const refSolTime = [0, 8, 8, 6, 6, 4, 4, 8, 8, 8, 8];

export function calcWeightDependentFactors(weight) {
  if (weight >= refWeight[refWeight.length - 1]) {
    return { solutionVolume: refVolume[refVolume.length - 1] };
  } else if (weight < 0) {
    return {solutionVolume: undefined};
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
