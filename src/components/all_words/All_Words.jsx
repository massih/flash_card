import React, {Component} from 'react';
import Button from "../commons/Button";
import {withRouter} from "react-router-dom";

class AllWords extends Component {
  static FETCH_ALL_CARDS_URL = 'http://localhost:8000/api/cards';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch(AllWords.FETCH_ALL_CARDS_URL, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
      .then(response => {
        let tableData = {};
        response.forEach((row) => {
          tableData[row.id] = row;
        });
        this.setState({'tableData': tableData});
      })
      .catch(error => console.log('Error:', error));
  }

  editButtonOnclick(rowId) {
    let rowData = this.state.tableData[rowId];
    this.props.history.push(
      {
        pathname: '/newword',
        state: {flashCard: rowData}
      });
  }

  deleteButtonOnclick(rowId) {
    const url = 'http://localhost:8000/api/card/' + rowId;
    fetch(url, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    }).then(() => {
      let tableData = this.state.tableData;
      delete tableData[rowId];
      this.setState({'tableData': tableData});
      this.addNotification('delete', 'success', 'Gone!')
    }).catch(error => {
      console.log('Error:', error);
      this.addNotification('delete', 'danger', error.toString());
    });
  }

  addNotification(operation, type, message) {
    let properties = AllWords.getNotificationProperties(operation, type, message);
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

  static getNotificationProperties(operation, type, message) {
    return {
      title: ((type === 'success') ? 'Successfully ' : 'Failed to ') + operation,
      type: type,
      message: message
    };
  }

  render() {
    if (!this.state.tableData) {
      return null;
    }

    if (!Object.keys(this.state.tableData).length) {
      return (
        <div className="section">
          <h3>You haven't add any words yet!</h3>
          <p>Click on "New Word" to start!</p>
        </div>
      );
    }

    return (
      <div className="blue-grey darken-2">
        <table className="responsive-table highlight centered">
          <thead>
          <tr>
            <th>Word</th>
            <th>Meaning</th>
            <th>Incorrect Answers</th>
            <th>Last Visit</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {Object.keys(this.state.tableData).map((id, index) => (
            <tr>
              <td>{this.state.tableData[id].word_original}</td>
              <td>{this.state.tableData[id].word_meaning}</td>
              <td>{this.state.tableData[id].counter_incorrect}</td>
              <td>{this.state.tableData[id].last_visit}</td>
              <td>
                <Button color="transparent" icon="edit" onClick={() => this.editButtonOnclick(id)}/>
                <Button color="transparent" icon="delete" onClick={() => this.deleteButtonOnclick(id)}/>
              </td>
            </tr>
          ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(AllWords)