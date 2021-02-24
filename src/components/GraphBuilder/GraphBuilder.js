import React, { useState } from "react";
import exampleInput from "../../example_input.json";

import Node from "./Node/Node";
import styles from "./GraphBuilder.module.css";

const initialInput = { nodes: [{ id: 1, text: "" }] };

const GraphBuilder = () => {
  // set state default state to the provided example input
  const [input, setInput] = useState(initialInput);
  // destructure input nodes and concepts
  const { nodes } = input;
  // create arrays of parent nodes (without children), child nodes (with children),
  // and individual nodes (w/o parents or children)
  let parentNodes = nodes.filter((v) => v.children !== null);
  let childNodes = nodes.filter((v) => v.children === null);
  const individualNodes = childNodes.filter((v) => v.parent === null);

  const addNode = (key) => {
    // duplicate existing state
    let duplicatedInput = [...nodes];
    // find position of existing node
    let selectedIndex
    for (let i=0; i<duplicatedInput.length; i++) {
      if (duplicatedInput[i].id === key){
        selectedIndex = i
      }
    }
    // create new node
    let newNode = { id: Math.random(), text: "" }
    duplicatedInput.splice(selectedIndex+1, 0, newNode)
    // set new state
    setInput({ nodes: duplicatedInput });
  };

  const deleteNode = (key) => {
    // duplicate existing state
    let copiedInput = [...nodes];
    // delete select node
    let newArr = copiedInput.filter((v) => v.id !== key);
    // set new state
    setInput({ nodes: newArr });
  };

  const importMockData = () => {
    setInput(exampleInput);
  };

  const clear = () => {
    setInput(initialInput);
  };

  return (
    <div>
      <button className={styles.button} onClick={importMockData}>
        Import mock data
      </button>
      <button className={styles.button} onClick={clear}>
        Clear
      </button>
      <ul className={styles.list}>
        {parentNodes.map((v) => {
          return (
            <Node
              key={v.id}
              text={v.text}
              children={childNodes.filter((child) => child.parent === v.id)}
              addNode={addNode}
              deleteNode={deleteNode}
              id={v.id}
            />
          );
        })}
        {individualNodes.map((v) => {
          return (
            <Node
              key={v.id}
              text={v.text}
              addNode={addNode}
              deleteNode={deleteNode}
              id={v.id}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default GraphBuilder;
