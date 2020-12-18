import React from 'react';

class AddTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = { name: '', description: '' };
    }

    addTask = (e) => {
        e.preventDefault();
        let name = this.state.name;
        let description = this.state.description;
        if (name && description) {
            fetch('/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    name: name,
                    description: description
                })
            })
            .then(res => {
                if (res.status < 400) {
                    this.props.addTask();
                    this.setState({ name: '', description: '' });
                }
            });
        }
    }

    onChangeName = e => {
        this.setState({ name: e.target.value });
    }

    onChangeDescription = e => {
        this.setState({ description: e.target.value });
    }

    render() {
        return (
            <form className="mt-5">
                <h4 className="mb-3">Добавление задачи</h4>
                <div className="mb-3">
                    <label>Название задачи</label>
                    <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                </div>
                <div className="mb-3">
                    <label>Описание задачи</label>
                    <textarea className="form-control" value={this.state.description} onChange={this.onChangeDescription}></textarea>
                </div>
                <button onClick={this.addTask} className="btn btn-primary btn-lg btn-block">Добавить задачу</button>
            </form>
        );
    };
};

export default AddTask;
