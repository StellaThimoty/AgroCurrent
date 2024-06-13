import { PowerIcon } from '@heroicons/react/24/outline';
import MenuItem from './menuItems';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/hooks/slices/authSlice';

export default function MenuBar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap()
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
    <MenuItem/>
    <Button className="flex select-none bg-white text-black px-2 py-2 hover:bg-lime-200" onClick={handleLogout} key={"logout"}><PowerIcon className="w-6 mx-1" />SAIR</Button>   
    </>
  );
}