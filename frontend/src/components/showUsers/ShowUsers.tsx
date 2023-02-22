import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './showUsers.scss';
import Header from '../header/Header';
import { Link } from 'react-router-dom';

interface User {
  user_id: number,
  username: string,
  password: string,
  isAdmin: boolean;
}

const ShowUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`/user/${userId}/delete`);
      console.log('User deleted successfully');
      // update the users state in the parent component to remove the deleted user
    } catch (error) {
      console.log(error);
      // handle the error in a meaningful way
    }
  }

  const handleEdit = async (userId: number) => {
    try {
      await axios.get(`/user/${userId}/edit`);
      console.log('User updated successfully');
      // update the users state in the parent component to show the updated user
    } catch (error) {
      console.log(error);
      // handle the error in a meaningful way
    }
  }


  return (
    <>
      <Header type={''} />

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.user_id}>
              <td>{user.username}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td>
                <Link to={`/user/${user.user_id}/edit`}>
                  <button onClick={() => handleEdit(user.user_id)}>Edit</button>
                </Link>
                <Link to={`/user/${user.user_id}/delete`}>
                  <button onClick={() => handleDelete(user.user_id)}>Delete</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ShowUsers;
