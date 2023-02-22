import React from 'react';
import './userDashboard.scss';
import Calendar from '../calendar/Calendar';
import useRoleRedirect from '../../hooks/CheckRole';
interface UserDashboardProps{};

const UserDashboard: React.FC<UserDashboardProps> = () => {
useRoleRedirect();
return (
<div>
<div className="sidebar">
<div className="logo-details">
<i className="fa fa-car"></i>
<span className="logo_name">Divison5</span>
</div>
<ul className="nav-links">
<li>
<a href="/user" className="active">
<i className="bx bx-grid-alt"></i>
<span className="links_name">Dashboard</span>
</a>
</li>
<li className="log_out">
<a href="/login" onClick={() => {}}>
<i className="bx bx-log-out"></i>
<span className="links_name">Log out</span>
</a>
</li>
</ul>
</div>
<section className="home-section">
<nav>
<div className="sidebar-button">
<i className="bx bx-menu sidebarBtn"></i>
<span className="dashboard">User Dashboard</span>
<div className="bookings">
<Calendar type={''} changeDate={undefined} open={function (arg0: boolean): unknown {
                            throw new Error('Function not implemented.');
                        } }/>
</div>
</div>

</nav>
</section>
</div>
);
};

export default UserDashboard;