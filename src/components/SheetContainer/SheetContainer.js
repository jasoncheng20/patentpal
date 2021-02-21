import React from "react";
import styles from "./SheetContainer.module.css";

const SheetContainer = (props) => (
  <div className={styles.container}>{props.children}</div>
);

export default SheetContainer;
