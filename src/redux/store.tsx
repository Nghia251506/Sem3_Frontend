import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import departmentReducer from "./deparmentSlice";
import gradeReducer from "./gradeSlice"
import serviceReducer from "./serviceSlice"
import aboutusReducer from "./aboutUsSlice"
import servicePackageSlice from "./servicePackageSlice"

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    departments: departmentReducer,
    grades: gradeReducer,
    services: serviceReducer,
    aboutuses: aboutusReducer,
    servicePackage: servicePackageSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
