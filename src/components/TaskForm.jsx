import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input  } from "reactstrap";
import React from "react";


class TaskForm extends React.Component {
  
  state = {
    task: "",
    priority: ""
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isEditing !== nextProps.isEditing) {
      const item = nextProps.form;
      this.setState({
        task: item.task,
        priority: item.priority
      });
    }
  }

  populateTaskOnSubmit = () =>{
    // what is this for again?
    this.props.populateTask()
  }

  handleSubmit = () => {
    const allTask = [];
    if (this.props.isEditing === false && localStorage.length > 0) {
      const existingTask = JSON.parse(localStorage.getItem("myTasks"));
      existingTask.forEach(task => {
        allTask.push(task);
      });

      const myTasks = this.state;

      allTask.push(myTasks);
      localStorage.setItem("myTasks", JSON.stringify(allTask))
        // this.populateTaskOnSubmit()


    } else if (this.props.isEditing === true && localStorage.length > 0) {
      const existingTask = JSON.parse(localStorage.getItem("myTasks"));
      for (let i = 0; i < existingTask.length; i++) {
        let singleTask = existingTask[i];
        if (singleTask.task === this.props.form.task) {
          existingTask.splice(i, 1);
          //maybe put the replace array method here to put the update task where I spliced the old task. 
        }
      }
      existingTask.forEach(task => {
        allTask.push(task);
      });

      const myTasks = this.state;

      allTask.push(myTasks);

      localStorage.setItem("myTasks", JSON.stringify(allTask));

      // this.populateTaskOnSubmit()

    } else {
      const myTasks = this.state;
      allTask.push(myTasks);
      localStorage.setItem("myTasks", JSON.stringify(allTask));
      // this.populateTaskOnSubmit()
    };
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.props.isModal}>
          <ModalHeader
            toggle={
              this.props.isEditing
                ? this.props.toggle
                : this.props.toggleAddQuestion
            }
          >
           <div> {this.props.isEditing ? "Update Task" : "Add New Task"}</div>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Task</Label>
                <Input
                  type="text"
                  name="task"
                  value={this.state.task}
                  onChange={this.changeHandler}
                ></Input>
              </FormGroup>

              <FormGroup>
                <Label>Priority</Label>
                <Input
                  type="select"
                  name="priority"
                  value={this.state.priority}
                  onChange={this.changeHandler}
                >
                  <option>----</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>
              {this.props.isEditing ? "Update" : "Add"}
            </Button>{" "}
            <Button
              color="secondary"
              onClick={
                this.props.isEditing
                  ? this.props.toggle
                  : this.props.toggleAddQuestion
              }
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default TaskForm;
