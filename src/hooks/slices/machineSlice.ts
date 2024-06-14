import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import { toast } from 'react-toastify'
import { AuthApiState, ApiErrorType, Machine } from "@/lib/types";
import { AxiosError } from "axios";

const initialState: AuthApiState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
  status: "idle",
  error: null,
}

export const storeMachine = createAsyncThunk("store", async (data: Machine,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/machine/", data)
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

export const getMachineAll = createAsyncThunk("getAll", async (_,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/machine/")
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

export const getMachineById = createAsyncThunk("getById", async (id:number, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/machine/id?${id}`)
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

export const updateMachine = createAsyncThunk("update",async (data:Machine, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`/machine/id?${data.id}`, data)
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

export const deleteMachine = createAsyncThunk("delete", async(id:number) => {
  try {
    const res = await axiosInstance.delete(`/machine/id?${id}`)
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

const machineSlice = createSlice({
  name: "machine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(storeMachine.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(storeMachine.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Máquina criada!")
      state.status = "idle"
      return action.payload
    })
    .addCase(storeMachine.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })

    .addCase(getMachineAll.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(getMachineAll.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Máquina encontrada!")
      state.status = "idle"
      return action.payload
    })
    .addCase(getMachineAll.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })

    .addCase(getMachineById.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(getMachineById.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Máquina encontrada!")
      state.status = "idle"
      return action.payload
    })
    .addCase(getMachineById.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })

    .addCase(updateMachine.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(updateMachine.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Máquina atualizada!")
      state.status = "idle"
      return action.payload
    })
    .addCase(updateMachine.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Atualizar!"
        toast.error(state.error)
      }
    })

    .addCase(deleteMachine.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(deleteMachine.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Máquina deletada!")
      state.status = "idle"
      return action.payload
    })
    .addCase(deleteMachine.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })
  },
});

export default machineSlice.reducer;