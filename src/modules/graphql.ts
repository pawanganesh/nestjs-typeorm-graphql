
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UserCredentials {
    email: string;
    password: string;
}

export class CreateUserInput {
    full_name: string;
    email: string;
    password: string;
    role?: Nullable<string>;
}

export class LoginResponse {
    success: boolean;
    verified: boolean;
    message: string;
    token: string;
}

export abstract class IMutation {
    abstract login(payload: UserCredentials): LoginResponse | Promise<LoginResponse>;

    abstract createUser(payload: CreateUserInput): string | Promise<string>;
}

export class User {
    id: string;
    full_name: string;
    email: string;
    phone_number?: Nullable<string>;
    avatar?: Nullable<string>;
    auth_provider: string;
    status: string;
    role: string;
    last_login: Date;
    created_at: Date;
    updated_at: Date;
}

export abstract class IQuery {
    abstract getMyProfile(): User | Promise<User>;
}

type Nullable<T> = T | null;
