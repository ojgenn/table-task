import React, {Component} from 'react';
import './App.css';
import Table from './components/Table'

class App extends Component {
  render() {
    return (
      <div className="App">
        <table>
          <Table/>
        </table>
      </div>
    );
  }
}

export default App;
