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
      case "code":
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
          if (event.key === "Tab") {
            event.preventDefault()
            // Determine whether any of the currently selected blocks are code blocks.
            const [match] = Editor.nodes(editor, {
              match: n => n.type === 'code',
            })
            // Toggle the block type depending on whether there's already a match.
            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              { match: n => Editor.isBlock(editor, n) }
            
            );
          }
        }}
      />
    </Slate>
  );
};

const IndentList = props => {
  return (
    <ul>
      <li>{props.children}</li>
    </ul>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

export default TextEditor;
