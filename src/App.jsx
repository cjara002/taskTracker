import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./components/List.jsx";
import ListFilter from "./components/ListFilter.jsx";
import ListHeader from "./components/ListHeader.jsx";
import ListFooter from "./components/ListFooter.jsx";
import React from "react";
import Swal from "sweetalert2";
import Quote from "./components/Quotes";
import { Card, CardHeader, CardBody, CardText } from "reactstrap";

class App extends React.Component {
  state = {
    items: [],
    itemPriority: [],
    itemFilter: false,
    quote: [],
    singleQuote: [],
    noItems: false,
  };

  componentDidMount() {
    if (localStorage.length > 0) {
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

  clearTask = () => {
    Swal.fire({
      title: "Before you proceed...",
      text: "Are you sure you want to clear your tasks?",
      showCancelButton: true,
      confirmButtonColor: "#042A38",
      cancelButtonColor: "#d33",
      confirmButtonText: "Clear All Task",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Cleared all task!").then(localStorage.clear());
      }
    });
  };

  showFilter = () => {
    this.setState((prevState) => ({
      noItems: !prevState.noItems,
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
                  <CardHeader tag="h3" className="text-center">
                    Quote
                  </CardHeader>
                  <CardBody>
                    <CardText>{this.state.singleQuote}</CardText>
                  </CardBody>
                </Card>
              </div>
            </div>

            <div className="col-lg-9 App">
              <List item={this.state.items} />
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-3" id="sideList">
              <div className="card b" style={{ margin: "2.5%" }} id="fadeText">
                <div className="list-group">
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <strong className="text-muted">My Task</strong>
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
                className="btn btn-outline-dark btn-lg btn-block"
                id="fadeText"
                onClick={this.clearTask}
              >
                Clear
              </button>

              <div>
                <Card style={{ margin: "2.5%" }}>
                  <CardHeader tag="h3" className="text-center">
                    Quote
                  </CardHeader>
                  <CardBody>
                    <CardText>{this.state.singleQuote}</CardText>
                  </CardBody>
                </Card>
              </div>
            </div>

            <div className="col-lg-9 App">
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
