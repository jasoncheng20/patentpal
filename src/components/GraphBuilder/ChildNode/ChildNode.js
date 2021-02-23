import React from "react";
import withDraggable from "../../../hoc/withDraggable";
import styles from "./ChildNode.module.css";
import TextEditor from "../TextEditor/TextEditor";

const ChildNode = (props) => {
  return (
    <div>
      <li className={styles.child}>
        <TextEditor text={props.text} />
      </li>
    </div>
  );
};

export default withDraggable(ChildNode);
