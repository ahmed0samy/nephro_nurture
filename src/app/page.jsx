'use client';
import { getUserData } from "@/lib/actions";
import styles from "./home.module.scss";
import { useEffect, useState } from "react";
export default function Page() {
  const [data, setData] = useState('No data');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData({userID: "123"});
        const data = JSON.parse(response);
        console.log(data.name)
        setData(data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.home}>
      <div className="container">
        <h1>{!loading ? `Hello, ${data}`: ''}</h1>
      </div>
    </div>
  );
}
