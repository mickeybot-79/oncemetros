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
//import NewPost from './features/posts/NewPost'
import NewPost2 from './features/posts/NewPost2'
import PostPage from './features/posts/PostPage'
import TagsPage from './components/TagsPage'
import UserPosts from './features/posts/UserPosts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="login" index element={<Login />} />
      <Route path="post/new" index element={<NewPost2 />} />
      <Route path="post/new2" index element={<NewPost2 />} />
      <Route path="post/:id" index element={<PostPage />} />
      <Route path="tags/:tag" index element={<TagsPage />} />
      <Route path="posts/:user" index element={<UserPosts />} />
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