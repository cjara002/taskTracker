import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import SingleTask from "./SingleTask";
import Swal from "sweetalert2";
import { Table } from "reactstrap";
import TaskForm from "./TaskForm";

class List extends React.Component {
  state = {
    items: [],
    noItems: false,
    form: {
      task: "",
      priority: "",
    },
    modal: false,
    isEditing: false,
  };

  componentDidMount() {
    if (localStorage.length > 0) {
      this.storageList();
    } else {
      this.showMessage();
    }
  }

  storageList = () => {
    const taskList = JSON.parse(localStorage.getItem("myTasks"));
    this.setState(() => ({
      items: taskList,
    }));
  };

  showMessage = () => {
    this.setState((prevState) => ({
      noItems: !prevState.noItems,
    }));
  };

  editTask = (item) => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      isEditing: !prevState.isEditing,
      form: {
        task: item.task,
        priority: item.priority,
      },
    }));
  };

  deleteTask = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#042A38",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!").then(this.deleteSingleTask(item));
      }
    });
  };

  deleteSingleTask = (item) => {
    const allTask = [];
    const existingTask = JSON.parse(localStorage.getItem("myTasks"));
    for (let i = 0; i < existingTask.length; i++) {
      let singleTask = existingTask[i];
      if (singleTask.task === item.task) {
        existingTask.splice(i, 1);
      }
    }
    existingTask.forEach((task) => {
      allTask.push(task);
    });
    localStorage.setItem("myTasks", JSON.stringify(allTask));
  };

  fillList = (aList, i) => (
    <SingleTask
      list={aList}
      key={i}
      triggerEdit={this.editTask}
      triggerDelete={this.deleteTask}
    />
  );

  toggle = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
      modal: !prevState.modal,
    }));
  };

  toggleAddQuestion = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    return (
      <React.Fragment>
        {this.state.noItems ? (
          <div style={{ margin: "20%" }}>
            <h1>Let's get the day started!</h1>
            <p>Please add a new task.</p>
            <button
              onClick={this.toggleAddQuestion}
              className="btn btn-dark btn-block"
            >
              Add Task{" "}
            </button>
          </div>
        ) : (
          <Table hover>
            <thead>
              <tr id="taskHeadColor">
                {/* <th>#</th> */}
                <th>Task</th>
                <th>Priority</th>
                <th></th>
                <th></th>
                <th>
                  <em
                    className="fa-1x mr-2 fas fa-plus"
                    onClick={this.toggleAddQuestion}
                    style={{ float: "center", cursor: "pointer" }}
                    data-toggle="tooltip"
                    title="Add Task"
                  ></em>
                </th>
              </tr>
            </thead>
            {this.props.item.length > 0 && this.props.item.map(this.fillList)}
          </Table>
        )}
        <TaskForm
          loadTask={this.storageList}
          isModal={this.state.modal}
          toggle={this.toggle}
          toggleAddQuestion={this.toggleAddQuestion}
          form={this.state.form}
          isEditing={this.state.isEditing}
          populateTask={this.storageList}
        />
      </React.Fragment>
    );
  }
}

export default List;
