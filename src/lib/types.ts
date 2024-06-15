export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  category: string;
};

export type NewUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  category: string;
};

export type Arrival = {
  id: number;
  date_arrival: Date;
  date_inspection: Date;
}

export type Departure = {
  id: number;
  address: string;
  client: string;
  date_departure: string;
  machineId: number;
}

export type NewDeparture = Omit<Departure, 'id'>

export type DepartureState = AuthApiState & {
  departure: Departure
}

export type DepartureUpdate = Omit<Departure, "machineId">

export type Image = {
  images: string[];
}

export type ImagesDeparture = Image & {
  departureId: number;
}

export type ImagesDepartureState = AuthApiState & {
  imagesDeparture: ImagesDeparture
}

export type ImagesArrival = Image & {
  arrivalId: number;
}

export type ImagesArrivalState = AuthApiState & {
  imagesArrival: ImagesArrival
}

export type Machine = {
  id: number;
  name: string;
  type: string;
}

export type MachineState = AuthApiState & {
  machine: Machine
}

export type NewMachine = Omit<Machine, "id">

export type Report = {
  arrivalId: number;
}

export type Sensor = {
  time: string;
  part_machine: string;
  localization: string;
  arrivalId: number;
}

export type SensorState = AuthApiState & {
  sensor: Sensor
}

export type AuthContextProps = {
  isAuthenticated: boolean;
  loginUser: () => void;
  logoutUser: () => void;
}

export type AuthApiState = {
  userInfo?: Omit<User, "password"> | Omit<NewUser, "password" | "passwordConfirm"> | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

export type ApiErrorType = {
  error?: string;
  erro?: string;
}