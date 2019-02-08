import React from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";

class Register extends React.Component {
  render() {
    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" icon color="orange" textAlign="center">
              <Icon name="puzzle piece" color="orange" />
              Register for DevChat
            </Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default Register;
