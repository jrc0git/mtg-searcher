
import './App.css'
import { Nav } from './components/Nav'
import { Home } from './components/Home'
import { Events } from './components/Events/Events'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

const router = createBrowserRouter([

  {
    path: '/',
    element: <Nav />,
    children: [
      {
        index: true, element: <Home />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'events',
        element: <Events />
      }
    ]
  },

  {
    path: '*',
    element: <Navigate to='home' />
  }

])

function App () {
  return (
    <RouterProvider router={router} />
  )
}

export default App
