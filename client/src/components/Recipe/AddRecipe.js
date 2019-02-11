import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries';
import withAuth from '../withAuth';
import Error from '../Error';

const initialState = {
  name: '',
  instructions: '',
  category: 'Breakfast',
  description: '',
  username: ''
}

class AddRecipe extends React.Component {
  state = initialState

  componentDidMount() {
    const { username } = this.props.session.getCurrentUser;
    this.setState({ username });
  }

  clearState = () => {
    this.setState(initialState);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e, addRecipe) => {
    e.preventDefault();
    addRecipe().then(({ data }) => {
      this.clearState();
      this.props.history.push('/');
    });
  }

  validateForm = () => {
    const { name, category, description, instructions } = this.state;
    const isInvalid = !name || !category || !description || !instructions;
    return isInvalid;
  }

  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes]
      }
    })
  }

  render() {
    const { name, category, description, instructions, username } = this.state;
    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ name, category, description, instructions, username }}
        update={this.updateCache}
        refetchQueries={() => ([
          { query: GET_USER_RECIPES, variables: { username } }
        ])}
      >
        {(addRecipe, { data, loading, error }) => {
          return (
            <div className="App">
              <h2 className="App">Add Recipe</h2>
              <form
                className="form"
                onSubmit={(e) => this.handleSubmit(e, addRecipe)}
              >
                <input
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Recipe name"
                  value={name}
                />
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <textarea
                  type="text"
                  name="description"
                  placeholder="Add description"
                  onChange={this.handleChange}
                  value={description}
                />
                <textarea
                  type="text"
                  name="instructions"
                  placeholder="Add instructions"
                  onChange={this.handleChange}
                  value={instructions}
                />
                <button
                  disabled={loading || this.validateForm()}
                  className="button-primary"
                  type="submit"
                >
                  Submit
                </button>
                { error && <Error error={error} /> }
              </form>
            </div>
          )
        }}
      </Mutation>
    );
  }
}

export default withAuth((session) => session && session.getCurrentUser)(withRouter(AddRecipe));
