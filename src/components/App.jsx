import React, { Component } from "react";
import "./App.css";
import { Button } from "semantic-ui-react";
import firebase from "../firebase";

class App extends Component {
  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(data => {
        console.log("Signout Successfully", data);
        this.props.history.push("/login");
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <Button onClick={this.logout} color="violet" fluid size="large">
        Logout
      </Button>
    );
  }
}

export default App;
