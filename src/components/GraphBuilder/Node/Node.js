import React, { useState } from "react";
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
    props.children.map((v) => (
      <Node
        key={v.id}
        text={v.text}
        addNode={props.addNode}
        deleteNode={props.deleteNode}
        id={v.id}
      />
    ));

  return (
    <div>
      <li onClick={toggleChildrenView}>
        <TextEditor
          text={props.text}
          id={props.id}
          addNode={props.addNode}
          deleteNode={props.deleteNode}
        />
      </li>
      <ul>{children}</ul>
    </div>
  );
};
export default withDraggable(Node);
