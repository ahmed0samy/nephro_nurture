"use client";
import { getUserData } from "@/lib/actions";
import { useEffect, useState } from "react";
import styles from "./view.module.scss";
import Link from "next/link";
import { formatDate } from "@/lib/scientificCalculations";
import Loading from "../components/loading/loading";
export default function Page() {
  const [data, setData] = useState("No data");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData({ userID: "123" });
        const data = JSON.parse(response);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // let exchangesTime = [];
  // if (typeof data?.exchangesTime?.length != "undefined") {
  //   for (let i = 0; i < data.exchangesTime.length; i++) {
  //     const element = data.exchangesTime[i];
  //   }
  // }
  const content = (
    <>
      <div className={`${styles.grid} container`}>
        <span>User ID</span> <span>{data.userID}</span>
        <span>Name</span> <span>{data.name}</span>
        <span>Age</span> <span>{data.age} Years</span>
        <span>Weight</span> <span>{data.weight} Kg</span>
        <span>Gender</span> <span>{data.gender == 1 ? "Male" : "Female"}</span>
        <span>Solution Time</span> <span>{data.solTime} hours</span>
        <span>Solution Volume</span> <span>{data.solutionVolume} mL</span>
        <span>Flow Rate</span> <span>{data.flowRate} mL/hour</span>
        {/* <span>Last calculated cycle date</span> */}
        {/* <span>{formatDate(new Date(data.lastCalculatedCycle))}</span> */}
        <span>All today cycles</span>{" "}
        <span>
          <ul>
            {data?.exchangesTime
              ?.map((day, i) => <li key={i}>{formatDate(new Date(day))}</li>)
              .reverse()}
          </ul>
        </span>
        <span>Number of exchanges Today</span> <span>{data.nuExchanges}</span>
        <Link href={"/edit_user"}>
          <button>Edit User Data</button>
        </Link>
      </div>
    </>
  );
  return (
    <div>
      <div className="container">
        {!loading ? <h1>{content}</h1> : <Loading/>}
      </div>
    </div>
  );
}
