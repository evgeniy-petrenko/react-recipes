import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const handleSignOut = (client, history) => {
  localStorage.removeItem('token');
  client.resetStore();
  history.push('/');
};

const SignOut = ({ history }) => (
  <ApolloConsumer>
    {(client) => {
      return <button onClick={() => handleSignOut(client, history)} type="button">Sign Out</button>
    }}
  </ApolloConsumer>
);

export default withRouter(SignOut);
