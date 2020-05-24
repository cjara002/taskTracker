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
    //adding additional tasks
    if (this.props.isEditing === false && localStorage.length > 0) {
      this.setState(() => ({
        formData: values,
      }));
      this.AddAdditionalTasks();
      //Editing a Task
    } else if (this.props.isEditing === true && localStorage.length > 0) {
      this.setState(() => ({
        formData: values,
      }));
      this.EditingATask();

      //Adding my first task
    } else {
      this.setState(() => ({
        formData: values,
      }));
      this.AddingMyFirstTask();
    }
    // debugger;
    //     resetForm(this.state.formData);
  };

  AddAdditionalTasks = () => {
    const allTasks = [];
    const existingTasks = JSON.parse(localStorage.getItem("myTasks"));
    existingTasks.forEach((task) => {
      allTasks.push(task);
    });
    allTasks.push(this.state.formData);
    localStorage.setItem("myTasks", JSON.stringify(allTasks));
  };

  EditingATask = () => {
    const allTasks = [];
    let existingTasks = JSON.parse(localStorage.getItem("myTasks"));
    for (let i = 0; i < existingTasks.length; i++) {
      if (this.props.form.task === existingTasks[i].task) {
        existingTasks.splice(i, 1);
        existingTasks.splice(i, 0, this.state.formData);
      }
    }

    existingTasks.forEach((task) => {
      allTasks.push(task);
    });

    // allTasks.push(this.state.formData);
    localStorage.setItem("myTasks", JSON.stringify(allTasks));
  };

  AddingMyFirstTask = () => {
    const allTasks = [];
    allTasks.push(this.state.formData);
    localStorage.setItem("myTasks", JSON.stringify(allTasks));
    // this.populateTaskOnSubmit()
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
