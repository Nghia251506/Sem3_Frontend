export interface Service {
    id: number,
    code: string,
    name: string,
    division: 'MannedGuarding' | 'CashServices' | 'RecruitmentTraining' | 'ElectronicSecurity',
    description: string
}

export interface ServiceCreateDto {
    id: number,
    code: string,
    name: string,
    division: 'MannedGuarding' | 'CashServices' | 'RecruitmentTraining' | 'ElectronicSecurity',
    description: string
}