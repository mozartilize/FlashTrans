import React from 'react';

function HeadingTable(props) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">{props.panelHeader}</div>

      <table className="table">
        {props.headers}
        {props.body}
      </table>
    </div>
  );
}

export default HeadingTable;
