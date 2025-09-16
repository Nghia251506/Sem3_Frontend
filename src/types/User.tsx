export interface User{
    id: number;
    employeeId: number;
    username: string;
    passwordHash: string;
    authRoleId: number;
    fullName: string;
    phone: string;
    email: string;
}

export interface UserCreateDto{
    employeeId: number;
    username: string;
    password_hash: string;
    authRoleId: number;
    fullName: string;
    phone: string;
    email: string;
}