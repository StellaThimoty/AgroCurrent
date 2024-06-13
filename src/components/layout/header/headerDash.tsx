import MenuBar from "../menu/menuBar";

export default function HeaderDash({children, pagename}: {children: React.ReactNode, pagename: string | null | undefined}){
  return (
  <>
  <main>
    <div className="bg-green-700 text-white p-2 flex items-center">
      <a href='/'>
        <img src="/AGROENOIS2.jpg" alt="logo" className="mr-2" width={65} height={65}/>      
      </a>
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">Formulário de vistoria - {pagename}</h1>
        </div>
      </div>    
      <div className="bg-green-800 text-white flex justify-between items-center p-2">
        <div className="flex space-x-2">
          <MenuBar/>
        </div>
      </div>
      <div className="flex p-6 items-center space-x-2">{children}</div>
  </main>
  </>
  )
}