import React, {Component} from 'react';


class Button extends Component {

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
            <button onClick={this.props.onSaveClicked} className={this.get_class_name()}>{this.props.text}</button>
        )
    }
}

export default Button;