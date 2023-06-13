
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    full_name: string;
    email: string;
    password: string;
    role?: Nullable<string>;
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

export abstract class IMutation {
    abstract createUser(payload: CreateUserInput): string | Promise<string>;
}

type Nullable<T> = T | null;
