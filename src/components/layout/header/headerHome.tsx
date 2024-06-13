import agroenois from '/AGROENOIS2.jpg'

export default function HeaderHome({pagename}: {pagename: string | null | undefined}){
  return (
  <>
      <main className="bg-green-700 text-white p-2 flex items-center">
    <a href='/'>
      <img src={agroenois} alt="logo" className="mr-2" width={65} height={65}/>      
    </a>
      <div className="flex flex-col">
        <h1 className="font-bold text-xl">Formulário de vistoria - {pagename}</h1>
      </div>
    </main>
  </>
  )
}