import React, { useState, useMemo } from "react";
import ParentNode from "./ParentNode/ParentNode";
import exampleInput from "../../example_input.json";
import styles from "./GraphBuilder.module.css";
import TextEditor from "./TextEditor/TextEditor";

const GraphBuilder = () => {
  // set state default state to the provided example input
  const [input, setInput] = useState(exampleInput);
  // destructure input nodes and concepts
  const { nodes, concepts } = input;
  // creates arrays of parent nodes (without children), child nodes (with children), and individual nodes (w/o parents or children)
  const parentNodes = nodes.filter((v) => v.children !== null);
  const childNodes = nodes.filter((v) => v.children === null);
  const individualNodes = childNodes.filter((v) => v.parent === null);
  console.log(parentNodes);
  console.log(childNodes);

  return (
    <div>
      <ul className={styles.list}>
        {parentNodes.map((v) => {
          return (
            <div>
              <ParentNode
                key={v.id}
                text={v.text}
                children={childNodes.filter((child) => child.parent === v.id)}
              />
            </div>
          );
        })}
        {individualNodes.map((v) => {
          return <ParentNode key={v.id} text={v.text} />;
        })}
      </ul>
    </div>
  );
};

export default GraphBuilder;
