import React from 'react';
import {Link} from 'react-router-dom'

const TasksListItem = ({ task, ...props }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <h6>{task.name}</h6>
      <div>
        {task.status ? (
          <button className="btn btn-sm btn-success mr-2" onClick={props.changeStatus}>Завершенная</button>
        ) : (
            <button className="btn btn-sm btn-warning mr-2" onClick={props.changeStatus}>Активная</button>
          )}
          <Link to={{ pathname:"/task/" + task.id }}><button className="btn btn-sm btn-outline-info mr-2">Просмотреть</button></Link>
          <button className="btn btn-sm btn-outline-danger" onClick={props.delete}>Удалить</button>
      </div>
    </li>
  );
};

export default TasksListItem;
