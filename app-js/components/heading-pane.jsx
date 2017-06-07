import React from 'react';

function HeadingPane(props) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">{props.panelHeader}</div>

      {props.children}
    </div>
  );
}

export default HeadingPane;
