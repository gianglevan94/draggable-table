import React, { Component } from 'react';
import Table from './components/Table'
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Table
          resizeable={true}
          columnDraggable={true}
          rowDraggable={true}
        />
      </div>
    );
  }
}

export default App;
