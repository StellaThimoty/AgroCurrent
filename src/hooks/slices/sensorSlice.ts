import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import { toast } from 'react-toastify'
import { ApiErrorType, Sensor, SensorState } from "@/lib/types";
import { AxiosError } from "axios";

const initialState: SensorState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
  sensor: {
    time: "",
    part_machine: "",
    localization: "",
    arrivalId: 0,
  },
  status: "idle",
  error: null,
}

export const storeSensor = createAsyncThunk("storeSensor", async (data: Sensor,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/sensor", data)
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

export const getSensorAll = createAsyncThunk("getSensorAll", async (_,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/sensor")
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

export const getSensorById = createAsyncThunk("getSensorById", async (id:number, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/sensor/${id}`)
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

export const deleteSensor = createAsyncThunk("deleteSensor", async(id:number) => {
  try {
    const res = await axiosInstance.delete(`/sensor/${id}`)
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

const sensorSlice = createSlice({
  name: "sensor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(storeSensor.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(storeSensor.fulfilled, (state, action: PayloadAction<Sensor>) =>{
      toast.dismiss()
      toast.success("Máquina criada!")
      state.status = "idle"
      state.sensor = action.payload
    })
    .addCase(storeSensor.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro  || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })

    .addCase(getSensorById.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(getSensorById.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Máquina encontrada!")
      state.status = "idle"
      return action.payload
    })
    .addCase(getSensorById.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro  || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })

    .addCase(deleteSensor.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(deleteSensor.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Máquina deletada!")
      state.status = "idle"
      return action.payload
    })
    .addCase(deleteSensor.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro  || "Erro ao Deletar!"
        toast.error(state.error)
      }
    })
  },
});

export default sensorSlice.reducer;