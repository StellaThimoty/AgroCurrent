import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import { AuthApiState, ApiErrorType, Sensor } from "@/lib/types";
import { AxiosError } from "axios";

const initialState: AuthApiState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
  status: "idle",
  error: null,
}

export const storeSensor = createAsyncThunk("store", async (data: Sensor,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/sensor/", data)
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

export const getSensorAll = createAsyncThunk("getAll", async (_,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/sensor/")
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

export const getSensorById = createAsyncThunk("getById", async (id:number, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/sensor/id?${id}`)
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

export const deleteSensor = createAsyncThunk("delete", async(id:number) => {
  try {
    const res = await axiosInstance.delete(`/sensor/id?${id}`)
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
    .addCase(storeSensor.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(storeSensor.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(storeSensor.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(getSensorById.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(getSensorById.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(getSensorById.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(deleteSensor.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(deleteSensor.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(deleteSensor.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })
  },
});

export default sensorSlice.reducer;