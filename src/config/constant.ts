import * as dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV: string = process.env.NODE_ENV! || 'development';

export const PORT: number = parseInt(process.env.PORT!);

export const JWT_SECRET: string = process.env.JWT_SECRET!;

export const DATABASE: {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
} = {
  DATABASE_HOST: process.env.DATABASE_HOST!,
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT!),
  DATABASE_USER: process.env.DATABASE_USER!,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD!,
  DATABASE_NAME: process.env.DATABASE_NAME!,
};

export const SMTP: {
  SMTP_FROM_NAME: string;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
} = {
  SMTP_FROM_NAME: process.env.SMTP_FROM_NAME!,
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD!,
  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: parseInt(process.env.SMTP_PORT!),
  SMTP_SECURE: process.env.SMTP_SECURE! === 'true',
};
