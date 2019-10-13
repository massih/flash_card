import React, {Component} from 'react';

import {HashRouter, NavLink, Route} from "react-router-dom";
import './Main.css';
import FlashCard from "../flash_card/Flash_Card";
import AllWords from "../all_words/All_Words";
import NewWord from "../new_word/New_Word";
import ReactNotification from "react-notifications-component";
import WelcomePage from "../welcome_page/WelcomePage";
import M from 'materialize-css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
    this.sideNav = React.createRef();
  }

  componentDidMount() {
    M.Sidenav.init(this.sideNav);
  }

  render() {
    return (
      <HashRouter>
        <nav className="margin-bottom-10">
          <div className="nav-wrapper teal darken-4 center-align">
            <a data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul id="nav-full" className="center hide-on-med-and-down">
              <li><NavLink activeClassName="active-nav-link" to="/newword">Add new words</NavLink></li>
              <li><NavLink activeClassName="active-nav-link" to="/flashcard">Flash cards</NavLink></li>
              <li><NavLink activeClassName="active-nav-link" to="/allwords">All my words</NavLink></li>
            </ul>
          </div>
        </nav>

        {/* Only for responsiveness of navbar*/}
        <ul id="nav-mobile" className="sidenav" ref={(sidenav) => this.sideNav = sidenav}>
          <li><NavLink activeClassName="active-nav-link" to="/newword">Add new words</NavLink></li>
          <li><NavLink activeClassName="active-nav-link" to="/flashcard">Flash cards</NavLink></li>
          <li><NavLink activeClassName="active-nav-link" to="/allwords">All my words</NavLink></li>
        </ul>

        <div className="container center-align">
          <div className="row">
            <div className="col s12">
              <Route exact={true} path="/newword" render={() => <NewWord notificationRef={this.notificationDOMRef}/>}/>
              <Route exact={true} path="/flashcard" component={FlashCard}/>
              <Route exact={true} path="/allwords"
                     render={() => <AllWords notificationRef={this.notificationDOMRef}/>}/>
              <Route exact={true} path="/" component={WelcomePage}/>
            </div>
          </div>
          <ReactNotification ref={this.notificationDOMRef}/>
        </div>
      </HashRouter>
    );
  }
}

export default Main;