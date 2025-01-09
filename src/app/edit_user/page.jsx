'use client';
import { getUserData, handleUserFormData, saveNewUserData } from "@/lib/actions";
import styles from "./edit.module.scss";
import { useActionState, useEffect, useState } from "react";
import Loading from "../components/loading/loading";
export default function Page() {
  const [state, formAction] = useActionState(handleUserFormData, undefined);
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
    const content = <><label htmlFor="userID">User ID:</label>
    <input required type="text" id="userID" name="userID" readOnly value={'123'} style={{opacity: 0.5}}  />

    <label htmlFor="name">Name:</label>
    <input required type="text" id="name" name="name" defaultValue={data?.name || ''}/>

    <label htmlFor="weight">Weight (in Kg):</label>
    <input required type="number" id="weight" name="weight" defaultValue={data?.weight || ''}/>

    <label htmlFor="age">Age:</label>
    <input required type="number" id="age" name="age" defaultValue={data?.age || ''}/>
    
    
    <label htmlFor="flow">Flow Rate (in mL/hour):</label>
    <input required type="number" id="flow" name="flowRate" defaultValue={data?.flowRate || 15000}/>

    {/* <label htmlFor="worktime">Work Time</label>
    <input required type="text" id="worktime" name="worktime" /> */}

    <label htmlFor="gender">Gender</label>
    <select name="gender" id="gender" required  defaultValue={data?.gender || ''}>
      <optgroup label="Choose your gender">

      <option value="1">male</option>
      <option value="2">female</option>
      </optgroup>
    </select>

    <div>
      <input type="submit" value="Submit" />
    </div></>
  return (
    <div className="container">
      <form className={styles.form} action={formAction}>
        {!loading ? content : <Loading/>}
      </form>
    </div>
  );
}
