import React, {Component} from 'react';
import '../App.css';
import ContentEditable from 'react-contenteditable';

export default class Rows extends Component {

  handleChange = (e) => {
    console.log(e.target.value)
    this.props.onChange(e);
  };

  render() {
    let cols = this.props.data.map((item, index) => (
        <ContentEditable key = {index} html={item} // innerHTML of the editable div
                         disabled={false}       // use true to disable edition
                         onChange={this.handleChange}
                         tagName = 'td'
                         onFocus = {() => {this.props.setRowColIndex(this.props.row, index)}}
                         onBlur =  {() => {this.props.setRowColIndex(null, null)}} />
    ));

    return (
      <tr>
        {cols}
      </tr>
    )
  }
};
