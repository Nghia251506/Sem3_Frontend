export interface Employee {
  id: number;
  employeeCode: string;
  fullName: string;
  phone: string;
  email: string;
  jobTitle: string;
  status: "active" | "inactive" | "suspended";
}


export interface EmployeeCreateDto {
  name: string;
  position: string;
  email: string;
  phone: string;
}
