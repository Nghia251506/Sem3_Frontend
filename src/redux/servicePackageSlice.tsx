// src/store/packageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PackageState {
  selectedPackage: any | null;
}

const initialState: PackageState = {
  selectedPackage: null,
};

const servicePackageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setSelectedPackage: (state, action: PayloadAction<any>) => {
      state.selectedPackage = action.payload;
    },
    clearSelectedPackage: (state) => {
      state.selectedPackage = null;
    },
  },
});

export const { setSelectedPackage, clearSelectedPackage } = servicePackageSlice.actions;
export default servicePackageSlice.reducer;
