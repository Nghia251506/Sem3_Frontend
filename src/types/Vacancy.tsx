export interface Vacancy {
    id: number,
    title: string,
    description: string,
    branch_id: number,
    department_id: number,
    posted_by: number,
    status: 'open' | 'filled' | 'closed',
    min_education: string,
    salary_min: number,
    salary_max: number,
    applications_count: number,
    filled_ad: Date
}

export interface VacancyCreateDto {
    title: string,
    description: string,
    branch_id: number,
    department_id: number,
    posted_by: number,
    status: 'open' | 'filled' | 'closed',
    min_education: string,
    salary_min: number,
    salary_max: number,
    applications_count: number,
    filled_ad: Date
}