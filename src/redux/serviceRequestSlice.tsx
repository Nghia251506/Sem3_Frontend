import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ServiceRequest, ServiceRequestCreateDto } from "../types/ServiceRequest";

import {
  createRequest,
  getAllRequest,
  getRequestById,
  updateRequest,
  deleteRequest
} from "../services/serviceRequestService";

interface ServiceRequestState {
  items: ServiceRequest[];
  selected?: ServiceRequest | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServiceRequestState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};



export const addRequest = createAsyncThunk("request/add", async (dto: ServiceRequestCreateDto) => {
  return await createRequest(dto);
});

export const fetchServiceRequests = createAsyncThunk("servicerequest/fetchAll", async () => {
  return await getAllRequest();
});

export const fetchServiceRequestById = createAsyncThunk("servicerequest/fetchById", async (id: number) => {
  return await getRequestById(id);
});

export const editRequest = createAsyncThunk("request/update", async ({ id, request }: { id: number; request: ServiceRequest }) => {
  await updateRequest(id, request);
  return { id, request };
})

export const removeRequest = createAsyncThunk("request/remove", async (id: number) => {
  await deleteRequest(id);
  return id;
})

const serviceRequestSlice = createSlice({
  name: "servicerequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchServiceRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServiceRequests.fulfilled, (state, action: PayloadAction<ServiceRequest[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchServiceRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Fetch employees failed";
      })

      // fetchById
      .addCase(fetchServiceRequestById.fulfilled, (state, action: PayloadAction<ServiceRequest>) => {
        state.selected = action.payload;
      })

      // add
      .addCase(addRequest.fulfilled, (state, action: PayloadAction<ServiceRequest>) => {
        state.items.push(action.payload);
      })

      // edit
      .addCase(editRequest.fulfilled, (state, action) => {
        const idx = state.items.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload.request;
      })

      //remove
      .addCase(removeRequest.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((e) => e.id !== action.payload);
      });
  },
});

export default serviceRequestSlice.reducer