import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { GET_CURRENT_USER } from '../queries';

const withAuth = (conditionalFunc) => (Component) => (props) => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }) => {
      if (loading) return null;
      return conditionalFunc(data) ? <Component {...props} /> : <Redirect to="/" />
    }}
  </Query>
);

export default withAuth;
