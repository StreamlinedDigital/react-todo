import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../assets/styles'
import TaskList from './TaskList'
import utils from './utils/'

class App extends React.Component {
    constructor(props){
      super(props)
      // REPEATING
      const localTasks = JSON.parse(localStorage.getItem('tasks'));
      this.state = {
        tasks: localTasks
      }
      this.handleTaskInput = this.handleTaskInput.bind(this);
      this.handleTaskClick = this.handleTaskClick.bind(this);
      this.handleTaskDelete = this.handleTaskDelete.bind(this);

    }
    handleTaskInput(e){
      e.preventDefault();
      // REPEATING
      const localTasks = JSON.parse(localStorage.getItem('tasks'));
      const tasks = this.state.tasks
      let title = e.target.children[0].value;
      const highest = tasks.map(item => item.id);
      const highestID = Math.max(...highest) < 0 ? 0 : Math.max(...highest)
      const newItem = {
        title: title,
        completed: false,
        id: highestID + 1,
        date: utils.getCurrentDate()
      }

      tasks.push(newItem)
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
      e.target.reset();

    }
    handleTaskDelete(e){
      const id = e.target.dataset.id;
      let array = this.state.tasks;
      const task = array.filter(item => item.id == id);
      const index = array.indexOf(task[0]);
      array.splice(index, 1)
      this.setState({
        tasks: array
      })
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));

    }
    handleTaskClick(e){
      // Got to be a better way of doing this
      const id = e.target.dataset.id;
      let array = this.state.tasks;
      const task = array.filter(item => item.id == id);
      task[0].completed = !task[0].completed
      this.setState({
        tasks: array
      })
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }

    render() {

      return (
        <div className="container text-center" style={styles.container}>
          <h1>Simple To-Do List<br /><small>small is a tag for the headers</small> </h1>
            <div className="form-group">
              <form onSubmit={this.handleTaskInput}>
                <input style={styles.text_input} type="text"  placeholder="+ Add a New Task" className="form-control" />
              </form>
            </div>
            <div>
              <TaskList onTaskDelete={this.handleTaskDelete} onTaskClick={this.handleTaskClick} tasks={this.state.tasks} completed={false} />
              <h4>Completed</h4>
              <TaskList onTaskDelete={this.handleTaskDelete} onTaskClick={this.handleTaskClick} tasks={this.state.tasks} completed={true} />
            </div>
        </div>
      );
    }
  }

export default App


ReactDOM.render(
  <App />,
  document.querySelector('#app')
)
