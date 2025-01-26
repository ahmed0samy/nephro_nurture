import { useState, useEffect } from "react";
import styles from "./home.module.scss";
import { formatDate, getNearCycles } from "@/lib/scientificCalculations";

function formateDate(day, isSeconds = false) {
  let minutes = day.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let hours = day.getHours();
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours < 10 ? `0${hours}` : hours;

  return day.getHours() > 12
    ? ` ${hours} : ${minutes}${isSeconds ? ` : ${day.getSeconds()}` : ""} pm`
    : ` ${hours || 12} : ${minutes}${
        isSeconds ? ` : ${day.getSeconds()}` : ""
      } am`;
}

export default function Monitor({ data }) {
  const [timeNow, setNow] = useState(Date.now());
  const sucktionTime = data?.solutionVolume / data?.flowRate; // 0.2 hours
  const cycleTime = +data.solutionVolume / +data.flowRate + +data.solTime;

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let exchanges = data?.exchangesTime;
  let nearCycles = getNearCycles({ exchanges, cycleTime, sucktionTime });
  let nextCycle = nearCycles.nextCycleStart;
  let currentCycle = nearCycles.currentCycleStart;
  const remainingTillSucktion = nearCycles.remainingTillnextSucktion;

  const timeElement = exchanges?.map((cycle, i, arr) => {
    let status;
    const date = new Date(cycle);

    // Calculate the position as a percentage of the cycle
    const secondsIntoDay =
      date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

    // status = currentCycle == cycle? "Running" : currentCycle > cycle? "Done" : "Upcoming"

    const endOfCycle = cycle + cycleTime * 60 * 60 * 1000;

    if ((+cycle < timeNow) && (endOfCycle < timeNow)) {
      status = "Upcoming";
    } else if ((timeNow >= +cycle) && (timeNow < endOfCycle)) {
      status = "Running";
    }
    if (timeNow < +cycle) {
      status = "Done";
    }

    return (
      <li
        className={styles[status]}
        key={i}
        style={{ left: `${(secondsIntoDay / 86400) * 100}%` }} // Set the left property dynamically
      >
        <span>{formateDate(new Date(cycle))}</span>
        <span>{status}</span>
      </li>
    );
  });

  const now = new Date(timeNow);
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0
  );
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59
  );

  const lineLengthRatio = (now - startOfDay) / (endOfDay - startOfDay);
  console.log("next cycle at: ", formatDate(nextCycle));
  console.log("current cycle at: ", formatDate(currentCycle));

  let currentCycleForCycleLine;
  if ((now < nextCycle) & (now > nextCycle - sucktionTime * 3600000)) {
    currentCycleForCycleLine = nextCycle;
  } else {
    currentCycleForCycleLine = currentCycle;
  }
  const cycleLineLengthRatio =
    (now - currentCycle) / (nextCycle - currentCycle - sucktionTime * 3600000);
  console.log("next cycle: ", formateDate(new Date(nextCycle)));
  return (
    <>
      <div className={styles.monitor}>
        <ol>
          <li>
            Next cycle starts
            {new Date(nextCycle).getDay > new Date(timeNow).getDay
              ? " tomorrow "
              : " today "}
            at {formateDate(new Date(nextCycle))}
          </li>
          <li>
            {nextCycle - sucktionTime * 3600000 < now
              ? "sucktion in process..."
              : `sucktion starts ${
                  new Date(nextCycle).getDay > new Date(timeNow).getDay
                    ? "tomorrow"
                    : "today"
                } at ${formateDate(
                  new Date(nextCycle - sucktionTime * 3600000)
                )}`}
          </li>
        </ol>
        <ul>{timeElement}</ul>
        <div
          style={{ width: `${Math.round(100 * lineLengthRatio)}%` }}
          className={styles.line}
        ></div>
        <ol>
          <li>12:00 am</li>
          <li>11:59 pm</li>
        </ol>
        <h3>
          Remaining
          {` ${remainingTillSucktion.hours} : ${remainingTillSucktion.minutes} : ${remainingTillSucktion.seconds} `}
          till next sucktion
        </h3>
        <div
          style={{
            width: `${100 * cycleLineLengthRatio}%`,
            backgroundColor: "var(--primary-color)",
          }}
          className={styles.line}
        ></div>
      </div>
    </>
  );
}
