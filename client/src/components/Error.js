import React from 'react';
import { Link } from 'react-router-dom';

class Error extends React.Component {

    applyStatusFilter = e => {
        this.props.applyStatusFilter(e.target.value);
    }

    render() {
        return (
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-danger font-weight-bold error mt-5">{this.props.errorCode}</h1>
                <Link to={{ pathname: "/" }}><button className="btn btn-secondary mt-4">На главную</button></Link>
            </div>
        );
    };
};

export default Error;