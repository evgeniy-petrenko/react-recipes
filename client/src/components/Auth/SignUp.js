import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { SIGN_UP_USER } from '../../queries';
import Error from '../Error';

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

class SignUp extends React.Component {
  state = initialState;

  clearState = () => {
    this.setState(initialState);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event, signUpUser) => {
    event.preventDefault();
    signUpUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signUpUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/');
    })
  }

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid = !username || !email || !password
      || password !== passwordConfirmation;
    return isInvalid;
  }

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <div className="App">
        <h2>Sign Up</h2>
        <Mutation
          mutation={SIGN_UP_USER}
          variables={{ username, email, password }}
        >
          {( signUpUser, { data, loading, error } ) => {
            if (loading) return <div>Loading...</div>
            return (
              <form
                className="form"
                onSubmit={(event) => this.handleSubmit(event, signUpUser)}
              >
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                />
                <input
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                />
                <input
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                />
                <input
                  onChange={this.handleChange}
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm Password"
                  value={passwordConfirmation}
                />
                <button
                  type="submit"
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >
                  Submit
                </button>
                { error && <Error error={error} /> }
              </form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(SignUp);
