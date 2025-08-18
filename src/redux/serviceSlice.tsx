import { createSlice, createAsyncThunk, PayloadAction  } from "@reduxjs/toolkit";
import { Service, ServiceCreateDto } from "../types/Service";
import 
{
    getAllService,
    createService
}from "../services/serivceService"

interface ServiceState {
    items: Service[];
    selected?: Service | null;
    loading: boolean;
    error: string | null;
}

const initialState: ServiceState = {
    items: [],
    selected: null,
    loading: false,
    error: null,
};

//thunk
export const fetchServices = createAsyncThunk("service/fetchAll", async () => {
    return await getAllService();
});

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
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

export default serviceSlice.reducer;