export interface User{
    id: number;
    employeeId: number;
    username: string;
    passwordHash: string;
    authRoleId: number;
}

export interface UserCreateDto{
    employeeId: number;
    username: string;
    passwordHash: string;
    authRoleId: number;
}