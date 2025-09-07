import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {ServiceRequest, ServiceRequestCreateDto} from "../types/ServiceRequest";

import {
  createRequest,
} from "../services/serviceRequestService";

export const addRequest = createAsyncThunk("request/add", async (dto: ServiceRequestCreateDto) => {
  return await createRequest(dto);
});