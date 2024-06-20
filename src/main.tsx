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
import Sensor from './routes/SubDashboard/Sensor/Sensor';
import Ajuda from './routes/SubDashboard/Ajuda';
import Usuario from './routes/SubDashboard/Usuario/Usuario';
import EditMachineForm from './components/layout/maquina/maquinaEditForm';
import EditReportForm from './components/layout/relatorio/saida/relatorioEditForm';
import ImagesDepartureForm from './components/layout/relatorio/saida/imagesForm';

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
        path: 'Home',
        element: <Usuario/>
      },
      {
        path: 'Sensor',
        element: <Sensor/>
      },
      {
        path: 'Maquinas',
        element: <Maquinas/>,
      },
      {
        path: 'Maquinas/:id',
        element: <EditMachineForm/>
      },
      {
        path: 'Relatorios',
        element: <Relatorios/>
      },
      {
        path: 'Relatorios/:id',
        element: <EditReportForm/>
      },
      {
        path: 'ImagesD/:id',
        element: <ImagesDepartureForm/>
      },
      {
        path: 'Vistorias',
        element: <Vistorias/>
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
  </React.StrictMode>
)
