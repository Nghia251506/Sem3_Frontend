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
  firstName: string;
  lastName: string;
  fullName: string;
  address: string;
  email: string;
  education: string;
  departmentId : number;
  gradeId: number;
  phone: string;
  jobTitle: string;
  dateOfJoin: Date;
  status: "active" | "inactive" | "suspended";
}
