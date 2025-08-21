export interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  fullName: string;
  address: string;
  phone: string;
  email: string;
  jobTitle: string;
  deateOfJoin: Date;
  status: "active" | "inactive" | "suspended";
  departmentName?: string;
  departmentId: number;
  gradeName?: string;
  gradeId: number;
  education?: string;
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
