import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import { toast } from 'react-toastify'
import { ImagesDepartureState, ApiErrorType, ImagesDeparture } from "@/lib/types";
import { AxiosError } from "axios";

const initialState: ImagesDepartureState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
  imagesDeparture: {
    images: [],
    departureId: 0,
  },
  status: "idle",
  error: null,
}
export const storeImagesDeparture = createAsyncThunk("storeImagesDeparture", async (data: ImagesDeparture,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.post(`/imagesDeparture/${data.departureId}`, data)
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

export const getImagesDepartureById = createAsyncThunk("getImagesDepartureById", async (id:number, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/imagesDeparture/${id}`)
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

export const deleteImagesDeparture = createAsyncThunk("deleteImagesDeparture", async(id:number) => {
  try {
    const res = await axiosInstance.delete(`/imagesDeparture/${id}`)
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

const imagesDepartureSlice = createSlice({
  name: "imagesDeparture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(storeImagesDeparture.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(storeImagesDeparture.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Relatório criado!")
      state.status = "idle"
      state.imagesDeparture = action.payload
    })
    .addCase(storeImagesDeparture.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro  || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })

    .addCase(getImagesDepartureById.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(getImagesDepartureById.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Relatório encontrado!")
      state.status = "idle"
      state.imagesDeparture = action.payload
    })
    .addCase(getImagesDepartureById.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro  || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })

    .addCase(deleteImagesDeparture.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(deleteImagesDeparture.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Relatório deletado!")
      state.status = "idle"
      state.imagesDeparture = action.payload
    })
    .addCase(deleteImagesDeparture.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro  || "Erro ao Deletar!"
        toast.error(state.error)
      }
    })
  },
});

export default imagesDepartureSlice.reducer;