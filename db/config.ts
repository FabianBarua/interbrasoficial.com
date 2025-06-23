import { drizzle } from 'drizzle-orm/libsql';
import { loadEnv } from "vite";

const { NODE_ENV, DATABASE_URL, DATABASE_AUTH_TOKEN } = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), "");

const isDev = () => {
  return false
}

const db_prod = ()=>
  drizzle({ connection: {
    url: DATABASE_URL, 
    authToken: DATABASE_AUTH_TOKEN 
  }});


const db_dev = ()=>
  drizzle(
    { connection: {
      url: 'file:./db/local.db'
    }});


export const db = isDev() ? db_dev() : db_prod();