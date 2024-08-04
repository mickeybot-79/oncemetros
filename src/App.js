import './App.css'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import Layout from './components/Layout'
import MainPage from './components/MainPage'
import Login from './features/auth/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="login" index element={<Login />} />
    </Route>
  )
)

function App() {
  document.title = 'Los 11 Metros'

  return (
    <RouterProvider router={router} />
  )
}

export default App