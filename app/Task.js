import React from 'react';
import styles from '../assets/styles'


class Task extends React.Component {

    render() {

      return (
        <span className={this.props.completed ? "completed btn btn-block btn-lg btn-info" : "todo btn btn-block btn-lg btn-info"}>
          <span className="detail">{this.props.title}</span>
          <span className="detail date">{this.props.date}</span>
            <div className="actions">
            <i onClick={this.props.onTaskClick.bind(null, this.props.id)} data-id={this.props.id} className="complete fa fa-check-circle" aria-hidden="true"></i>
            <i onClick={this.props.onTaskDelete.bind(null, this.props.id)} data-id={this.props.id} className="delete fa fa-trash-o" aria-hidden="true"></i>
            </div>
        </span>
      );
    }
  }

export default Task
