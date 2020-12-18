import React from 'react';

class EditTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = { name: '', description: '' };
    }

    editTask = (e) => {
        e.preventDefault();
        let name = this.state.name;
        let description = this.state.description;
        if (name && description) {
            fetch('/update/' + this.props.id, {
                method: 'PUT',
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
                    this.props.changeEditing(false);
                    this.props.updateTask(name, description);
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
                <h4 className="mb-3">Редактирование задачи</h4>
                <div className="mb-3">
                    <label>Новое название задачи</label>
                    <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                </div>
                <div className="mb-3">
                    <label>Новое описание задачи</label>
                    <textarea className="form-control" value={this.state.description} onChange={this.onChangeDescription}></textarea>
                </div>
                <button onClick={this.editTask} className="btn btn-primary btn-lg btn-block">Применить изменения</button>
            </form>
        );
    };
};

export default EditTask;
