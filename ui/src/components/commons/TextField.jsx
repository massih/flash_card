import React, {Component} from 'react';
import './TextField.css'

class TextField extends Component {

  get_class_name() {
    let class_name = ['input-field', 'custom-color'];
    let size = (this.props.large) ? 'col s12' : 'col s6';
    class_name.push(size);
    return class_name.join(' ');
  }

  text_change_handler = (event) => {
    let text = event.target.value;
    this.props.onChange(this.props.id, text);
  };

  render() {
    return (
      <div className={this.get_class_name()}>
        <input id={this.props.id} onChange={this.text_change_handler} type="text" className="validate"/>
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    );
  }
}

export default TextField;