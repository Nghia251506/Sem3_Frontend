import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import departmentReducer from "./deparmentSlice";
import gradeReducer from "./gradeSlice"
import serviceReducer from "./serviceSlice"

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    departments: departmentReducer,
    grades: gradeReducer,
    services: serviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
