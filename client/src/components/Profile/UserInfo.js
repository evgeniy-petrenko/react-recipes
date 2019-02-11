import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (date) => {
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
}

const UserInfo = ({ session }) => {
  const {username, email, joinDate, favorites } = session.getCurrentUser;
  return (
    <>
      <h3>User Info</h3>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Join Date: {formatDate(joinDate)}</p>
      <h3>{username}'s Favorites</h3>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite._id}>
            <p><Link to={`/recipes/${favorite._id}`}>{favorite.name}</Link></p>
          </li>
        ))}
      </ul>
      {!favorites.length &&
        <p><strong>You have no favorites currently. Go add some!</strong></p>
      }
    </>
  );
}

export default UserInfo;
