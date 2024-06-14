import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";
import { toast } from 'react-toastify'
import { User, AuthApiState, NewUser, ApiErrorType } from "@/lib/types";
import { AxiosError } from "axios";

const initialState: AuthApiState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
  status: "idle",
  error: null,
}

export const login = createAsyncThunk("login", async (data: {email: string, password: string}, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/auth/login", data)
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

export const register = createAsyncThunk("register", async (data: {name: string, email: string, password: string, category: string}, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/auth/register", data)
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

export const logout = createAsyncThunk("logout", async (_, {rejectWithValue}) => {
  try {
    const res = await axiosInstance.post("/auth/logout")
    const resData = res.data
    localStorage.removeItem("userInfo")
  
    return resData
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorResponse = error.response.data

      return rejectWithValue(errorResponse)
    }
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Login
    .addCase(login.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(login.fulfilled, (state, action: PayloadAction<User>) =>{
      toast.dismiss()
      toast.success("Logado com sucesso!")
      state.status = "idle"
      state.userInfo = action.payload
    })
    .addCase(login.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if (action.payload) {
        // NÃO É ERRO
        // ISSO AQUI É DEFINIDO EM RUNTIME
        state.error = (action.payload as ApiErrorType).error || "Erro ao logar!"
        toast.error(state.error)
      }
    })
    // Cadastro
    .addCase(register.pending, (state) =>{
      toast.loading("Carregando...")
      state.status = "loading"
      state.error = null
    })
    .addCase(register.fulfilled, (state, action: PayloadAction<NewUser>) =>{
      toast.dismiss()
      toast.success("Cadastrado com sucesso!")
      state.status = "idle"
      state.userInfo = action.payload
    })
    .addCase(register.rejected, (state, action) =>{
      toast.dismiss()
      state.status = "failed"
      if(action.payload) {
        // NÃO É ERRO
        // ISSO AQUI É DEFINIDO EM RUNTIME
        state.error = (action.payload as ApiErrorType).error || "Falha no Cadastro"
        toast.error(state.error)
      }
    })
    // Logout
    .addCase(logout.pending, (state) => {
      toast.loading("Carregando...")
      state.status = "loading";
      state.error = null;
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .addCase(logout.fulfilled, (state) => {
      toast.dismiss()
      toast.success("Logout com sucesso!")
      state.status = "idle";
      state.userInfo = null;
    })
    .addCase(logout.rejected, (state, action) => {
      toast.dismiss()
      toast.error("Erro ao sair!")
      state.status = "failed";
      //Sem wrapper porque o único erro de logout é referente a token e como o post não envia um corpo
      //Não temos como passar um wrapper, a mensagem de erro já é suficiente
      state.error = action.error.message || "Logout failed";
    })
  },
});

export default authSlice.reducer;