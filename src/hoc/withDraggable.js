import React, { useState } from "react";
import Draggable from "react-draggable";

const withDraggable = (WrappedComponent) => {
  return (props) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // update our position whenever onDrag is triggered
    const trackPos = (data) => {
      setPosition({ x: data.x, y: data.y });
    };

    return (
      <Draggable
        axis="y"
        defaultPosition={{ x: 0, y: 0 }}
        grid={[25, 25]}
        scale={1}
        onDrag={(e, data) => trackPos(data)}
      >
        <div style={{ cursor: "move" }}>
          <WrappedComponent {...props} />
        </div>
      </Draggable>
    );
  };
};
export default withDraggable;
