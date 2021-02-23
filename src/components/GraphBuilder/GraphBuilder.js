import React, { useState, useMemo } from "react";
import Node from "./Node/Node";
import exampleInput from "../../example_input.json";
import styles from "./GraphBuilder.module.css";

const GraphBuilder = () => {
  // set state default state to the provided example input
  const [input, setInput] = useState(exampleInput);
  // destructure input nodes and concepts
  const { nodes, concepts } = input;
  // creates arrays of parent nodes (without children), child nodes (with children), and individual nodes (w/o parents or children)
  let parentNodes = nodes.filter((v) => v.children !== null);
  let childNodes = nodes.filter((v) => v.children === null);
  const individualNodes = childNodes.filter((v) => v.parent === null);

  return (

    <div>
      <ul className={styles.list}>
        {parentNodes.map((v) => {
          return (
            <Node
              key={v.id}
              text={v.text}
              children={childNodes.filter((child) => child.parent === v.id)}
            />
          );
        })}
        {individualNodes.map((v) => {
          return <Node key={v.id} text={v.text} />;
        })}
      </ul>
    </div>
  );
};

export default GraphBuilder;
