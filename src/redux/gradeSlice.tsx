import { createSlice, createAsyncThunk, PayloadAction  } from "@reduxjs/toolkit";
import { Grade } from "../types/Grade";
import { getAllGrade } from "../services/gradeService";

interface GradeState {
    items: Grade[];
    selected?: Grade | null;
    loading: boolean;
    error: string | null
}

const initialState: GradeState = {
    items: [],
    selected: null,
    loading: false,
    error: null,
};

//thunk

export const fetchGrades = createAsyncThunk("grade/fetchAll", async () => {
    return await getAllGrade();
});

const gradeSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGrades.fulfilled, (state, action: PayloadAction<Grade[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Fetch employees failed";
      })

    //   // fetchById
    //   .addCase(fetDepartmentById.fulfilled, (state, action: PayloadAction<Department>) => {
    //     state.selected = action.payload;
    //   })

    //   // add
    //   .addCase(addDepartment.fulfilled, (state, action: PayloadAction<Department>) => {
    //     state.items.push(action.payload);
    //   })

    //   // edit
    //   .addCase(editEmployee.fulfilled, (state, action) => {
    //     const idx = state.items.findIndex((e) => e.id === action.payload.id);
    //     if (idx !== -1) state.items[idx] = action.payload.department;
    //   })

      // remove
    //   .addCase(removeEmployee.fulfilled, (state, action: PayloadAction<number>) => {
    //     state.items = state.items.filter((e) => e.id !== action.payload);
    //   });
  },
});

export default gradeSlice.reducer;