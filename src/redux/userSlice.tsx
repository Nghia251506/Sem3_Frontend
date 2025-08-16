import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {User, UserCreateDto} from '../types/User'
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../services/userService';

interface UserState {
    items: User[];
    selected? : User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    items: [],
    selected: null,
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk("user/fetchAll", async () => {
  return await getAllUsers();
});

export const fetchUserById = createAsyncThunk<User, number>(
  "user/fetchById",
  async (id: number) => {
    const users = await getUserById(id);
    return users[0];
  }
);


export const addUser = createAsyncThunk("user/add", async (dto: UserCreateDto) => {
  return await createUser(dto);
});

export const editUser = createAsyncThunk(
  "user/edit",
  async ({ id, user }: { id: number; user: User }) => {
    await updateUser(id, user);
    return { id, user };
  }
);

export const removeUser = createAsyncThunk("user/remove", async (id: number) => {
  await deleteUser(id);
  return id;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Fetch employees failed";
      })

      // fetchById
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.selected = action.payload;
      })

      // add
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.items.push(action.payload);
      })

      // edit
      .addCase(editUser.fulfilled, (state, action) => {
        const idx = state.items.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload.user;
      })

      // remove
      .addCase(removeUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((e) => e.id !== action.payload);
      });
  },
});

export default userSlice.reducer;