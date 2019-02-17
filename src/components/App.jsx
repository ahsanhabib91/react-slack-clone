import React, { Component } from "react";
import "./App.css";
import { Button, Grid } from "semantic-ui-react";
import firebase from "../firebase";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

const App = () => {
  return (
    <Grid columns="equal" className="app" style={{ baclGround: "#eee" }}>
      <ColorPanel />
      <SidePanel />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

// class App extends Component {
// 	logout = () => {
// 		firebase
// 			.auth()
// 			.signOut()
// 			.then(data => {
// 				console.log("Signout Successfully", data);
// 				this.props.history.push("/login");
// 			})
// 			.catch(error => {
// 				console.error(error);
// 			});
// 	};
// 	render() {
// 		return (
// 			<Button onClick={this.logout} color="violet" fluid size="large">
// 				Logout
// 			</Button>
// 		);
// 	}
// }

export default App;
