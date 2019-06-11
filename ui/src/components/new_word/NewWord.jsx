import React, {Component} from 'react';
import TextField from "../commons/TextField";
import Button from "../commons/Button";

class NewWord extends Component {
  text_fields = {'word_original': 'Word', 'word_meaning': 'Meaning'};
  state = {};

  button_onclick = () => {
    console.log(this.state);
  };

  textfield_onchange = (textfield, value) => {
    this.setState({[textfield]: value});
  };

  render() {
    return (
      <div className="col s12">
        <div className="row">
          {Object.keys(this.text_fields).map(
            (key, index) => (
              <TextField key={index} id={key} onChange={this.textfield_onchange} label={this.text_fields[key]}/>
            ))}
        </div>
        <div className="row">
          <Button onClick={this.button_onclick} text="Save" color="blue darken-3" large/>
        </div>

      </div>
    )
  }
}

export default NewWord;