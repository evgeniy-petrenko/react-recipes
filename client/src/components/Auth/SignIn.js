import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { SIGN_IN_USER } from '../../queries';
import Error from '../Error';

const initialState = {
  username: "",
  password: ""
};

class SignIn extends React.Component {
  state = initialState;

  clearState = () => {
    this.setState(initialState);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event, signInUser) => {
    event.preventDefault();
    signInUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signInUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/');
    })
  }

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="App">
        <h2>Sign In</h2>
        <Mutation
          mutation={SIGN_IN_USER}
          variables={{ username, password }}
        >
          {( signInUser, { data, loading, error } ) => {
            if (loading) return <div>Loading...</div>
            return (
              <form
                className="form"
                onSubmit={(event) => this.handleSubmit(event, signInUser)}
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
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

export default withRouter(SignIn);
