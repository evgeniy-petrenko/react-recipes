import { gql } from 'apollo-boost';
import { recipeFragments } from './fragments';

// Recipes queries
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
    }
  }
`;

export const GET_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(_id: $_id) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`;

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      likes
    }
  }
`;

// Recipes Mutations

export const ADD_RECIPE = gql`
  mutation(
    $name: String!,
    $description: String!,
    $category: String!,
    $instructions: String!,
    $username: String
  ) {
    addRecipe(
      name: $name,
      description: $description,
      category: $category,
      instructions: $instructions,
      username: $username
    ) {
      ...CompleteRecipe
    }
  }
  ${recipeFragments.recipe}
`;

export const DELETE_USER_RECIPE = gql`
  mutation($_id: ID!) {
    deleteUserRecipe(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_USER_RECIPE = gql`
  mutation($_id: ID!, $name: String!, $description: String!, $category: String!, $instructions: String!, $username: String) {
    updateUserRecipe(_id: $_id, name: $name, description: $description, category: $category, instructions: $instructions, username: $username) {
      _id
      name
      likes
      category
      description
      instructions
    }
  }
`;

export const LIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    likeRecipe(_id: $_id, username: $username) {
      ...LikeRecipe
    }
  }
  ${recipeFragments.like}
`;

export const UNLIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeRecipe(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

// User Queries

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites {
        _id
        name
      }
    }
  }
`;

export const GET_USER_RECIPES = gql`
  query($username: String!) {
    getUserRecipes(username: $username) {
      _id
      category
      description
      instructions
      likes
      name
    }
  }
`;

// User Mutations

export const SIGN_IN_USER = gql`
  mutation($username: String!, $password: String! ) {
    signInUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGN_UP_USER = gql`
  mutation($username: String!, $email: String!, $password: String! ) {
    signUpUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
