import React from 'react';

import './Main.css';
import Button from "../commons/Button";
import NewWord from "../new_word/NewWord";

function Main() {
  return (
    <div className="container center-align">
      <div className="row">
        <div className="col s8 offset-s2">
          <Button text="Add new word" color="light-blue darken-2" large/>
          <Button text="Start the test" color="light-wave darken-2" large/>
        </div>
      </div>
      <div className="row">
        <NewWord/>
      </div>
    </div>
  );
}

export default Main;
