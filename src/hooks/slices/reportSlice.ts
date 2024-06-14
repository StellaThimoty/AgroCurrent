import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import { toast } from 'react-toastify'
import { AuthApiState, ApiErrorType, Report } from "@/lib/types";
import { AxiosError } from "axios";

const initialState: AuthApiState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
  status: "idle",
  error: null,
}

export const storeReport = createAsyncThunk("store", async (data: Report,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/report", data)
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
    const res = await axiosInstance.get("/report")
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
    const res = await axiosInstance.get(`/report/${id}`)
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

export const updateReport = createAsyncThunk("update",async (data:Report, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`/report/${data.arrivalId}`, data)
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

export const deleteReport = createAsyncThunk("delete", async(id:number) => {
  try {
    const res = await axiosInstance.delete(`/report/${id}`)
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
    .addCase(storeReport.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(storeReport.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Relatório encontrado!")
      state.status = "idle"
      return action.payload
    })
    .addCase(storeReport.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro  || "Erro ao Cadastrar!"
        toast.error(state.error)
      }
    })

    .addCase(getReportAll.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(getReportAll.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Relatório encontrado!")
      state.status = "idle"
      return action.payload
    })
    .addCase(getReportAll.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro  || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })

    .addCase(getReportById.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(getReportById.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Relatório encontrado!")
      state.status = "idle"
      return action.payload
    })
    .addCase(getReportById.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro  || "Erro ao Buscar!"
        toast.error(state.error)
      }
    })

    .addCase(deleteReport.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(deleteReport.fulfilled, (state, action) =>{
      toast.dismiss()
      toast.success("Relatório deletado!")
      state.status = "idle"
      return action.payload
    })
    .addCase(deleteReport.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || (action.payload as ApiErrorType).erro  || "Erro ao Deletar!"
        toast.error(state.error)
      }
    })
  },
});

export default reportSlice.reducer;