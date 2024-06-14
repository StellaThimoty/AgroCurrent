import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import { ApiErrorType, Machine, MachineState, NewMachine } from "@/lib/types";
import { AxiosError } from "axios";

const initialState: MachineState = {
  // userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
  machine: {
    name: "",
    type: "",
  },
  status: "idle",
  error: null,
}

export const storeMachine = createAsyncThunk("store", async (data: NewMachine,{ rejectWithValue }) => {
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
      state.status = "loading"
      state.error = null
    })
    .addCase(storeMachine.fulfilled, (state, action: PayloadAction<NewMachine>) =>{
      state.status = "idle"
      state.machine = action.payload
    })
    .addCase(storeMachine.rejected, (state, action) =>{
      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Criar!"
      }
    })

    .addCase(getMachineAll.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(getMachineAll.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(getMachineAll.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(getMachineById.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(getMachineById.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(getMachineById.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Buscar!"      }
    })

    .addCase(updateMachine.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(updateMachine.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(updateMachine.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Atualizar!"      }
    })

    .addCase(deleteMachine.pending, (state) =>{      state.status = "loading"
      state.error = null
    })
    .addCase(deleteMachine.fulfilled, (state, action) =>{      state.status = "idle"
      return action.payload
    })
    .addCase(deleteMachine.rejected, (state, action) =>{      state.status = "failed"
      if (action.payload) {
        state.error = (action.payload as ApiErrorType).error || "Erro ao Deletar!"      }
    })
  },
});

export default machineSlice.reducer;