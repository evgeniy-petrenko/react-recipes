import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ _id, name, likes }) => (
  <li>
    <h4><Link to={`/recipes/${_id}`}>{name}</Link></h4>
    <p>Likes: {likes}</p>
  </li>
);

export default SearchItem;
