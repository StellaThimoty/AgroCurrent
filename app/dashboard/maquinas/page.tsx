import { Metadata } from 'next';
import Image from 'next/image';
export const metadata: Metadata = {
  title: 'Maquinas'
}

const Page = () => {
  return (
    <>
    <h1>Revolussam das makina</h1>
    <video autoPlay muted controls>
      <source src="/robot.mp4" type="video/mp4" />
      Your browser does not support the video tag...
    </video>
    </>
  )
}

export default Page 