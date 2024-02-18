export interface User {
    status: boolean;
    _id: string;
    name: string;
    __v: number;
    role: string;
}

export interface Login {
    success: boolean;
    user: User;
    token: string;
}