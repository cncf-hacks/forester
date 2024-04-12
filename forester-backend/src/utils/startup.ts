import dotenv from "dotenv";

// Process environment context from NODE_ENV
const node_env = process.env.NODE_ENV?.toLowerCase();
if (!node_env) {
  console.log("No env set, variables should be set at load time");
} else {
  if (node_env === "local") {
    console.log("Using local environment");
  }

  // Load environment variables from .env.<NODE_ENV>
  const ret = dotenv.config({ path: ".env." + node_env });
  if (ret.error) {
    console.error("Error loading .env." + node_env);
    throw ret.error;
  }
}

// Config loaded from .env.<NODE_ENV>
export const config = {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: parseInt(process.env.SMTP_PORT),
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  MONGO_URI: process.env.MONGO_URI,
};
