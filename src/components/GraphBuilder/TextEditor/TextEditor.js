import React, { useState, useMemo, useCallback } from "react";
import { createEditor, Editor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const TextEditor = (props) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      children: [{ text: props.text }],
    },
  ]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "tab":
        return <IndentList {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable
        renderElement={renderElement}
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          if (event.metaKey && event.key === "z") {
            // Prevent the ampersand character from being inserted.
            event.preventDefault();
            // Execute the `insertText` method when the event occurs.
            editor.insertText("😕");
          }
          if (event.key === "Tab" && event.shiftKey) {
            event.preventDefault();
            // move up tab hierarchy
            Transforms.setNodes(
              editor,
              { type: "paragraph" },
              { match: (n) => Editor.isBlock(editor, n) }
            );
          } else if (event.key === "Tab") {
            event.preventDefault();
            // move down tab hierarchy
            Transforms.setNodes(
              editor,
              { type: "tab" },
              { match: (n) => Editor.isBlock(editor, n) }
            );
          }
          // destructure text from state
          let { text } = value[0].children[0];
          if (event.key === "Enter" && text.length > 0) {
            event.preventDefault();
            props.addNode(props.id);
          } else if (event.key === "Enter") {
            event.preventDefault();
          }
          if (event.key === "Backspace" && text.length === 0) {
            event.preventDefault()
            props.deleteNode(props.id);
          }
          {/* console.log(event.key); */}
        }}
      />
    </Slate>
  );
};

const IndentList = (props) => {
  return (
    <ul>
      <li>{props.children}</li>
    </ul>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default TextEditor;
