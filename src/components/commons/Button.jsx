import React, {Component} from 'react';


class Button extends Component {

  get_icon() {
    let style = 'material-icons';
    if (this.props.text) {
      style += ' right';
    }
    return (this.props.icon) ? <i className={style}>{this.props.icon}</i> : '';
  }

  get_class_name() {
    let class_name = ['waves-effect btn'];
    class_name.push(this.props.color);
    if (this.props.large) {
      class_name.push('btn-large');
    }
    return class_name.join(' ');
  }

  render() {
    return (
      <button onClick={this.props.onClick} className={this.get_class_name()}>{this.props.text}{this.get_icon()}</button>
    )
  }
}

export default Button;