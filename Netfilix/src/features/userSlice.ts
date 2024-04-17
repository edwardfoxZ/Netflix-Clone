import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface userState {
  value: {
    user: User | null;
    isLoading: boolean;
  };
}

export interface User {
  email: string;
  username: string;
}

const initialState: userState = {
  value: {
    user: null,
    isLoading: true,
  },
};

export const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value.user = action.payload;
      state.value.isLoading = false;
    },
    clearUser: (state) => {
      state.value.user = null;
      state.value.isLoading = false;
    },
  },
});

export const { setUser, clearUser } = useSlice.actions;
export default useSlice.reducer;
