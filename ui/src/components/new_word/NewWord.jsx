import React, {Component} from 'react';
import TextField from "../commons/TextField";
import Button from "../commons/Button";

class NewWord extends Component {
  // TODO constructor

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
    this.clear_textfields();
  };

  textfield_onchange = (textfield, value) => {
    this.setState({[textfield]: value});
  };

  clear_textfields() {
    console.log('before', this.state);
    for (let key in this.state) {
      this.setState({[key]: ''})
    }
    console.log('after: ', this.state);
  }

  render() {
    return (
      <div className="col s12">
        <div className="row">
          <TextField id={'word_original'} value={this.state.word_original} onChange={this.textfield_onchange} label={'Word'}/>
          <TextField id={'word_meaning'} value={this.state.word_meaning} onChange={this.textfield_onchange} label={'Meaning'}/>
        </div>
        <div className="row">
          <Button onClick={this.button_onclick} text="Save" color="blue darken-3" large/>
        </div>

      </div>
    )
  }
}

export default NewWord;