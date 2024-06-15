import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import { toast } from 'react-toastify'
import { ApiErrorType, Machine, MachineState } from "@/lib/types";
import { AxiosError } from "axios";

const initialState: MachineState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
  machine: {
    id: 0,
    name: "",
    type: "",
  },
  status: "idle",
  error: null,
}

export const storeMachine = createAsyncThunk("storeMachine", async (data: {name: string, type:string},{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/machine", data)
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

export const getMachineAll = createAsyncThunk("getMachineAll", async (_,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/machine")
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

export const getMachineById = createAsyncThunk("getMachineById", async (id:number, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/machine/${id}`)
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

export const updateMachine = createAsyncThunk("updateMachine",async (data:Partial<Machine>, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`/machine/${data.id}`, data)
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

export const deleteMachine = createAsyncThunk("deleteMachine", async(id:number) => {
  try {
    const res = await axiosInstance.delete(`/machine/${id}`)
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
    .addCase(storeMachine.fulfilled, (state, action: PayloadAction<Machine>) => {
      toast.dismiss()
      state.status = "idle"
      toast.success("Máquina criada!")
      state.machine = action.payload
    })
    .addCase(storeMachine.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro || "Erro ao Criar!"
        toast.error(state.error)
      }
    })
    .addCase(getMachineAll.pending, (state) =>{
      state.status = "loading"
      state.error = null
    })
    .addCase(getMachineAll.fulfilled, (state, action) =>{
      state.status = "idle"
      state.machine = action.payload
    })
    .addCase(getMachineAll.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro || "Erro ao Buscar!"
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
      state.status = "idle"
      state.machine = action.payload
    })
    .addCase(getMachineById.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro || "Erro ao Buscar!"
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
      state.machine = action.payload
    })
    .addCase(updateMachine.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro || "Erro ao Atualizar!"
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
      state.machine = action.payload
    })
    .addCase(deleteMachine.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro || "Erro ao Deletar!"
        toast.error(state.error)
      }
    })
  },
});

export default machineSlice.reducer;