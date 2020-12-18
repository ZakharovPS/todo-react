import React from 'react';

class NameFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = { name: '' };
    }

    applyNameFilter = (e) => {
        e.preventDefault();
        this.props.applyNameFilter(this.state.name);
    }

    onChangeName = e => {
        this.setState({ name: e.target.value });
    }

    render() {
        return (
            <form className="d-flex align-items-center">
                <input type="text" className="form-control mr-2" value={this.state.name} onChange={this.onChangeName} />
                <button onClick={this.applyNameFilter} className="btn btn-primary btn-block">Поиск</button>
            </form>
        );
    };
};

export default NameFilter;
