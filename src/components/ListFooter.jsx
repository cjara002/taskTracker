import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import React from "react";

const ListFooter = () => {
  return (
    <React.Fragment>
      <div className="listFoot" id="fadeText">
        <div className="footerArea">
          <h4 id="fadeText" className="footerTitle">
            CONNECT
          </h4>
          <div>
            <div className="container" id="footerConnect">
              <a href="https://github.com/cjara002/taskTracker">GITHUB</a>{" "}
              <br />
              <a href="https://www.linkedin.com/in/carlos-j-jara/">LINKEDIN</a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ListFooter;
