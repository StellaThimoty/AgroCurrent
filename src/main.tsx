import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import 'react-toastify/dist/ReactToastify.min.css';
import {ToastContainer} from 'react-toastify'
import SignupPage from './routes/Signup'
import LoginPage from './routes/Login'
import ErrorPage from './ErrorPage'
import { Provider } from 'react-redux'
import store from "./hooks/store"
import Dashboard from './routes/Dashboard'
import Home from './routes/Home'
import Relatorios from './routes/SubDashboard/Relatorios/Relatorios';
import Vistorias from './routes/SubDashboard/Vistorias/Vistorias';
import Maquinas from './routes/SubDashboard/Maquinas/Maquinas';
import Eddy from './routes/SubDashboard/Eddy/Eddy';
import Ajuda from './routes/SubDashboard/Ajuda';
import Usuario from './routes/SubDashboard/Usuario/Usuario';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Signup",
    element: <SignupPage/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/Login",
    element: <LoginPage/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/Dashboard",
    element: <Dashboard/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Usuario/>
      },
      {
        path: 'Eddy',
        element: <Eddy/>
      },
      {
        path: 'Maquinas',
        element: <Maquinas/>
      },
      {
        path: 'Vistorias',
        element: <Vistorias/>
      },
      {
        path: 'Relatorios',
        element: <Relatorios/>
      },
      {
        path: 'Ajuda',
        element: <Ajuda/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
      <ToastContainer position="bottom-right"/>
    </Provider>
  </React.StrictMode>,
)
