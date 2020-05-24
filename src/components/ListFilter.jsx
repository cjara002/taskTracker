import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ListStyle.css";

class ListFilter extends React.Component {
  handleClickToggle = () => {
    this.props.triggerActive(this.props.taskType.priorityType);
  };

  getPriorityType = (priority) => {
    switch (priority) {
      case "High":
        return <circle cx="50%" cy="50%" r="10" fill="red" />;
      case "Medium":
        return <circle cx="50%" cy="50%" r="10" fill="yellow" />;
      case "Low":
        return <circle cx="50%" cy="50%" r="10" fill="green" />;
      default:
        return <span className="circle bg-dark mr-2"></span>;
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="list-group" style={{ cursor: "pointer" }}>
          <div
            className={
              this.props.taskType.isActive
                ? "active list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-0"
                : "list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-0"
              // : "disabled list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-0"
            }
            onClick={this.handleClickToggle}
          >
            <span className="container">
              <svg width="40" height="40">
                {this.getPriorityType(this.props.taskType.priorityType)}
              </svg>
            </span>
            <span> {this.props.taskType.priorityType}</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ListFilter;
