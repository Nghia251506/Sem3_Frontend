import { createSlice, createAsyncThunk, PayloadAction  } from "@reduxjs/toolkit";
import { Service, ServiceCreateDto, ServiceDetail } from "../types/Service";
import {
  getAllService,
  getServiceById,
  createService,
  updateService,
  deleteService
} from "../services/serviceService"

interface ServiceState {
    items: Service[];
    selected?: ServiceDetail | null;
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
export const fetchServiceById = createAsyncThunk<ServiceDetail, number>(
  "services/fetchById",
  async (id: number) => {
    return await getServiceById(id); // ✅ gọi hàm có sẵn
  }
);

export const addService = createAsyncThunk("service/add", async (dto: ServiceCreateDto) => {
  return await createService(dto);
});

export const editService = createAsyncThunk(
  "service/edit",
  async ({ id, service }: { id: number; service: Service }) => {
    await updateService(id, service);
    return { id, service };
  }
);

export const removeEService = createAsyncThunk("service/remove", async (id: number) => {
  await deleteService(id);
  return id;
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

      // fetchById
      .addCase(fetchServiceById.fulfilled, (state, action: PayloadAction<ServiceDetail>) => {
        state.selected = action.payload;
      })

      // add
      .addCase(addService.fulfilled, (state, action: PayloadAction<Service>) => {
        state.items.push(action.payload);
      })

      // edit
      .addCase(editService.fulfilled, (state, action) => {
        const idx = state.items.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload.service;
      })

      //remove
      .addCase(removeEService.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((e) => e.id !== action.payload);
      });
  },
});

export default serviceSlice.reducer;