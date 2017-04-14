import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../assets/styles'
import TaskList from './TaskList'
import utils from './utils/'
import sp from './utils/sharePointService'

class App extends React.Component {
    constructor(props){
      super(props)
      // REPEATING
      const localTasks = JSON.parse(localStorage.getItem('tasks'));
      this.state = {
        tasks: []
      }
      this.handleTaskInput = this.handleTaskInput.bind(this);
      this.handleTaskClick = this.handleTaskClick.bind(this);
      this.handleTaskDelete = this.handleTaskDelete.bind(this);
    }
    componentDidMount(){
      sp.getTasks().then(data => {
          this.setState({
            tasks: data
          })
      })
    }
    handleTaskInput(e){
      e.preventDefault();
      sp.postTask(this.refs.todo.value)
      .then(newTask => {
          const oldState = this.state.tasks
          const newState = [...oldState];
          
          newState.push({
            title: newTask.Title,
            completed: false,
            id: newTask.Id
          })
          console.log(newState)
          this.setState({
            tasks: newState
          })
      })








      e.target.reset();
    }
    handleTaskDelete(id){
      sp.deleteTask(id)
      const oldState = this.state.tasks
      const newState = [...oldState];
      const index = newState.findIndex(item => item.id === id)
      newState.splice(index,1);
      this.setState({
        tasks: newState
      })

    }
    handleTaskClick(id){
      sp.completeTask(id)
      const oldState = this.state.tasks
      const newState = [...oldState];
      const index = newState.findIndex(item => item.id === id);
      newState[index].completed = true;
      this.setState({
        tasks: newState
      })
    }

    render() {

      return (
        <div className="container text-center" style={styles.container}>

          <h1>Simple To-Do List<br /><small>Coming from Sharepoint!</small> </h1>
            <div className="form-group">
              <form onSubmit={this.handleTaskInput}>
                <input style={styles.text_input} type="text" ref="todo"  placeholder="+ Add to SharePoint" className="form-control" />
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
