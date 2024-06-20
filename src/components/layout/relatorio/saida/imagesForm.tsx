import { PlusCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";
import { ImagesDeparture } from "@/lib/types";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useParams } from "react-router-dom";
import { storeImagesDeparture } from "@/hooks/slices/imagesDSlice";
import { Button } from "@/components/ui/button";

export default function ImagesDepartureForm() {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const departureId = Number(id)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [image, setImage] = useState<ImagesDeparture>({
    address_image: "",
    departureId: 0
  })
  const [preview, setPreview] = useState('')

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    toast.loading("Carregando imagens...")
    setPreview(URL.createObjectURL(file as File))
    setSelectedFile(file)

    setImage({
      address_image: preview.replace('data:', '').replace(/^.+,/, ''),
      departureId: departureId
    })
    toast.dismiss()
    toast.success("Imagens carregadas!")

    if (file) {
        URL.createObjectURL(file)
      }
    }

    async function handleCreate() {
    try {
      await dispatch(storeImagesDeparture(image)).unwrap()
      // await dispatch(login({email, password})).unwrap()
      // navigate("/dashboard")
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">
          Cadastro de Relatórios
        </h1>
    <div className="w-full">
      <label className="my-3 block font-medium text-gray-900" htmlFor="file">
        Imagens da saída
      </label>
      <div className="relative">
        <input
          className="peer block w-80 border border-black py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          id="file"
          type="file"
          name="file"
          accept=".jpeg, .png, .jpg"
          multiple
          onChange={handleFileInput}
          required
        />
        <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="w-full my-3">
        {preview ? <img src={preview} width={244} height={244}></img> : null}
      </div>
    </div>
    <Button className="mt-7 mb-2 flex text-black bg-yellow-500 px-2 py-2 hover:bg-lime-200" onClick={handleCreate}>
      Cadastrar <PlusCircleIcon className="w-6 mx-1" />
    </Button>
  </div>
  )
}

