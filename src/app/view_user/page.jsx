"use client";
import { getUserData } from "@/lib/actions";
import { useEffect, useState } from "react";
import styles from "./view.module.scss";
import Link from "next/link";
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

  const content = (
    <>
      <div className={`${styles.grid} container`}>
        <span>User ID</span> <span>{data.userID}</span>
        <span>Name</span> <span>{data.name}</span>
        <span>Age</span> <span>{data.age} years</span>
        <span>Weight</span> <span>{data.weight} Kg</span>
        <span>Gender</span> <span>{data.gender == 1 ? "Male" : "Female"}</span>
        <span>Solution Time</span> <span>{data.solTime} min</span>
        <span>Solution Volume</span> <span>{data.solutionVolume} mL</span>
        <Link href={"/edit_user"}>
          <button>Edit User Data</button>
        </Link>
      </div>
    </>
  );
  return (
    <div>
      <div className="container">
        <h1>{!loading ? content : "Loading Data..."}</h1>
      </div>
    </div>
  );
}
