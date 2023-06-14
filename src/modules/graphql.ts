
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
    id?: Nullable<string>;
    full_name: string;
    email: string;
    avatar: string;
    status: string;
    role: string;
}

export abstract class IQuery {
    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

type Nullable<T> = T | null;
