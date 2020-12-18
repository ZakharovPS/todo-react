import React from 'react';

class StatusFilter extends React.Component {

    applyStatusFilter = e => {
        this.props.applyStatusFilter(e.target.value);
    }

    render() {
        return (
            <select className="form-control col-3" onChange={this.applyStatusFilter}>
                <option className='dropdown-item' value="all">Все</option>
                <option className='dropdown-item' value="active">Завершенные</option>
                <option className='dropdown-item' value="completed">Активные</option>
            </select>
        );
    };
};

export default StatusFilter;