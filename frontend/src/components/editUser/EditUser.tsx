import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import User from '../../pages/user/User';

interface User {
  user_id: any;
  username: any;
  password: string;
  isAdmin: boolean;
}

const EditUser: React.FC = () => {
  let { id } = useParams();
  const userId = id;

  const [user, setUser] = useState<User>({
    user_id: userId || "",
    username: "",
    password: "",
    isAdmin: false,
  });


  const redirect = useNavigate();

  useEffect(() => {

    const fetchUser = async () => {
      try {
        if (userId) {
          const response = await axios.get(`/user/${userId}/edit`);
          setUser(response.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser, [name]:
        value
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: checked }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(`/user/${userId}/update`, user);
      redirect('/users');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="hidden" value={user.user_id} name="id"></input>

        <label htmlFor="username">Username:</label>
        <input type="text" name="username" value={user.username} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={user.password} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="isAdmin">Is Admin:</label>
        <input type="checkbox" name="isAdmin" checked={user.isAdmin} onChange={handleCheckboxChange} />
      </div>
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUser;