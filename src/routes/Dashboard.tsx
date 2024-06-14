import HeaderDash from '@/components/layout/header/headerDash'
import { useAppSelector } from '@/hooks/reduxHooks'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const user = useAppSelector((state) => state.auth.userInfo)
  const navigate = useNavigate()
  const cargo = document.cookie.split("; ").filter(row => row.startsWith('category=')).map(cookie => cookie.split('=')[1])[0]
  const name = decodeURI(document.cookie.split("; ").filter(row => row.startsWith('name=')).map(cookie => cookie.split('=')[1])[0])

  useEffect(() => {
    document.title = "Agro Current - Dashboard"
    if(!user) {
      navigate("/")
    }
  }, [navigate, user])

    return (    
      <>
        <HeaderDash pagename={`${name} - ${cargo}`} >
          <Outlet />
        </HeaderDash>
      </>)
}