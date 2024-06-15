import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import { toast } from 'react-toastify'
import { ApiErrorType, ImagesArrival, ImagesArrivalState } from "@/lib/types";
import { AxiosError } from "axios";

const initialState: ImagesArrivalState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
  imagesArrival: {
    images: [],
    arrivalId: 0,
  },
  status: "idle",
  error: null,
}

export const storeImagesArrival = createAsyncThunk("storeImagesArrival", async (data: ImagesArrival,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.post(`/imagesArrival/${data.arrivalId}`, data)
    const resData = res.data

    return resData
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorResponse = error.response.data
      return rejectWithValue(errorResponse)
    }
    throw error
  }
})

export const getImagesArrivalById = createAsyncThunk("getImagesArrivalById", async (id:number, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/imagesArrival/${id}`)
    const resData = res.data

    return resData
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorResponse = error.response.data
      return rejectWithValue(errorResponse)
    }
    throw error
  }
})

export const deleteImagesArrival = createAsyncThunk("deleteImagesArrival", async(id:number) => {
  try {
    const res = await axiosInstance.delete(`/imagesArrival/${id}`)
    const resData = res.data

    return resData
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorResponse = error.response.data
      return errorResponse
    }
    throw error
  }
})

const imagesArrivalSlice = createSlice({
  name: "imagesArrival",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(storeImagesArrival.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(storeImagesArrival.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Relatório criado!")
      state.status = "idle"
      return action.payload
    })
    .addCase(storeImagesArrival.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error  || (action.payload as ApiErrorType).erro || "Erro ao Cadastrar!"
        toast.error(state.error)
      }
    })

    .addCase(getImagesArrivalById.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(getImagesArrivalById.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Relatório encontrado!")
      state.status = "idle"
      return action.payload
    })
    .addCase(getImagesArrivalById.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error  || (action.payload as ApiErrorType).erro || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })

    .addCase(deleteImagesArrival.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(deleteImagesArrival.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Relatório deletado!")
      state.status = "idle"
      return action.payload
    })
    .addCase(deleteImagesArrival.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error  || (action.payload as ApiErrorType).erro || "Erro ao Deletar!"
        toast.error(state.error)
      }
    })
  },
});

export default imagesArrivalSlice.reducer;