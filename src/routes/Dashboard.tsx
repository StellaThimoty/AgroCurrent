import HeaderDash from '@/components/layout/header/headerDash'
import { useAppSelector } from '@/hooks/reduxHooks'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const user = useAppSelector((state) => state.auth.userInfo)
  const navigate = useNavigate()

  useEffect(() => {
    if(!user) {
      navigate("/")
    }
  }, [navigate, user])

    return (    
      <>
        <HeaderDash pagename="Usuário">
          <Outlet />
        </HeaderDash>
      </>)
}