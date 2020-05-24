import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./components/List.jsx";
import ListFilter from "./components/ListFilter.jsx";
import ListFooter from "./components/ListFooter.jsx";
import ListHeader from "./components/ListHeader.jsx";
import Quote from "./components/Quotes";
import React from "react";
import Swal from "sweetalert2";
import { Card, CardHeader, CardBody, CardText } from "reactstrap";

class App extends React.Component {
  state = {
    itemPriority: [],
    items: [],
    noItems: false,
    singleQuote: [],
  };

  componentDidMount() {
    const existingTasks = JSON.parse(localStorage.getItem("myTasks"));
    if (existingTasks) {
      this.storageList();
      this.priorityValue();
      this.setQuote(Quote);
    } else {
      this.setQuote(Quote);
      this.showFilter();
    }
  }

  storageList = () => {
    const taskList = JSON.parse(localStorage.getItem("myTasks"));
    this.setState(() => ({
      items: taskList,
    }));
  };

  priorityValue = () => {
    const priority = ["High", "Medium", "Low"];
    this.setState(() => ({
      itemPriority: priority.map((priorityType) => ({
        priorityType,
        isActive: false,
      })),
    }));
  };

  taskFilter = (type, i) => {
    return (
      <ListFilter taskType={type} key={i} triggerActive={this.activeFilter} />
    );
  };

  activeFilter = (item) => {
    this.setState(
      (prevstate) => ({
        itemPriority: prevstate.itemPriority.map((activeType) => {
          if (activeType.priorityType === item) {
            activeType.isActive = !activeType.isActive;
          }
          return activeType;
        }),
      }),
      () => this.filterTaskDisplay(this.state.itemPriority)
    );
  };

  filterTaskDisplay = (taskItem) => {
    const filteredPriorityType = taskItem.filter(
      (priorityType) => priorityType.isActive
    );
    if (filteredPriorityType.length === 0) {
      this.storageList();
    } else {
      const priority = filteredPriorityType.map((type) => type);
      this.populateFilteredTask(priority);
    }
  };

  populateFilteredTask = (priority) => {
    const filteredTask = [];
    const currentTask = JSON.parse(localStorage.getItem("myTasks"));

    for (let i = 0; i < currentTask.length; i++) {
      const singleTask = currentTask[i].priority;
      const singlePriority = priority[0].priorityType;

      if (singleTask === singlePriority) {
        filteredTask.push(currentTask[i]);
      }
    }
    this.setState(() => ({
      items: filteredTask,
    }));
  };

  setQuote = (singleQuote) => {
    let single = [];
    for (let i = 0; i < singleQuote.length; i++) {
      i = Math.floor(Math.random() * (singleQuote.length + 1) + 1);
      let response = singleQuote[i].quotes;
      single.push(response);
      break;
    }
    this.setState(() => ({
      singleQuote: single,
    }));
  };

  clearTask = () => {
    Swal.fire({
      title: "Before you proceed...",
      text: "Are you sure you want to clear your tasks?",
      showCancelButton: true,
      confirmButtonColor: "#d33 ",
      cancelButtonColor: "#090b19",
      confirmButtonText: "Clear All Task",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Cleared all task!").then(localStorage.clear());
      }
    });
  };

  showFilter = () => {
    this.setState(() => ({
      noItems: true,
    }));
  };

  render() {
    return (
      <React.Fragment>
        <ListHeader />
        {this.state.noItems ? (
          <div className="row">
            <div className="col-lg-3" id="sideList">
              <div>
                <Card style={{ margin: "2.5%" }}>
                  <CardHeader tag="h3" className="text-center" id="quoteHeader">
                    Quote
                  </CardHeader>
                  <CardBody id="quoteBody">
                    <CardText>{this.state.singleQuote}</CardText>
                  </CardBody>
                </Card>
              </div>
            </div>

            <div className="col-lg-9 App" id="taskArea">
              <List item={this.state.items} />
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-3" id="sideList">
              <div className="card b" style={{ margin: "2.5%" }} id="fadeText">
                <div className="list-group">
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>My Task</strong>
                    <span className="float-right badge">
                      {this.state.items && this.state.items.length}
                    </span>
                  </div>
                </div>
                <div className="list-group">
                  {this.state.itemPriority.map(this.taskFilter)}
                </div>
              </div>

              <button
                style={{ margin: "2.5%" }}
                className="btn btn-dark btn-block"
                id="fadeText"
                onClick={this.clearTask}
              >
                Clear
              </button>

              <div>
                <Card style={{ margin: "2.5%" }}>
                  <CardHeader tag="h3" className="text-center" id="quoteHeader">
                    Quote
                  </CardHeader>
                  <CardBody id="quoteBody">
                    <CardText>{this.state.singleQuote}</CardText>
                  </CardBody>
                </Card>
              </div>
            </div>

            <div className="col-lg-9 App" id="taskBackground">
              <List item={this.state.items} />
            </div>
          </div>
        )}

        <ListFooter />
      </React.Fragment>
    );
  }
}

export default App;
