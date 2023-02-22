import React from 'react';
import axios from 'axios';
// import Calendar from '../calendar/Calendar';
import './adminDashboard.scss';
// import ShowUsers from '../showUsers/ShowUsers';
import Header from '../header/Header';


type AdminDashboardProps = {};

type AdminDashboardState = {
  rooms: Array<Room>,
};

type Room = {
  id: number,
  name: string,
  description: string,
  price: number,
  image: string,
};

// function logout(): void {
//   throw new Error('Function not implemented.');
// }

class AdminDashboard extends React.Component<AdminDashboardProps, AdminDashboardState> {
  constructor(props: AdminDashboardProps) {
    super(props);
    this.state = {
      rooms: [],
    };
  }

  componentDidMount() {
    // Fetch room data from backend and update state
    axios.get('/rooms').then((response) => {
      this.setState({ rooms: response.data });
    });
  }

  render() {
    return (
    <>
    <Header type={''}/></>
    )
  }
}

export default AdminDashboard;
