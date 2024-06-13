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

const NotificationType = {
  Success: "success",
  Error: "error",
  Warning: "warning",
  Info: "info"
} as const
export type NotificationType = typeof NotificationType[keyof typeof NotificationType]

export type Notification = {
  open: boolean,
  message: string,
  type: NotificationType
}

export type ShowNotification = Omit<Notification, "open">