import React from 'react';
import styles from '../assets/styles'
import axios from 'axios'

class Main extends React.Component {

    render() {



      return (
        <div className="container text-center" style={styles.container}>
          <h1>Simple To-Do List<br /><small>small is a tag for the headers</small> </h1>
          {React.cloneElement(this.props.children, this.props)}
        </div>
      );
    }
  }

export default Main
