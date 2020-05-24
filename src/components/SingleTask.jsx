import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SingleTask = (props) => {
  const editSingleTask = () => {
    props.triggerEdit(props.list);
  };

  const deleteSingleTask = () => {
    props.triggerDelete(props.list);
  };

  return (
    <React.Fragment>
      <tbody>
        <tr id="SingleTaskColor">
          <td>{props.list.task}</td>
          <td>{props.list.priority}</td>
          <td>
            <em
              className="fa-1x mr-2 fas fa-pen"
              id="TaskLightUp"
              onClick={editSingleTask}
              style={{ float: "center", cursor: "pointer" }}
              data-toggle="tooltip"
              title="Edit Task"
            ></em>
          </td>
          <td>
            <em
              className="fa-1x mr-2 fas fa-trash"
              id="TaskLightUp"
              onClick={deleteSingleTask}
              style={{ float: "center", cursor: "pointer" }}
              data-toggle="tooltip"
              title="Remove Task"
            ></em>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
};

export default SingleTask;
