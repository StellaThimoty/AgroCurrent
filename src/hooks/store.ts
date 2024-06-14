import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import arrivalReducer from './slices/arrivalSlice'
import departureReducer from './slices/departureSlice'
import machineReducer from './slices/machineSlice'
import reportReducer from './slices/reportSlice'
import sensorReducer from './slices/sensorSlice'
import imagesArrivalReducer from './slices/imagesASlice'
import imagesDepartureReducer from './slices/imagesDSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    arrival: arrivalReducer,
    departure: departureReducer,
    machine: machineReducer,
    report: reportReducer,
    sensor: sensorReducer,
    imagesArrival: imagesArrivalReducer,
    imagesDeparture: imagesDepartureReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;