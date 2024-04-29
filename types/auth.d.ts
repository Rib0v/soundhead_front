type AuthData = {
    userId?: number;
    token?: string;
    tokenExp?: number;
};

type UserCredentials = {
    user_id: number;
    access: string;
    access_exp: number;
};

type LoginData = {
    email?: string;
    password?: string;
};

type SignupData = {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
};
