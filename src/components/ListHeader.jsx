import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import React from "react";

const ListHeader = () => {
  return (
    <React.Fragment>
      <div className="listName" >
        <h1 id="fadeText">Task Tracker</h1>
        </div>
    </React.Fragment>
  );
}

export default ListHeader;
