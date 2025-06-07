import './Nav.css'
import { Outlet, Link, useLocation } from 'react-router-dom'

export function Nav () {
  const location = useLocation()
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <>
      <header>
        <div className='logo'>
          <Link to='/home'>
            <img src='./src/assets/logo.png' alt='Logo' />
          </Link>
        </div>
        <nav>
          <ul className='navigation'>
            <li>
              <Link to='/meta' className={isActive('/meta')}>
                Meta
              </Link>
            </li>
            <li>
              <Link to='/events' className={isActive('/events')}>
                Events
              </Link>
            </li>
          </ul>
        </nav>
        <div className='aboutButton'>
          <button>About</button>
        </div>
      </header>
      <Outlet />
    </>
  )
}
