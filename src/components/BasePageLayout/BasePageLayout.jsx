import UpperNavBar from "../UpperNavBar.jsx";
import SideNavBar from "../SideNavBar/SideNavBar.jsx";
import styles from "./BasePageLayout.module.css";

export default function BasePageLayout({ children }) {
  return (
    <>
      <div>
        <UpperNavBar/>
        <div className={styles.customBr}></div>
        <div className={styles.innerWrapper}>
          <SideNavBar/>
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}