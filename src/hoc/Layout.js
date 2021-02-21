import React from "react";
import styles from "./Layout.module.css";
import Navbar from "../components/Navbar/Navbar";
import SheetContainer from "../components/SheetContainer/SheetContainer";

const Layout = (props) => {
  return (
    <>
      <Navbar />
      <main className={styles.layoutContainer}>
        <SheetContainer>{props.children}</SheetContainer>
      </main>
    </>
  );
};

export default Layout;
