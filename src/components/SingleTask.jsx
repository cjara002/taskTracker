import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";


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
            {/* <button
              className="btn btn-outline-dark btn-sm"
              onClick={editSingleTask}
            >
              Edit
            </button> */}

            <em
                    className="fa-1x mr-2 fas fa-pen"
                    id="TaskLightUp"
                    onClick={editSingleTask}
                    style={{ float: "center", cursor: "pointer" }}
                    data-toggle="tooltip"
                    title="Edit Task"
                  >
                  </em>
          </td>
          <td>
            {/* <button
              className="btn btn-outline-dark btn-sm"
              onClick={deleteSingleTask}
            >
              Remove
            </button> */}

            <em
                    className="fa-1x mr-2 fas fa-trash"
                    id="TaskLightUp"
                    onClick={deleteSingleTask}
                    style={{ float: "center", cursor: "pointer" }}
                    data-toggle="tooltip"
                    title="Remove Task"
                  >
                  </em>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
};

export default SingleTask;
