import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  authState: boolean;
  id: string | null;
  name: string;
  email: string;
  phone: string;
  role: string;
  profile: string;
  authtoken: string;
}

const initialState: AuthState = {
  authState: false,
  id: null,
  name: "",
  email: "",
  phone: "",
  role: "",
  profile: "",
  authtoken: "",
};

let clearSessionTimer: NodeJS.Timeout | null = null;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      state.authState = action.payload.authState;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.profile = action.payload.profile;
      state.role = action.payload.role;
      state.authtoken = action.payload.authtoken;
      if (clearSessionTimer) {
        clearTimeout(clearSessionTimer);
      }
      clearSessionTimer = setTimeout(() => {
        clearSession();
      }, 60 * 60 * 1000);
    },
    clearAuthState: (state) => {
      state.authState = false;
      state.id = null;
      state.name = "";
      state.email = "";
      state.phone = "";
      state.role = "";
      state.profile = "";
      state.authtoken = "";
      clearSession();
    },
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;

const clearSession = () => {
  localStorage.removeItem("persist:auth");
  localStorage.clear();
  if (clearSessionTimer) {
    clearTimeout(clearSessionTimer);
  }
  clearSessionTimer = null;
};

export const authReducer = authSlice.reducer;
