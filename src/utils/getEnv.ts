import { config } from 'dotenv';

config();
const getEnv = (key: string, fallback?: string): string => {
  const val = process.env[key] || fallback;
  if (val) return val;
  throw new Error(`key "${key}" not found on env`);
};

export default getEnv;
