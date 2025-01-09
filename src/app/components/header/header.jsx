'use client';
import Link from "next/link";
import styles from "./header.module.scss";
import { useEffect, useRef, useState } from "react";
import { getUserData } from "@/lib/actions";
export default function Header() {
  const element1Ref = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (element1Ref.current) {
      setHeight(element1Ref.current.offsetHeight);
    }
  }, []);
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        try {

          const response = await getUserData({ userID: "123" });
          if (response){
            const data = JSON.parse(response);
            setData(data);
          } else {
            console.log('error while request data, from header.jsx')
          }
        } catch (error) {``
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
  return (
    <>
    <header className={styles.header} ref={element1Ref}>
      <div className={styles.relativeheader}>
        <Link href={'/'}>
        <span className={styles.logo}>Nephro Nurture</span>
        </Link>
        <span className="space"></span>
        <nav className="navbar">
          <ul>
            <Link href={"/edit_user"}>
              <li>{!loading && data? 'Edit':'Add'} User Data</li>
            </Link>
            {!loading && data? <Link href={"/view_user"}>
              <li>View User Data</li>
            </Link>:''}
            
          </ul>
        </nav>
      </div>
    </header>
    <div className={styles.gap} style={{height: `${height}px`}}></div>
  </>
  );
}
