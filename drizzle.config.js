import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js*",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url:"postgresql://neondb_owner:Tq6eafMnxrQ3@ep-broad-tooth-a5tvfkjn.us-east-2.aws.neon.tech/FormMatic?sslmode=require",
  }
});