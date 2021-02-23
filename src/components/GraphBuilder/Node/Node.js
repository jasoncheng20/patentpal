import React, { useState } from "react";
import ChildNode from "../ChildNode/ChildNode";
import TextEditor from "../TextEditor/TextEditor";
import withDraggable from "../../../hoc/withDraggable";

const Node = (props) => {
  const [showChildren, setShowChildren] = useState(true);

  const toggleChildrenView = () => {
    if (props.children !== undefined) {
      setShowChildren(!showChildren);
    }
  };

  // if showChildren is true and props.children exists, render a Child Node
  const children =
    props.children &&
    showChildren &&
    props.children.map((v) => <ChildNode key={v.id} text={v.text} />);

  let color = showChildren ? "blue" : "green";

  return (
    <div>
      <li
        style={{ color: color }}
        onClick={toggleChildrenView}
      >
        <TextEditor text={props.text} />
      </li>
      <ul>{children}</ul>
    </div>
  );
};
export default withDraggable(Node);
