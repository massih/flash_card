import React, {Component} from 'react';
import TextField from "../commons/TextField";
import Button from "../commons/Button";

class NewWord extends Component {

  constructor(props) {
    super(props);
    this.state = {word_original: '', word_meaning: ''};
  }

  button_onclick = () => {
    console.log(this.state);
    // TODO AXIOS

    fetch('http://localhost:8000/api/cards', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.log('Error:', error));
    this.clearTextfields();
  };

  textfieldOnchange = (textfield, value) => {
    this.setState({[textfield]: value});
  };

  clearTextfields() {
    this.setState({word_original: ''});
    this.setState({word_meaning: ''});
  }

  render() {
    return (
      <div>
        <div className="row">
          <TextField id={'word_original'} value={this.state.word_original} onChange={this.textfieldOnchange} label={'Word'}/>
          <TextField id={'word_meaning'} value={this.state.word_meaning} onChange={this.textfieldOnchange} label={'Meaning'}/>
        </div>
        <div className="row">
          <Button onClick={this.button_onclick} icon="save" text="Save" color="teal darken-2" large/>
        </div>
      </div>
    )
  }
}

export default NewWord;