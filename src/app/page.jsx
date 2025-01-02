"use client";
import { getUserData } from "@/lib/actions";
import styles from "./home.module.scss";
import { useEffect, useState } from "react";
import { get, onValue, ref, set } from "firebase/database";
import { database } from "@/lib/firebase";
export default function Page() {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [pumpStatus, setPumpStatus] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData({ userID: "123" });
        const data = JSON.parse(response);
        console.log(data.name);
        setData(data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const userRef = ref(database, "users/");
  //   onValue(userRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log('firebase data:',data);
  //   });

  // }, []);
  const usersRef = ref(database, "pumpStatus");

  useEffect(() => {
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Data changed:", data);
      console.log(snapshot.val()); // Output the data as an object
      setPumpStatus(data);
    });
  }, []);

  return (
    <div className={styles.home}>
      <div className="container">
        <h1>
          {!loading
            ? data
              ? `Hello, ${data}`
              : "Please provide your data"
            : "Loading..."}
        </h1>

        <div className={styles.pumpSwitch}>
          <label className={styles.switch} >
            <input className={styles.cb} type="checkbox" checked={pumpStatus}  onChange={()=>{set(usersRef, !pumpStatus)}} />
            <span className={styles.toggle}>
              <span className={styles.left}>Sucktion</span>
              <span className={styles.right}>Pumping</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
