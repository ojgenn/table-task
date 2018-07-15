import React, {Component} from 'react';
import ContentEditable from 'react-contenteditable';
import { SelectableGroup, createSelectable } from 'react-selectable';
import '../App.css';

const SelectableComponent = createSelectable(ContentEditable);

export default class Table extends Component {
  state = {
    tableArray: [],
    row: null,
    col: null
  };

  handleChange = e => {
    console.log(e.target.value);
    let table = [...this.state.tableArray];
    table[this.state.row][this.state.col]= e.target.value;
    this.setState({tableArray: table})
  };

  setRowColIndex = (row, col) => {
    this.setState({row, col}, function () {
      if (row !== null && col !== null) console.log(this.state.tableArray[row][col])
    })
  };

  componentDidMount() {
    const TABLE_ARRAY = [];
    const ROW_NUMBER = 5;
    const COL_NUMBER = 5;
    for (let i = 0; i < COL_NUMBER; i++) {
      TABLE_ARRAY.push([]);
      for (let j = 0; j < ROW_NUMBER; j++) {
        TABLE_ARRAY[i].push(`${i} ${j}`)
      }
    }
    this.setState({tableArray: TABLE_ARRAY})
  }

  render() {
    return (
      <tbody>
      {this.state.tableArray.map((row, rowIndex) => (
        <tr key = {rowIndex}>
          {row.map((item, index) => (
          <ContentEditable key = {index} html={item} // innerHTML of the editable div
                           disabled={false}       // use true to disable edition
                           onChange={this.handleChange}
                           tagName = 'td'
                           onFocus = {() => {this.setRowColIndex(rowIndex, index)}}
                           onBlur =  {() => {this.setRowColIndex(null, null)}} />
        ))}
        </tr>
        ))}
      </tbody>
    )
  }
};
