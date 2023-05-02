import './Nav.css'
import { Outlet, Link } from 'react-router-dom'

export function Nav () {
  return (
    <>
      <header>
        <div className='logo'>
          <Link to='home'><img src='./src/assets/logo.png' alt='Logo' /></Link>
        </div>
        <nav>
          <ul className='navigation'>
            <li><a href=''>Meta</a></li>
            <li><Link to='events'>Events</Link></li>
          </ul>
        </nav>
        <a href='' className='aboutButton'><button>About</button></a>
      </header>

      <Outlet />

    </>
  )
}
