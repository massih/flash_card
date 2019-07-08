import React, {Component} from 'react';
import Button from "../commons/Button";

class AllWords extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.headers = ['Word', 'Meaning', 'Actions'];
  }

  componentDidMount() {
    let url = 'http://localhost:8000/api/cards';
    fetch(url, {
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
    console.log('edit button clicked with => ', rowData);
    // fetch('http://localhost:8000/api/cards', {
    //   method: 'POST',
    //   body: JSON.stringify(this.state),
    //   headers: {'Content-Type': 'application/json'}
    // }).then(res => res.json())
    //   .then(response => console.log('Success:', JSON.stringify(response)))
    //   .catch(error => console.log('Error:', error));
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
          <table className="highlight centered responsive-table">
            <thead>
            <tr>
              <th>Word</th>
              <th>Meaning</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(this.state.tableData).map((id, index) => (
                <tr>
                  <td>{this.state.tableData[id].word_original}</td>
                  <td>{this.state.tableData[id].word_meaning}</td>
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

export default AllWords