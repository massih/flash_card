import React, {Component} from 'react';
import TextField from "../commons/TextField";
import Button from "../commons/Button";
import {withRouter} from "react-router-dom";

class NewWord extends Component {

  constructor(props) {
    super(props);
    this.state = {
      word_original: '',
      word_meaning: '',
      card_to_update: {}
    };
    this.notification_template = {
      success: {
        title: 'Successfully Saved!',
        type: 'success'
      },
      error: {
        title: 'Could not save!',
        type: 'danger'
      }
    };
  }

  componentDidMount() {
    this.checkCardForUpdate();
  }

  checkCardForUpdate() {
    if (((this.props.history.location || {}).state || {}).flashCard) {
      let passedCard = this.props.history.location.state.flashCard;
      this.setState({
        card_to_update: passedCard,
        word_original: passedCard.word_original,
        word_meaning: passedCard.word_meaning
      });
    }
  }

  addNotification(type, message) {
    let properties = this.notification_template[type];
    this.props.notificationRef.current.addNotification({
      title: properties.title,
      message: message,
      type: properties.type,
      insert: "top",
      container: "bottom-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {duration: 5000},
      dismissable: {click: true}
    });
  }

    buttonOnclick = () => {
    // TODO AXIOS
    fetch('http://localhost:8000/api/cards', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
        .then(response => {
          this.clearTextfields();
          this.addNotification('success', response["word_original"] + " => " + response["word_meaning"]);
        })
        .catch(error => {
          console.log('Error:', error);
          this.addNotification('error', error.toString());
        });
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
            <Button onClick={this.buttonOnclick} icon="save" text="Save" color="teal darken-2" large/>
          </div>
        </div>
    )
  }
}

export default withRouter(NewWord);