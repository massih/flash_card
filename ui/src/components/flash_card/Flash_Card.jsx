import React, {Component} from 'react';
import Button from "../commons/Button";
import TextField from "../commons/TextField";

class FlashCard extends Component {

  static FETCH_FLASH_CARD_URL = 'http://localhost:8000/api/flashcard';
  static UPDATE_FLASH_CARD_URL = 'http://localhost:8000/api/card/';

  constructor(props, context) {
    super(props, context);
    this.state = {
      flashCard: {},
      meaningUserInput: '',
      resultIcon: null,
      showAnswer: false
    };
    this.getFlashCardData();
  }

  textfieldOnchange = (textfield, value) => {
    this.setState({[textfield]: value});
  };

  revealAnswer() {
    return (this.state.showAnswer) ? '' : 'hide';
  }

  getFlashCardData() {
    fetch(FlashCard.FETCH_FLASH_CARD_URL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
      .then(response => {
        console.log('response: {}', response);
        this.setState({flashCard: response});
      })
      .catch(error => console.log('Error:', error));
  }

  updateFlashCard(flashCard) {
    console.log('Flashcard to update :', flashCard);
    fetch(FlashCard.UPDATE_FLASH_CARD_URL + flashCard.id, {
      method: 'PUT',
      body: JSON.stringify(flashCard),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
      .then(response => console.log('Success:', response))
      .catch(error => console.log('Error:', error));
  }

  fetchNextFlashCard() {
    this.setState({
      meaningUserInput: '',
      showAnswer: false,
      resultIcon: null,
      flashCard: {}
    });
    this.getFlashCardData();
  }


  buttonOnclick = () => {
    let flashCard = this.state.flashCard;
    flashCard.counter += 1;
    let result = this.state.meaningUserInput.toLowerCase() === flashCard.word_meaning.toLowerCase();

    flashCard.counter_incorrect = (result) ? flashCard.counter_incorrect : flashCard.counter_incorrect + 1;
    flashCard.update_last_visit = true;
    const icon = <i className="material-icons">{(result) ? 'thumb_up' : 'thumb_down'}</i>;

    this.setState({
      showAnswer: true,
      resultIcon: icon
    });
    this.updateFlashCard(flashCard);
    setTimeout(() => this.fetchNextFlashCard(), 5000);
  };

  render() {
    let flashCard = this.state.flashCard;
    return (
      <div className="card cyan darken-4 large">
        <div className="card-content white-text">
          <h1>{flashCard.word_original}</h1>
          <TextField
            id='meaningUserInput'
            value={this.state.meaningUserInput}
            onChange={this.textfieldOnchange}
            label='Word Meaning'
            large
          />
          <p>{this.state.resultIcon}</p>
          <h4 className={this.revealAnswer()}>The answer : {flashCard.word_meaning}</h4>
        </div>
        <div className="card-action">
          <Button onClick={this.buttonOnclick} icon="done" text="Done" color="green darken-2" large/>
        </div>
      </div>
    )
  }
}

export default FlashCard;