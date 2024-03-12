// External libraries
import * as React from "react";

// Styled
import "./styles.scss";

function Message(props: { children: React.ReactChild }) {
  return (
    <div className="Message">
      {props.children}
    </div>
  );
}

export default Message;