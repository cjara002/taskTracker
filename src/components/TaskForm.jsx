import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import React from "react";
import { Formik, Field } from "formik";
import TaskFormSchema from "./TaskFormSchema";

class TaskForm extends React.Component {
  state = {
    formData: {
      task: "",
      priority: "",
    },
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isEditing !== nextProps.isEditing) {
      const item = nextProps.form;
      this.setState({
        formData: {
          task: item.task,
          priority: item.priority,
        },
      });
    }
  }

  // resetState = () => {
  //   debugger;
  //   this.setState(() => ({
  //     formData: {
  //       task: "",
  //       priority: ""
  //     }
  //   }));
  // };

  // handleSubmit = (values, { resetForm }) => {
  handleSubmit = (values) => {
    const allTask = [];
    if (this.props.isEditing === false && localStorage.length > 0) {
      const existingTask = JSON.parse(localStorage.getItem("myTasks"));
      existingTask.forEach((task) => {
        allTask.push(task);
      });

      this.setState(() => ({
        formData: values,
      }));

      const myTasks = this.state.formData;

      allTask.push(myTasks);
      localStorage.setItem("myTasks", JSON.stringify(allTask));
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
      existingTask.forEach((task) => {
        allTask.push(task);
      });

      this.setState(() => ({
        formData: values,
      }));

      const myTasks = this.state.formData;

      allTask.push(myTasks);

      localStorage.setItem("myTasks", JSON.stringify(allTask));

      // this.populateTaskOnSubmit()
    } else {
      this.setState(() => ({
        formData: values,
      }));

      const myTasks = this.state.formData;
      allTask.push(myTasks);
      localStorage.setItem("myTasks", JSON.stringify(allTask));
      // this.populateTaskOnSubmit()
    }
    // debugger;
    //     resetForm(this.state.formData);
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={TaskFormSchema}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
              isValid,
              isSubmitting,
            } = props;
            return (
              <Modal isOpen={this.props.isModal}>
                <ModalHeader
                  toggle={
                    this.props.isEditing
                      ? this.props.toggle
                      : this.props.toggleAddQuestion
                  }
                  className
                  // id="modalHeader"
                >
                  {this.props.isEditing ? "Update Task" : "Add Task"}
                </ModalHeader>
                <Form onSubmit={handleSubmit}>
                  <ModalBody>
                    <FormGroup>
                      <Label>Task</Label>
                      <Field
                        name="task"
                        type="text"
                        value={values.task}
                        placeholder="Please provide a task"
                        className={
                          errors.task && touched.task
                            ? "form-control error"
                            : "form-control"
                        }
                      />
                      {errors.task && touched.task && (
                        <span className="input-feedback text-danger">
                          {errors.task}
                        </span>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label>Priority</Label>
                      <Field
                        name="priority"
                        type="select"
                        component="select"
                        value={values.priority}
                        className={
                          errors.priority && touched.priority
                            ? "form-control error"
                            : "form-control"
                        }
                      >
                        <option defaultValue="Choose">Choose a priority</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                        {errors.priority && touched.priority && (
                          <span className="input-feedback text-danger">
                            {errors.priority}
                          </span>
                        )}
                      </Field>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    {/* <Button
                      style={{
                        border: "none",
                        background: "none",
                        color: "black",
                      }}
                      onClick={
                        props.isEditing
                          ? this.props.toggle
                          : this.props.toggleAddQuestion
                      }
                    >
                      Cancel
                    </Button> */}

                    <Button
                      color="primary"
                      type="submit"
                      disabled={!isValid || isSubmitting}
                    >
                      {this.props.isEditing ? "Update" : "Add"}
                    </Button>
                  </ModalFooter>
                </Form>
              </Modal>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

export default TaskForm;
