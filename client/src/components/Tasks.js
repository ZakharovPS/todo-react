import React, { Component } from 'react';
import TasksListItem from './TasksListItem';
import AddTask from './AddTask';
import StatusFilter from './StatusFilter';
import NameFilter from './NameFilter';
import Error from './Error';
import '../App.css';

class Tasks extends Component {
  state = { tasks: [], statusFilter: 'all', nameFilter: '', error: false }

  componentDidMount() {
    fetch('/getAll')
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(result => this.setState({ tasks: result.data }))
      .catch(err => {
        this.setState({ error: err.props });
      });
  }

  changeStatus = (id, status) => {
    fetch('/updateStatus/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        status: !status
      })
    })
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.status);
        } else {
          let tasks = this.state.tasks;
          const index = tasks.map(task => task.id).indexOf(id);
          if (tasks[index].status)
            tasks[index].status = false;
          else
            tasks[index].status = true;
          this.setState({ tasks: tasks });
        }
      })
      .catch(err => {
        this.setState({ error: err.props });
      });
  };

  delete = id => {
    fetch('/delete/' + id, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.status);
        } else {
          this.setState({ tasks: this.state.tasks.filter(task => task.id !== id) })
        }
      })
      .catch(err => {
        this.setState({ error: err.props });
      });
  };

  addTask = () => {
    fetch('/getAll')
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(result => this.setState({ tasks: result.data }))
      .catch(err => {
        this.setState({ error: err.props });
      });
  }

  applyNameFilter = (nameFilter) => {
    this.setState({ nameFilter: nameFilter });
  }

  applyStatusFilter = (statusFilter) => {
    this.setState({ statusFilter: statusFilter });
  }

  render() {
    if (!this.state.error) {
      const listWithStatusFilter = this.state.tasks.filter(task => {
        if (this.state.statusFilter === 'all')
          return true
        else if (this.state.statusFilter === 'active')
          return task.status;
        else
          return !task.status;
      });
      const listWithNameFilter = listWithStatusFilter.filter(task => {
        return task.name.toLowerCase().includes(this.state.nameFilter);
      });
      return (
        <div className="container">
          <AddTask addTask={this.addTask}></AddTask>
          <div class="d-flex align-items-center justify-content-between mt-5">
            <StatusFilter applyStatusFilter={this.applyStatusFilter}></StatusFilter>
            <NameFilter applyNameFilter={this.applyNameFilter}></NameFilter>
          </div>
          <ul className="list-group mt-3 mb-5">
            {listWithNameFilter.map(task =>
              <TasksListItem task={task} changeStatus={() => this.changeStatus(task.id, task.status)}
                delete={() => this.delete(task.id)} key={task.id}></TasksListItem>
            )}
          </ul>
        </div>
      );
    }
    else
      return <Error errorCode={this.state.error} />
  }
}

export default Tasks;