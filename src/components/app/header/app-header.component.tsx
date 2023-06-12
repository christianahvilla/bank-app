/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { Link } from 'react-router-dom';
import imageUser from '~assets/imageUser.png';

export function HeaderElement() {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className='navbar bg-base-100' style={{ zIndex: 10000 }}>
      <div className='flex-1'></div>
      <div className='flex-none'>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img src={imageUser} alt='logo' />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <Link to='/account'>Account</Link>
            </li>
            <li onClick={handleLogout}>
              <button>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
