export interface ILogin {
    email: string;
    password: string;
};

export interface IRegister extends ILogin {
    username: string;
    email: string;
    password: string;
};