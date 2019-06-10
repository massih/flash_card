import React, {Component} from 'react';
import TextField from "../commons/TextField";
import Button from "../commons/Button";

class NewWord extends Component {

  state = {};

  handle_save() {
    console.log('worked :|');
  }

  render() {
    return (
      <div className="col s12">
        <div className="row">
          <TextField label="Word"/>
          <TextField label="Meaning"/>
        </div>
        <div className="row">
          <Button onSaveClicked={this.handle_save} text="Save" color="blue darken-3" large/>
        </div>

      </div>
    )
  }
}

export default NewWord;