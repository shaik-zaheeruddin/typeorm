import dotenv from "dotenv";
dotenv.config();
const config = {
  database: {
    host: process.env.DB_HOST || "host.docker.internal",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "testdb",
  },
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET,
  },
};

export default config;
