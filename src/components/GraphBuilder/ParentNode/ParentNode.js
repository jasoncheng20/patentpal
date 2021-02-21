import React, { useState } from "react";
import ChildNode from "../ChildNode/ChildNode";
import styles from "./ParentNode.module.css";
import TextEditor from "../TextEditor/TextEditor";

const ParentNode = (props) => {
  const [showChildren, setShowChildren] = useState(true);

  const toggleChildrenView = () => {
    if (props.children !== undefined) {
      setShowChildren(!showChildren);
    }
  };

  const children =
    props.children &&
    showChildren &&
    props.children.map((v) => <ChildNode key={v.id} text={v.text} />);

  let color = showChildren ? "blue" : "green";

  return (
    <div>
      <li
        className={styles.listItem}
        style={{ color: color }}
        onClick={toggleChildrenView}
      >
        <TextEditor text={props.text} />
      </li>
      <ul>{children}</ul>
    </div>
  );
};
export default ParentNode;
