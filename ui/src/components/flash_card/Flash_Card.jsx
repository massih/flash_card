import React, {Component} from 'react';
import Button from "../commons/Button";
import TextField from "../commons/TextField";

class FlashCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      flash_card: {},
      meaning_user_input: '',
      result_icon: null,
      show_answer: false
    };
    this.get_flash_card_data();
  }

  get_flash_card_data() {
    if (this.props.flash_card) {
      this.setState({flash_card: this.props.flash_card});
      return;
    }

    let url = 'http://localhost:8000/api/flashcard';
    fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
      .then(response => {
        console.log('response: {}', response);
        this.setState({flash_card: response});
      })
      .catch(error => console.log('Error:', error));
  }

  revealAnswer() {
    return (this.state.show_answer) ? '' : 'hide';
  }

  buttonOnclick = () => {
    let flash_card = this.state.flash_card;
    flash_card.counter += 1;
    let result = this.state.meaning_user_input.toLowerCase() === flash_card.word_meaning.toLowerCase();

    flash_card.counter_incorrect = (result) ? flash_card.counter_incorrect : flash_card.counter_incorrect +1;
    const icon = <i className="material-icons">{(result) ? 'thumb_up' : 'thumb_down'}</i>;

    this.setState({show_answer: true});
    this.setState({result_icon: icon})
  };

  textfieldOnchange = (textfield, value) => {
    this.setState({[textfield]: value});
  };

  render() {
    let flash_card = this.state.flash_card;
    return (
      <div className="card cyan darken-4 large">
        <div className="card-content white-text">
          <h1>{flash_card.word_original}</h1>
          <TextField
            id='meaning_user_input'
            value={this.state.meaning_user_input}
            onChange={this.textfieldOnchange}
            label='Word Meaning'
            large
          />
          <p>{this.state.result_icon}</p>
          <h4 className={this.revealAnswer()}>The answer : {flash_card.word_meaning}</h4>
        </div>
        <div className="card-action">
          <Button onClick={this.buttonOnclick} icon="done" text="Done" color="green darken-2" large/>
        </div>
      </div>
    )
  }
}

export default FlashCard;