import React from 'react';
import Task from './Task'


class TaskList extends React.Component {
    render() {
      
      return (

        <div>
        {this.props.tasks
          .filter(item => item.completed == this.props.completed)
          .map(item => {

          return <Task onTaskDelete={this.props.onTaskDelete} key={this.id} onTaskClick={this.props.onTaskClick} date={item.date} title={item.title} id={item.id} completed={item.completed} key={item.id}  />
        })}
        </div>
      );
    }
  }

export default TaskList
