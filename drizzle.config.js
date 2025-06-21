import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./config/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_7cvTLMrlby3z@ep-sparkling-snowflake-a4pe620b-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
});
