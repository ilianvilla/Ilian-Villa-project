import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useRoleRedirect() {
  return(
    <div>
      Yes
    </div>
  )
  // const navigate = useNavigate();
  // const role = localStorage.getItem('role');
  // useEffect(() => {
  //   if (role === 'user') {
  //     navigate('/');
  //     alert(role);
  //   } else if (role === 'admin') {
  //     navigate('/users');
  //   } else {
  //     navigate('/login');
  //   }
  // }, []);
}
export default useRoleRedirect;

