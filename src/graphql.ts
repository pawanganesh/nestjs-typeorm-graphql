
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class User {
    id: string;
    full_name: string;
}

export abstract class IQuery {
    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

type Nullable<T> = T | null;
