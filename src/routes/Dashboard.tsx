import HeaderDash from '@/components/layout/header/headerDash'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { refresh } from '@/hooks/slices/authSlice'
import { Auth } from '@/lib/types'
import { useEffect, useRef } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'

export default function Dashboard() {
  const user = useRef(useAppSelector((state) => state.auth.userInfo))
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cargo = document.cookie.split("; ").filter(row => row.startsWith('category=')).map(cookie => cookie.split('=')[1])[0]
  const name = decodeURI(document.cookie.split("; ").filter(row => row.startsWith('name=')).map(cookie => cookie.split('=')[1])[0])

  useEffect(() => {
    document.title = "Agro Current - Dashboard"
    setTimeout(() => {
      if(!user) {
        navigate("/")
      }  
    }, 1000) //Um segundo
  }, [navigate, user])

  useEffect(() => {
    const intervalo = setInterval(async () => {
    const newUser =  await dispatch(refresh(user.current as Auth)).unwrap()
    user.current = newUser
    }, 60*60*100)
    return () => clearInterval(intervalo)
  }, [dispatch, user])

    return (    
      <>
        <HeaderDash pagename={`${name} - ${cargo}`} >
          <Outlet context={[cargo, name]}/>
        </HeaderDash>
      </>)
}

export function useUser() {
  return useOutletContext<string>();
}