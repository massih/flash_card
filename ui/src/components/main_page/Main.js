import React from 'react';

import './Main.css';
import Button from "../commons/Button";
import NewWord from "../new_word/NewWord";
import FlashCard from "../flash_card/flash_card";

let Main = () => {
  return (
    <div className="container center-align">
      <div className="row valign-wrapper h-100">
        <div className="col s4">
          <Button text="add new card" color="light-blue darken-2" large/>
        </div>
        <div className="col s4">
          <Button text="start playing" color="light-wave darken-2" large/>
        </div>
        <div className="col s4">
          <Button text="all my cards" color="light-blue darken-2" large/>
        </div>
      </div>
      {/*<div className="row section">*/}
      {/*  <NewWord/>*/}
      {/*</div>*/}
      <div className="row">
        <FlashCard word_original="Hej" word_meaning='hi'/>
      </div>
    </div>
  );
};

export default Main;
