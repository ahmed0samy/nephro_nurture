'use client';
import Link from "next/link";
import styles from "./header.module.scss";
import { useEffect, useRef, useState } from "react";
export default function Header() {
  const element1Ref = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (element1Ref.current) {
      setHeight(element1Ref.current.offsetHeight);
    }
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
              <li>Edit User Data</li>
            </Link>
            <Link href={"/view_user"}>
              <li>View User Data</li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
    <div className={styles.gap} style={{height: `${height}px`}}></div>
  </>
  );
}
