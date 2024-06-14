import { createSlice, createAsyncThunk,
  //  PayloadAction 
  } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
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
    .addCase(storeDeparture.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(storeDeparture.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(storeDeparture.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(getDepartureAll.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(getDepartureAll.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(getDepartureAll.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(getDepartureById.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(getDepartureById.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(getDepartureById.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(updateDeparture.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(updateDeparture.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(updateDeparture.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Atualizar!"      }
    })

    .addCase(deleteDeparture.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(deleteDeparture.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(deleteDeparture.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })
  },
});

export default departureSlice.reducer;