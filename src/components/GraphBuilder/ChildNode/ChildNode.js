import React from "react";
import styles from "./ChildNode.module.css";
import TextEditor from "../TextEditor/TextEditor";

const ChildNode = (props) => {
  return (
    <li className={styles.child}>
      <TextEditor text={props.text} />
    </li>
  );
};

export default ChildNode;
