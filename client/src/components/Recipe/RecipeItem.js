import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = ({ _id, name, category }) => (
  <li>
    <h4><Link to={`/recipes/${_id}`}>{name}</Link></h4>
    <p><strong>{category}</strong></p>
  </li>
);

export default RecipeItem;
