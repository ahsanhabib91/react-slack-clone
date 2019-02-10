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

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false
  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleSubmit = event => {
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      event.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createUser => {
          console.log(createUser);
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

  handleErrorInput = (errors, inputValue) => {
    return errors.some(error =>
      error.message.toLowerCase().includes(inputValue)
    )
      ? "error"
      : "";
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;

    return (
      <div>
        <Grid textAlign="center" verticalAlign="middle" className="app">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" icon color="orange" textAlign="center">
              <Icon name="puzzle piece" color="orange" />
              Register for DevChat
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  autoComplete="off"
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={this.handleChange}
                  type="text"
                  value={username}
                />
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
                <Form.Input
                  autoComplete="off"
                  fluid
                  name="passwordConfirmation"
                  icon="repeat"
                  iconPosition="left"
                  placeholder="Password Confirmation"
                  onChange={this.handleChange}
                  type="password"
                  className={this.handleErrorInput(errors, "password")}
                  value={passwordConfirmation}
                />
                <Button
                  disabled={loading}
                  className={loading ? "loading" : ""}
                  color="orange"
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
              Already a user? <Link to="/login">Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default Register;
