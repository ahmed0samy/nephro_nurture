'use client';
import { handleUserFormData, saveNewUserData } from "@/lib/actions";
import styles from "./edit.module.scss";
import { useActionState } from "react";
export default function Page() {
  const [state, formAction] = useActionState(handleUserFormData, undefined);

  return (
    <div className="container">
      <form className={styles.form} action={formAction}>
        <label htmlFor="userID">User ID:</label>
        <input required type="text" id="userID" name="userID" />

        <label htmlFor="name">Name:</label>
        <input required type="text" id="name" name="name" />

        <label htmlFor="weight">Weight (in Kg):</label>
        <input required type="number" id="weight" name="weight" />

        <label htmlFor="age">Age:</label>
        <input required type="number" id="age" name="age" />

        <label htmlFor="worktime">Work Time</label>
        <input required type="text" id="worktime" name="worktime" />

        <label htmlFor="gender">Gender</label>
        <select name="gender" id="gender" required>
          <option value="1">male</option>
          <option value="2">female</option>
        </select>

        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
