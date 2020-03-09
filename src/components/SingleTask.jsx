import React from "react";
import "../App.css";

const SingleTask = props => {

  const editSingleTask = () => {
    props.triggerEdit(props.list);
  };

  const deleteSingleTask = () => {
    props.triggerDelete(props.list);
  };

  return (
    <React.Fragment>
      <tbody >
        <tr id="fadeText">
          {/* <th scope="row">#</th> */}
          <td>{props.list.task}</td>
          <td>{props.list.priority}</td>
          <td>
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={editSingleTask}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={deleteSingleTask}
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
};

export default SingleTask;
