import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import { AuthApiState, ApiErrorType, Report } from "@/lib/types";
import { AxiosError } from "axios";

const initialState: AuthApiState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
  status: "idle",
  error: null,
}

export const storeReport = createAsyncThunk("store", async (data: Report,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/report/", data)
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

export const getReportAll = createAsyncThunk("getAll", async (_,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/report/")
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

export const getReportById = createAsyncThunk("getById", async (id:number, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/report/id?${id}`)
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

export const deleteReport = createAsyncThunk("delete", async(id:number) => {
  try {
    const res = await axiosInstance.delete(`/report/id?${id}`)
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

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(storeReport.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(storeReport.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(storeReport.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(getReportAll.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(getReportAll.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(getReportAll.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(getReportById.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(getReportById.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(getReportById.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(deleteReport.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(deleteReport.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(deleteReport.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })
  },
});

export default reportSlice.reducer;