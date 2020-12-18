import React, { Component } from 'react';
import '../App.css';
import EditTask from './EditTask';
import Error from './Error';

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = { task: '', editing: false, error: false }
    }

    componentDidMount() {
        fetch('/get/' + this.props.match.params.id)
            .then(res => {
                if (res.status >= 400) {
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then(result => { this.setState({ task: result.data[0] }) })
            .catch(err => {
                this.setState({ error: err.props });
            });
    }

    changeEditing = (editing) => {
        this.setState({ editing: editing });
    }

    updateTask = (name, description) => {
        let task = this.state.task;
        task.name = name;
        task.description = description;
        this.setState({ task: task });
    }

    render() {
        if (!this.state.error) {
            let cardHeader = 'card-header';
            if (this.state.task.status)
                cardHeader += ' bg-success';
            else
                cardHeader += ' bg-warning';

            return (
                <div className="container">
                    { (this.state.editing) ? <EditTask id={this.props.match.params.id} updateTask={this.updateTask} changeEditing={this.changeEditing}></EditTask> : null}
                    <div className="card mt-5 mb-5">
                        <div className={cardHeader}>
                            <h4 className="font-weight-normal text-center text-light">{this.state.task.name}</h4>
                        </div>
                        <div className="card-body d-flex flex-column">
                            <span>{this.state.task.description}</span>
                            <button className="btn btn-sm btn-outline-secondary mt-4 mx-auto w-50" onClick={() => this.changeEditing(true)}>Редактировать</button>
                        </div>
                    </div>
                </div>
            );
        }
        else
            return <Error errorCode={this.state.error} />
    }
}

export default Task;