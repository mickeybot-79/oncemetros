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
import NewPost from './features/posts/NewPost'
import PostPage from './features/posts/PostPage'
import TagsPage from './components/TagsPage'
import UserPosts from './features/posts/UserPosts'
import SearchPage from './components/SearchPage'
import AllTagsPage from './components/AllTagsPage'
import NewUser from './features/auth/NewUser'
import LoadingIcon from './components/LoadingIcon'
import UserPage from './features/auth/UserPage'
import PersistLogin from './features/auth/PersistLogin'
import ProfilePage from './features/auth/ProfilePage'
import EditPost from './features/posts/EditPost'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PersistLogin />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="login" index element={<Login />} />
        <Route path="post/new" index element={<NewPost />} />
        <Route path="post/:id" index element={<PostPage />} />
        <Route path="post/edit/:id" index element={<EditPost />} />
        <Route path="tags" index element={<AllTagsPage />} />
        <Route path="tags/:tag" index element={<TagsPage />} />
        <Route path="posts/:user" index element={<UserPosts />} />
        <Route path="search" index element={<SearchPage />} />
        <Route path="users/new" index element={<NewUser />} />
        <Route path="user/:id" index element={<UserPage />} />
        <Route path="profile/:id" index element={<ProfilePage />} />
        <Route path="loading" index element={<LoadingIcon />} />
      </Route>
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