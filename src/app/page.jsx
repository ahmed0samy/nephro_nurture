"use client";
import { getUserData, updateUserData } from "@/lib/actions";
import styles from "./home.module.scss";
import { useEffect, useRef, useState } from "react";
import { get, onValue, ref, set, update } from "firebase/database";
import { database } from "@/lib/firebase";
import Monitor from "./monitor";
import Loading from "./components/loading/loading";
import ErrorScreen from "./components/error/error";
export default function Page() {
  const [loading, setLoading] = useState(true);
  const [pumpStatus, setPumpStatus] = useState(false);
  const element1Ref = useRef(0);
  const [width, setWidth] = useState(0);
  const [data, setData] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await updateUserData({userID: '123'})

      } catch (err){
        console.log('error while updating, from page.jsx: ', err)
      }
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

  const usersRef = ref(database, "/pumpStatus");

  useEffect(() => {
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Data changed:", data);
      console.log(snapshot.val()); // Output the data as an object
      setPumpStatus(data);
    });
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    if (data) {
      return (
        <div className={styles.home}>
          <img src="/wave1.png" alt="" className={styles.wave1} />
          <img src="/wave2.png" alt="" className={styles.wave2} />
          <img src="/kidney.png" alt="" className={styles.kidney} />
          <img src="/matrix33.png" alt="" className={styles.matrix} />
          <div ref={element1Ref} className="container">
            <h1>
              {!loading
                ? data
                  ? `Hello, ${data.name}`
                  : "Please provide your data"
                : "Loading..."}
            </h1>
            <h2>User cycles</h2>
            <h3>You have {data?.nuExchanges} Exchanges Today</h3>
            <Monitor data={data} />

{/* 
            
            <div className={styles.pumpSwitch}>
              <label className={styles.switch}>
                <input
                  className={styles.cb}
                  type="checkbox"
                  checked={sucktion}
                  onChange={() => {
                    set(usersRef, !pumpStatus);
                    setsucktion(!sucktion)
                    setSucktion(sucktion)
                    
                  }}
                />
                <span className={styles.toggle}>
                  <span className={styles.left}>Off</span>
                  <span className={styles.right}>Sucktion</span>
                </span>
              </label>
            </div>
            
            
            <div className={styles.pumpSwitch}>
              <label className={styles.switch}>
                <input
                  className={styles.cb}
                  type="checkbox"
                  checked={pumping}
                  onChange={() => {
                    set(usersRef, !pumpStatus);
                    setpumping(!pumping)
                    setPumping(pumping)
                  }}
                />
                <span className={styles.toggle}>
                  <span className={styles.left}>Off</span>
                  <span className={styles.right}>Pumping</span>
                </span>
              </label>
            </div> */}
              <div className={styles.graphsContainer}>
                <img src="/graph1.jpg" alt="" />
                <img src="/graph2.jpg" alt="" />
                <img src="/graph3.jpg" alt="" />
              </div>
          </div>
        </div>
      );
    } else {
      return (
        <ErrorScreen
          heading={"Error Getting Data"}
          msg={
            "That may occur because weak internet connection or unexsistance of data in the database."
          }
        />
      );
    }
  }
}
