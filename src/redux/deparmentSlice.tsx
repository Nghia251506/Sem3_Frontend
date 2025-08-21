import { createSlice, createAsyncThunk, PayloadAction  } from "@reduxjs/toolkit";
import { Department, DepartmentCreateDto } from "../types/Department";
import {
    getDeparmentById,
    createDeparment,
    updatedepartment,
    getAllDeparment
} from "../services/departmentService";

interface DepartmentState {
    items: Department[];
    selected?: Department | null;
    loading: boolean;
    error: string | null;
}

const initialState: DepartmentState = {
    items: [],
    selected: null,
    loading: false,
    error: null,
};

//thunks
export const fetchDepartments = createAsyncThunk("department/fetchAll", async () => {
    return await getAllDeparment();
});

export const fetDepartmentById = createAsyncThunk("department/fetchById", async (id: number) => {
    return await getDeparmentById(id);
})

export const addDepartment = createAsyncThunk("department/add", async(dto: DepartmentCreateDto) => {
    return await createDeparment(dto);
});

export const editEmployee = createAsyncThunk(
  "department/edit",
  async ({ id, department }: { id: number; department: Department }) => {
    await updatedepartment(id, department);
    return { id, department };
  }
);

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDepartments.fulfilled, (state, action: PayloadAction<Department[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Fetch employees failed";
      })

      // fetchById
      .addCase(fetDepartmentById.fulfilled, (state, action: PayloadAction<Department>) => {
        state.selected = action.payload;
      })

      // add
      .addCase(addDepartment.fulfilled, (state, action: PayloadAction<Department>) => {
        state.items.push(action.payload);
      })

      // edit
      .addCase(editEmployee.fulfilled, (state, action) => {
        const idx = state.items.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload.department;
      })

      // remove
    //   .addCase(removeEmployee.fulfilled, (state, action: PayloadAction<number>) => {
    //     state.items = state.items.filter((e) => e.id !== action.payload);
    //   });
  },
});

export default departmentSlice.reducer;