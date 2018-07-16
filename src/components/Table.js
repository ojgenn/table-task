import React, {Component} from 'react';
import ContentEditable from 'react-contenteditable';
import {SelectableGroup, createSelectable} from 'react-selectable';
import '../App.css';

const SelectableComponent = createSelectable(ContentEditable);

export default class Table extends Component {
  state = {
    tableArray: [],
    row: null,
    col: null,
    selectedKeys: []
  };

  handleChange = e => {
    let table = [...this.state.tableArray];
    table[this.state.row][this.state.col] = e.target.value;
    this.setState({tableArray: table})
  };

  setRowColIndex = (row, col, clear = false) => {
    let selectedKeys = clear? []: [...this.state.selectedKeys]
    this.setState({row, col, selectedKeys})
  };

  handleSelection(selectedKeys) {
    this.setState({selectedKeys});
  };

  clearSelected() {
    if (this.state.selectedKeys.length > 0) {
      let newState = [...this.state.tableArray];
      this.state.selectedKeys.forEach(item => {
        let itemArray = item.split('_');
        let row = Number(itemArray[0]);
        let col = Number(itemArray[1]);
        newState[row][col] = ''
      });
      this.setState({tableArray: newState, selectedKeys: []})
    }
  }

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
      <div>
        <SelectableGroup onSelection={this.handleSelection.bind(this)} preventDefault = {false}>
          <table>
            <tbody>
            {this.state.tableArray.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((item, index) => {
                  let selected = this.state.selectedKeys.indexOf(rowIndex + '_' + index) > -1;
                  return (
                    <SelectableComponent key={index} html={item} // innerHTML of the editable div
                                         disabled={false}       // use true to disable edition
                                         selected={selected}
                                         className={selected ? 'item-selected' : ''}
                                         selectableKey={rowIndex + '_' + index}
                                         onChange={this.handleChange}
                                         tagName='td'
                                         onFocus={() => {
                                           let clear = true;
                                           this.setRowColIndex(rowIndex, index, clear)
                                         }}
                                         onBlur={() => {
                                           this.setRowColIndex(null, null)
                                         }}/>
                  )
                })}
              </tr>
            ))}
            </tbody>
          </table>
        </SelectableGroup>
        <button onClick={this.clearSelected.bind(this)} className={'button'}>
          Clear selected
        </button>
      </div>
    )
  }
};
