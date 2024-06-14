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
  date_departure: Date;
  machineId: number;
}

export type DepartureUpdate = Omit<Departure, "machineId">

export type Image = {
  image: string;
}

export type ImagesDeparture = Image & {
  departureId: number;
}

export type ImagesArrival = Image & {
  arrivalId: number;
}

export type Machine = {
  id: number;
  name: string;
  type: string;
}

export type MachineState = AuthApiState & {
  machine: NewMachine
}

export type NewMachine = Omit<Machine, "id">

export type Report = {
  arrivalId: number;
}

export type Sensor = {
  time: Date;
  part_machine: string;
  localization: string;
  arrivalId: number;
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
  error: string;
}