import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Employee, EmployeeCreateDto } from "../types/Employee";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

interface EmployeeState {
  items: Employee[];
  selected?: Employee | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

// thunks
export const fetchEmployees = createAsyncThunk("employees/fetchAll", async () => {
  return await getAllEmployees();
});

export const fetchEmployeeById = createAsyncThunk("employees/fetchById", async (id: number) => {
  return await getEmployeeById(id);
});

export const addEmployee = createAsyncThunk("employees/add", async (dto: EmployeeCreateDto) => {
  return await createEmployee(dto);
});

export const editEmployee = createAsyncThunk(
  "employees/edit",
  async ({ id, employee }: { id: number; employee: Employee }) => {
    await updateEmployee(id, employee);
    return { id, employee };
  }
);

export const removeEmployee = createAsyncThunk("employees/remove", async (id: number) => {
  await deleteEmployee(id);
  return id;
});

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Fetch employees failed";
      })

      // fetchById
      .addCase(fetchEmployeeById.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.selected = action.payload;
      })

      // add
      .addCase(addEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.items.push(action.payload);
      })

      // edit
      .addCase(editEmployee.fulfilled, (state, action) => {
        const idx = state.items.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload.employee;
      })

      // remove
      .addCase(removeEmployee.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((e) => e.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
