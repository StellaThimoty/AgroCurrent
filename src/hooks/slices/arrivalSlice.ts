import { createSlice, createAsyncThunk,
  //  PayloadAction 
  } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import { AuthApiState, ApiErrorType
  // , Arrival 
} from "@/lib/types";
import { AxiosError } from "axios";

const initialState: AuthApiState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
  status: "idle",
  error: null,
}

export const getArrivalAll = createAsyncThunk("getAll", async (_,{ rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/arrival/")
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

export const getArrivalById = createAsyncThunk("getById", async (id:number, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/arrival/id?${id}`)
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

export const updateArrival = createAsyncThunk("update",async (data:{id: number, data: string}, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`/arrival/id?${data.id}`, data)
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

export const deleteArrival = createAsyncThunk("delete", async(id:number) => {
  try {
    const res = await axiosInstance.delete(`/arrival/id?${id}`)
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

const arrivalSlice = createSlice({
  name: "arrival",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // getAll
    .addCase(getArrivalAll.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(getArrivalAll.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(getArrivalAll.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(getArrivalById.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(getArrivalById.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(getArrivalById.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(updateArrival.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(updateArrival.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(updateArrival.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Atualizar!"      }
    })

    .addCase(deleteArrival.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(deleteArrival.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(deleteArrival.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })
  },
});

export default arrivalSlice.reducer;