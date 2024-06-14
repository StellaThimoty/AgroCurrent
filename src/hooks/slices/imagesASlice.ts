import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import { AuthApiState, ApiErrorType, ImagesArrival } from "@/lib/types";
import { AxiosError } from "axios";

const initialState: AuthApiState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
  status: "idle",
  error: null,
}

export const storeImagesArrival = createAsyncThunk("store", async (data: ImagesArrival,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.post(`/imagesArrival/id?${data.arrivalId}`, data)
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

export const getImagesArrivalById = createAsyncThunk("getById", async (id:number, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/imagesArrival/id?${id}`)
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

export const deleteImagesArrival = createAsyncThunk("delete", async(id:number) => {
  try {
    const res = await axiosInstance.delete(`/imagesArrival/id?${id}`)
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
    .addCase(storeImagesArrival.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(storeImagesArrival.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(storeImagesArrival.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(getImagesArrivalById.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(getImagesArrivalById.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(getImagesArrivalById.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(deleteImagesArrival.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(deleteImagesArrival.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(deleteImagesArrival.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })
  },
});

export default imagesArrivalSlice.reducer;