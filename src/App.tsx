import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import './App.css';
import Layout from './components/layout/Layout';
import Error from './components/common/Error';
import AuthLayout from './components/layout/AuthLayout';
import SearchPage from './pages/SearchPage';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import { SignIn, SignUp } from './pages/auth';
import { BoardWrite, BoardView, Forum, Notice } from './pages/community';
import { loader as forumLoader } from './components/board/BoardList';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/community',
          element: <MainLayout title="커뮤니티" />,
          errorElement: <Error />,
          children: [
            {
              index: true,
              element: <Navigate to={'forum'} />,
            },
            {
              path: 'forum',
              children: [
                {
                  index: true,
                  element: <Forum title="자유게시판" />,
                  loader: forumLoader,
                },
                {
                  path: 'post',
                  element: <BoardWrite />,
                },
                {
                  path: 'view/:id',
                  element: <BoardView />,
                },
              ],
            },
            {
              path: 'notice',
              children: [
                {
                  index: true,
                  element: <Notice title="공지사항" />,
                  loader: forumLoader,
                },
                {
                  path: 'post',
                  element: <BoardWrite />,
                },
                {
                  path: 'view/:id',
                  element: <BoardView />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Navigate to={'signin'} />,
        },
        {
          path: 'signin',
          element: <SignIn />,
        },
        {
          path: 'signup',
          element: <SignUp />,
        },
      ],
    },
    {
      path: '/search',
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: 'city',
          element: <SearchPage searchType="city" />,
        },
        {
          path: 'map',
          element: <SearchPage searchType="map" />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
