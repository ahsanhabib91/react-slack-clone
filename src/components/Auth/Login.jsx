import React from "react";
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Register from "./Register";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };

  displayErrors = errors => {
    errors.map((error, i) => <p key={i}>{error.message}</p>);
  };

  handleSubmit = event => {
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser);
          this.setState({ loading: false });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleErrorInput = (errors, inputValue) => {
    return errors.some(error =>
      error.message.toLowerCase().includes(inputValue)
    )
      ? "error"
      : "";
  };

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle" className="app">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" icon color="violet" textAlign="center">
              <Icon name="code branch" color="violet" />
              Login to DevChat
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  autoComplete="off"
                  fluid
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email Address"
                  onChange={this.handleChange}
                  className={this.handleErrorInput(errors, "email")}
                  type="email"
                  value={email}
                />
                <Form.Input
                  fluid
                  autoComplete="off"
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={this.handleChange}
                  type="password"
                  className={this.handleErrorInput(errors, "password")}
                  value={password}
                />
                <Button
                  disabled={loading}
                  className={loading ? "loading" : ""}
                  color="violet"
                  fluid
                  size="large"
                >
                  Submit
                </Button>
              </Segment>
            </Form>
            {errors.length > 0 ? (
              <Message error>
                <h3>Error</h3>
                {this.displayErrors(errors)}
              </Message>
            ) : (
              ""
            )}
            <Message>
              Don't have an account? <Link to="/register">Register</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default Login;
