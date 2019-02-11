import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import {
  GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER
} from '../../queries';

class UserRecipes extends React.Component {
  state = {
    _id: '',
    name: '',
    instructions: '',
    description: '',
    modal: false
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleDelete = (deleteUserRecipe) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Recipe?');
    if (confirmDelete) {
      deleteUserRecipe();
    }
  }

  loadRecipe = (recipe) => {
    this.setState({ ...recipe, modal: true })
  }

  closeModal = () => {
    this.setState({
      modal: false
    });
  }

  render() {
    const { username } = this.props;
    const { modal } = this.state;
    return (
      <Query query={GET_USER_RECIPES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading ...</div>
          if (error) return <div>Error</div>
          return (
            <>
              <h3>Your Recipes</h3>
              {!data.getUserRecipes.length &&
                <p><strong>You have not added any recipes yet</strong></p>
              }
              <ul>
                {data.getUserRecipes.map((recipe) => (
                  <li key={recipe._id}>
                    <p><Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link></p>
                    <p>Likes: {recipe.likes}</p>
                    <Mutation
                      mutation={DELETE_USER_RECIPE}
                      variables={{ _id: recipe._id }}
                      update={( cache, { data: { deleteUserRecipe }} ) => {
                        const { getUserRecipes } = cache.readQuery({
                          query: GET_USER_RECIPES,
                          variables: { username }
                        });
                        cache.writeQuery({
                          query: GET_USER_RECIPES,
                          variables: { username },
                          data: {
                            getUserRecipes: getUserRecipes.filter((recipe) => (
                              recipe._id !== deleteUserRecipe._id
                            ))
                          }
                        })
                      }}
                      refetchQueries={() => ([
                        { query: GET_ALL_RECIPES },
                        { query: GET_CURRENT_USER }
                      ])}
                    >
                      {(deleteUserRecipe, attrs = {}) => (
                        <>
                          <button
                            type="button"
                            className="button-primary"
                            onClick={() => this.loadRecipe(recipe)}
                          >
                            Update
                          </button>
                          <button
                            className="delete-button"
                            type="button"
                            disabled={attrs.loading}
                            onClick={() => this.handleDelete(deleteUserRecipe)}
                          >
                            {attrs.loading ? 'Deleting...' : 'Remove'}
                          </button>
                        </>
                      )}
                    </Mutation>
                  </li>
                ))}
              </ul>
              { modal &&
                <EditRecipeModal
                  recipe={this.state}
                  closeModal={this.closeModal}
                  handleChange={this.handleChange}
                />
              }
            </>
          )
        }}
      </Query>
    );
  }
}

const EditRecipeModal = ({ recipe, handleChange, closeModal }) => (
  <div className="modal modal-open">
    <div className="modal-inner">
      <div className="modal-content">
        <form className="modal-content-inner">
          <h4>Edit Recipe</h4>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Recipe name"
            value={recipe.name}
          />
          <br />
          <select
            name="category"
            onChange={handleChange}
            value={recipe.category}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
          <br />
          <textarea
            type="text"
            name="description"
            placeholder="Add description"
            onChange={handleChange}
            value={recipe.description}
          />
          <br />
          <textarea
            type="text"
            name="instructions"
            placeholder="Add instructions"
            onChange={handleChange}
            value={recipe.instructions}
          />
          <hr />
          <div className="modal-buttons">
            <button type="submit" className="button-primary">
              Update
            </button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default UserRecipes;
