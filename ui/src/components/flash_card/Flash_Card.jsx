import React, {Component} from 'react';
import Button from "../commons/Button";
import TextField from "../commons/TextField";

class FlashCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      meaning_user_input: '',
      result_icon: null,
      show_answer: false
    };
  }

  revealAnswer() {
    return (this.state.show_answer) ? '' : 'hide';
  }

  buttonOnclick = () => {
    const result = this.state.meaning_user_input.toLowerCase() === this.props.word_meaning.toLowerCase();
    const icon = <i className="material-icons">{(result) ? 'thumb_up' : 'thumb_down'}</i>;

    this.setState({show_answer: true});
    this.setState({result_icon: icon})
  };

  textfieldOnchange = (textfield, value) => {
    this.setState({[textfield]: value});
  };

  render() {
    return (
        <div className="card cyan darken-4 large">
          <div className="card-content white-text">
            <h1>{this.props.word_original}</h1>
            <TextField
              id='meaning_user_input'
              value={this.state.word_meaning}
              onChange={this.textfieldOnchange}
              label='Word Meaning'
              large
            />
            <p>{this.state.result_icon}</p>
            <h4 className={this.revealAnswer()}>The answer : {this.props.word_meaning}</h4>
          </div>
          <div className="card-action">
            <Button onClick={this.buttonOnclick} icon="done" text="Done" color="green darken-2" large/>
          </div>
        </div>
    )
  }
}

export default FlashCard;