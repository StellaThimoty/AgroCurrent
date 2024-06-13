import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
 
export default function ErrorPage() {
  const error = useRouteError()
  if(isRouteErrorResponse(error)){
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-center">Algo deu errado!</h2>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && <p> {error.data.messsage} </p>}
      </div>
    );  
  } else {
    return (
      <div className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Algo deu errado!</h2>
      </div>
    )
  }
}