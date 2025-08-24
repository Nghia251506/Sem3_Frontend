import { createSlice, createAsyncThunk, PayloadAction  } from "@reduxjs/toolkit";
import { AboutUs, AboutUsCreateDto,AboutUsUpdateDto} from "../types/AboutUs";
import {
    getAllAboutUs,
    getAboutUsById,
    createAboutUs,
    updateAboutUs
}from "../services/AboutUsService"

interface AboutUsState{
    items: AboutUs[];
    selected?: AboutUs | null;
    loading: boolean;
    error: string | null;
}

const initialState: AboutUsState = {
    items: [],
    selected: null,
    loading: false,
    error: null,
}

//thunks

export const fetchAboutUses = createAsyncThunk("aboutus/fetchAll", async () => {
    return await getAllAboutUs();
});

export const fetchAboutUsById = createAsyncThunk("aboutus/fetchById", async (id: number) => {
    return await getAboutUsById(id);
});

export const addAboutUs = createAsyncThunk("aboutus/add", async (dto: AboutUsCreateDto) => {
    return await createAboutUs(dto);
});

export const editEmployee = createAsyncThunk(
  "aboutus/edit",
  async ({ id, aboutus }: { id: number; aboutus: AboutUs }) => {
    await updateAboutUs(id, aboutus);
    return { id, aboutus };
  }
);

const aboutusSlice = createSlice({
    name: "aboutuses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          // fetchAll
          .addCase(fetchAboutUses.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchAboutUses.fulfilled, (state, action: PayloadAction<AboutUs[]>) => {
            state.loading = false;
            state.items = action.payload;
          })
          .addCase(fetchAboutUses.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? "Fetch employees failed";
          })
    
          // fetchById
          .addCase(fetchAboutUsById.fulfilled, (state, action: PayloadAction<AboutUs>) => {
            state.selected = action.payload;
          })
    
          // add
          .addCase(addAboutUs.fulfilled, (state, action: PayloadAction<AboutUs>) => {
            state.items.push(action.payload);
          })
    
          // edit
          .addCase(editEmployee.fulfilled, (state, action) => {
            const idx = state.items.findIndex((e) => e.id === action.payload.id);
            if (idx !== -1) state.items[idx] = action.payload.aboutus;
          })
    
          // remove
        //   .addCase(removeEmployee.fulfilled, (state, action: PayloadAction<number>) => {
        //     state.items = state.items.filter((e) => e.id !== action.payload);
        //   });
      },
});

export default aboutusSlice.reducer;