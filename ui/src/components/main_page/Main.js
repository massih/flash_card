import React from 'react';
import {HashRouter, NavLink, Route} from "react-router-dom";
import './Main.css';
import FlashCard from "../flash_card/Flash_Card";
import AllWords from "../all_words/All_Words";
import NewWord from "../new_word/New_Word";

let Main = () => {
  return (
    <HashRouter>
      <nav className="margin-bottom-10">
        <div className="nav-wrapper teal darken-4 center-align">
          <ul id="nav-mobile" className="center hide-on-med-and-down">
            <li><NavLink to="/newword">Add new words</NavLink></li>
            <li><NavLink to="/flashcard">Flash cards</NavLink></li>
            <li><NavLink to="/allwords">All my words</NavLink></li>
          </ul>
        </div>
      </nav>
      <div className="container center-align">
        <div className="row">
          <div className="col s12">
            <Route path="/newword" component={NewWord}/>
            <Route path="/flashcard" component={FlashCard}/>
            <Route path="/allwords" component={AllWords}/>
          </div>
        </div>
      </div>
    </HashRouter>);
};

export default Main;
