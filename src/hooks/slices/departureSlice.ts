import { createSlice, createAsyncThunk,
  //  PayloadAction 
  } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import { toast } from 'react-toastify'
import { AuthApiState, ApiErrorType, Departure, DepartureUpdate
  // , Departure 
} from "@/lib/types";
import { AxiosError } from "axios";

const initialState: AuthApiState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
  status: "idle",
  error: null,
}

export const storeDeparture = createAsyncThunk("store", async (data: Departure,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/departure/", data)
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

export const getDepartureAll = createAsyncThunk("getAll", async (_,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/departure/")
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

export const getDepartureById = createAsyncThunk("getById", async (id:number, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/departure/id?${id}`)
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

export const updateDeparture = createAsyncThunk("update",async (data:DepartureUpdate, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`/departure/id?${data.id}`, data)
    const resData = res.data
    localStorage.setItem("userInfo", JSON.stringify(resData))
    return resData
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorResponse = error.response.data
      return rejectWithValue(errorResponse)
    }

    throw error
  }
})

export const deleteDeparture = createAsyncThunk("delete", async(id:number) => {
  try {
    const res = await axiosInstance.delete(`/departure/id?${id}`)
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

const departureSlice = createSlice({
  name: "departure",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(storeDeparture.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(storeDeparture.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Chegada encontrada!")
      state.status = "idle"
      return action.payload
    })
    .addCase(storeDeparture.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })

    .addCase(getDepartureAll.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(getDepartureAll.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Chegada encontrada!")
      state.status = "idle"
      return action.payload
    })
    .addCase(getDepartureAll.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })

    .addCase(getDepartureById.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(getDepartureById.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Saída encontrada!")
      state.status = "idle"
      return action.payload
    })
    .addCase(getDepartureById.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })

    .addCase(updateDeparture.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(updateDeparture.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Saída atualizada!")
      state.status = "idle"
      return action.payload
    })
    .addCase(updateDeparture.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Atualizar!"
        toast.error(state.error)
      }
    })

    .addCase(deleteDeparture.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(deleteDeparture.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Saída deletada!")
      state.status = "idle"
      return action.payload
    })
    .addCase(deleteDeparture.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })
  },
});

export default departureSlice.reducer;